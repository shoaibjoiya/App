
import mongoose from 'mongoose';

const unitsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  basename: { type: String, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const unitsModel = mongoose.model("unitsModel", unitsSchema);

export default unitsModel;
