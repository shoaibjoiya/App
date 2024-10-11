import mongoose from 'mongoose';

const partyEntryModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  country: { type: String},
  city: { type: String},
  address: { type: String},
  partytype: { type: Boolean ,default: false},
  openingbalance:{ type: Number,default: 0 },
  acctype:{ type: String, required: true,default: 'customers' },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const partyEntryModel = mongoose.model("partyEntryModel", partyEntryModelSchema);

export default partyEntryModel;
