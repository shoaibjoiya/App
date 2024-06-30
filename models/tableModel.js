import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tablesize: { type: String },
  reserved:{ type: Boolean, default: false },
  area: { type: String },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const tableModel = mongoose.model("tableModel", tableSchema);

export default tableModel;


