import mongoose from 'mongoose';

const kitchenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true },
  categoryIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'categoryModel' }] // Field for categories
}, { timestamps: true });

const kitchenModel = mongoose.model("kitchenModel", kitchenSchema);

export default kitchenModel;
