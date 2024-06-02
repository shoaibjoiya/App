import mongoose from 'mongoose';

const billSaleReturnSchema = mongoose.Schema({
  billdate: { type: Date, required: true },
  saleretid: { type: String, required: true },
  whareid: { type: mongoose.Schema.Types.ObjectId, ref: 'warehouseModel', required: true },
  custid: { type: mongoose.Schema.Types.ObjectId, ref: 'partyEntryModel', required: true },
  discount: { type: Number, default: 0 }, // Corrected syntax for default value
  saletax: { type: Number, default: 0 }, 
  shippingcharges: { type: Number, default: 0 }, 
  totalamount: { type: Number, default: 0 }, // Corrected syntax for default value // Corrected syntax for default value
  cashreceived: { type: Number, default: 0 },
  billstatus: { type: String, default: 'received' },
  paymentstatus: { type: String, default: 'paid' },
  paymentMode: { type: String, default: 'cash' }, 
  notes: { type: String }, // Corrected syntax for default value
  returncart: { type: Array, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const billSaleReturnModel = mongoose.model("billSaleReturnModel", billSaleReturnSchema); // Changed model name to "Bill"

export default billSaleReturnModel;
