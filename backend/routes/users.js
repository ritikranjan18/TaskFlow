const router = require("express").Router();
const User = require("../models/User");
const Task = require("../models/Task");
const Project = require("../models/Project");
const { protect, adminOnly } = require("../middleware/auth");

router.use(protect);

// GET /api/users/me — get own profile + stats
router.get("/me", async (req, res) => {
  try {
    const [totalTasks, doneTasks, overdueTasks, projects] = await Promise.all([
      Task.countDocuments({ assignee: req.user._id }),
      Task.countDocuments({ assignee: req.user._id, status: "done" }),
      Task.countDocuments({
        assignee: req.user._id,
        status: { $ne: "done" },
        dueDate: { $lt: new Date() },
      }),
      Project.countDocuments({
        $or: [{ owner: req.user._id }, { "members.user": req.user._id }],
      }),
    ]);

    res.json({
      user: req.user,
      stats: { totalTasks, doneTasks, overdueTasks, projects },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users — list all users (admin only)
router.get("/", adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/search?q=name — search users (for adding to project)
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: "Search query required" });

    const users = await User.find({
      $or: [
        { name:  { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
      ],
    }).select("_id name email role").limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/:id/role — change user role (admin only)
router.put("/:id/role", adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["admin", "member"].includes(role))
      return res.status(400).json({ message: "Role must be admin or member" });

    const user = await User.findByIdAndUpdate(
      req.params.id, { role }, { new: true }
    ).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
