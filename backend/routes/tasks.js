const router = require("express").Router();
const Task = require("../models/Task");
const Project = require("../models/Project");
const { protect } = require("../middleware/auth");

router.use(protect);

// Helper: check if user is member/owner of project
async function isMember(projectId, userId) {
  const project = await Project.findById(projectId);
  if (!project) return false;
  if (project.owner.toString() === userId.toString()) return true;
  return project.members.some(m => m.user.toString() === userId.toString());
}

// GET /api/tasks?project=projectId — get tasks for a project
router.get("/", async (req, res) => {
  try {
    const { project } = req.query;
    if (!project) return res.status(400).json({ message: "project query param required" });

    const allowed = await isMember(project, req.user._id);
    if (!allowed) return res.status(403).json({ message: "Not a project member" });

    const tasks = await Task.find({ project })
      .populate("assignee", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/tasks/my — get tasks assigned to logged-in user
router.get("/my", async (req, res) => {
  try {
    const tasks = await Task.find({ assignee: req.user._id })
      .populate("project", "name")
      .populate("assignee", "name email")
      .sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/tasks — create task
router.post("/", async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, project, assignee } = req.body;
    if (!title || !project) return res.status(400).json({ message: "Title and project required" });

    const allowed = await isMember(project, req.user._id);
    if (!allowed) return res.status(403).json({ message: "Not a project member" });

    const task = await Task.create({
      title, description, status, priority, dueDate,
      project, assignee, createdBy: req.user._id,
    });
    const populated = await Task.findById(task._id)
      .populate("assignee", "name email")
      .populate("createdBy", "name email");
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/tasks/:id — update task
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const allowed = await isMember(task.project, req.user._id);
    if (!allowed) return res.status(403).json({ message: "Not a project member" });

    const fields = ["title", "description", "status", "priority", "dueDate", "assignee"];
    fields.forEach(f => { if (req.body[f] !== undefined) task[f] = req.body[f]; });
    await task.save();

    const updated = await Task.findById(task._id)
      .populate("assignee", "name email")
      .populate("createdBy", "name email");
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id — delete task (creator or admin)
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const isCreator = task.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    if (!isCreator && !isAdmin)
      return res.status(403).json({ message: "Only creator or admin can delete" });

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
