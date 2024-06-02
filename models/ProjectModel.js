 import mongoose from 'mongoose';

  const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String ,default:'pending'},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
    sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
  }, { timestamps: true });
  
  const ProjectModel = mongoose.model("projectModel", ProjectSchema);
  
  export default ProjectModel;
  