const Assignment = require('../models/Assignment');

exports.createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const assignment = new Assignment({
      title,
      description,
      dueDate,
      createdBy: req.user.id,
      status: 'Draft'
    });
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const { role, id } = req.user;
    const { status } = req.query; 
    let query = {};
    
    if (role === 'teacher') {
      query.createdBy = id;
      if (status) {
        query.status = status;
      }
    } else {
      query.status = 'Published';
    }

    const assignments = await Assignment.find(query)
      .populate('submissions.student', 'name email')
      .sort({ createdAt: -1 });

    res.json({ assignments });
  } catch (err) {
    console.error("DETAILED ERROR:", err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    let assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ msg: 'Not found' });
    if (assignment.status !== 'Draft') return res.status(400).json({ msg: 'Only drafts can be edited' });

    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;
    assignment.dueDate = dueDate || assignment.dueDate;

    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateAssignmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ msg: 'Not found' });
    assignment.status = status;
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.submitAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const assignment = await Assignment.findById(req.params.id);
    if (assignment.status !== 'Published') return res.status(400).json({ msg: 'Not published' });
    assignment.submissions.push({ student: req.user.id, answer });
    await assignment.save();
    res.json({ msg: 'Submitted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const assignments = await Assignment.find({ createdBy: req.user.id });
    const analytics = assignments.map(a => ({
      title: a.title,
      submissionCount: a.submissions.length,
      status: a.status
    }));
    res.json(analytics);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};