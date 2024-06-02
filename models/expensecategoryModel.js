
import mongoose from 'mongoose';

const expensecategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const expensecategoryModel = mongoose.model("expensecategoryModel", expensecategorySchema);

export default expensecategoryModel;