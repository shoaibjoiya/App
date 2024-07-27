import mongoose from 'mongoose';

// Define the prodCart schema with _id disabled
const prodCartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'itemsModel', required: true },
  qty: { type: Number, required: true }
}, { _id: false });  // Disable _id field for subdocuments

// Define the production schema
const productionSchema = new mongoose.Schema({
  formulaName: { type: String },
  prodcart: [prodCartSchema],  // Array of prodCart subdocuments
  whareid: { type: mongoose.Schema.Types.ObjectId, ref: 'warehouseModel', required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

// Create the model
const productionModel = mongoose.model('productionModel', productionSchema);

export default productionModel;
