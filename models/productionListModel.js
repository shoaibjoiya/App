import mongoose from 'mongoose';


// Define the rawMaterialsUsed schema with _id disabled
const rawMaterialsUsedSchema = new mongoose.Schema({
  rawId: { type: mongoose.Schema.Types.ObjectId, ref: 'itemsModel', required: true },
  qtyUsed: { type: Number, required: true },
}, { _id: false });  // Disable _id field for subdocuments

// Define the main productionList schema
const productionListSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'itemsModel', required: true },
  rawMaterialsUsed: [rawMaterialsUsedSchema],  // Use the custom subdocument schema
  formulaName: { type: String },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

// Create the model
const productionListModel = mongoose.model('productionListModel', productionListSchema);

export default productionListModel;
