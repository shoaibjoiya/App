import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  commission: { type: Number },
  charges: { type: Number },
  address: { type: String },
  phone: { type: String },
  vehicleNumber: { type: String },
  homeNumber: { type: String },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const chefModel = mongoose.model("chefModel", chefSchema);

export default chefModel;
