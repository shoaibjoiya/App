
import mongoose from 'mongoose';

const brandsSchema = new mongoose.Schema({
  name: { type: String, required: true},
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const brandsModel = mongoose.model("brandsModel", brandsSchema);

export default brandsModel;
