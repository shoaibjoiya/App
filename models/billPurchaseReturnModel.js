import mongoose from 'mongoose';

const billPurchaseReturnSchema = mongoose.Schema({
  billdate: { type: Date, required: true },
  purretid: { type: Number, required: true },
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
  purreturncart: { type: Array, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const billPurchaseReturnModel = mongoose.model("billPurchaseReturnModel", billPurchaseReturnSchema);

export default billPurchaseReturnModel;
