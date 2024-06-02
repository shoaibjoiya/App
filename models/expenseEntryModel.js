import mongoose from 'mongoose';

const expenseEntryModelSchema = new mongoose.Schema({
  date: { type: Date }, // Date of the  entry
  wareid: { type: mongoose.Schema.Types.ObjectId, ref: 'warehouseModel', required: true },
  cateid: { type: mongoose.Schema.Types.ObjectId, ref: 'expensecategoryModel', required: true },
  notes: { type: String}, // Title of the 
  amount: { type: Number, required: true }, // Amount of the expense
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const expenseEntryModel = mongoose.model("expenseEntryModel", expenseEntryModelSchema);

export default expenseEntryModel;
