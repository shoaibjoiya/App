import mongoose from 'mongoose';

const purchaseCartItemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'itemsModel', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  batchNo: { type: String},
  expiryDate: { type: Date },
}, { _id: false }); // No _id for subdocuments
const billPurchaseSchema = mongoose.Schema({
  billdate: { type: Date, required: true },
  purid: { type: Number},
  whareid: { type: mongoose.Schema.Types.ObjectId, ref: 'warehouseModel', required: true },
  custid: { type: mongoose.Schema.Types.ObjectId, ref: 'partyEntryModel', required: true },
  discount: { type: Number, default: 0 },
  saletax: { type: Number, default: 0 }, 
  shippingcharges: { type: Number, default: 0 }, 
  totalamount: { type: Number, default: 0 },
  cashreceived: { type: Number, default: 0 },
  billstatus: { type: String, default: 'received' },
  paymentstatus: { type: String, default: 'paid' }, 
  paymentMode: { type: String, default: 'cash' }, 
  notes: { type: String },
  purchasecart: [purchaseCartItemSchema], // Referencing the purchase cart items schema
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const billPurchaseModel = mongoose.model("billPurchaseModel", billPurchaseSchema);

export default billPurchaseModel;

 

