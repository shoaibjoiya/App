import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'itemsModel', required: true },
  warehouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'warehouseModel', required: true },
  quantity: Number,
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const stockModel = mongoose.model("stockModel", stockSchema); // Changed the model name to "Stock" and corrected the export

export default stockModel; // Export the model
