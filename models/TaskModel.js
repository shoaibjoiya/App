import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  status: { type: String },
  projectid: { type: mongoose.Schema.Types.ObjectId, ref: 'projectModel', required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const TaskModel = mongoose.model("taskModel", TaskSchema);

export default TaskModel;

