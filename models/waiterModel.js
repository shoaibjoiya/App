import mongoose from 'mongoose';

const waiterSchema = new mongoose.Schema({
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

const waiterModel = mongoose.model("waiterModel", waiterSchema);

export default waiterModel;
