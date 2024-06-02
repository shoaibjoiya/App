import mongoose from 'mongoose';

const billSaleSchema = mongoose.Schema({
  billdate: { type: Date, required: true },
  saleid: { type: String, required: true },
  whareid: { type: mongoose.Schema.Types.ObjectId, ref: 'warehouseModel', required: true },
  custid: { type: mongoose.Schema.Types.ObjectId, ref: 'partyEntryModel', required: true },
  discount: { type: Number, default: 0 }, // Corrected syntax for default value
  saletax: { type: Number, default: 0 }, 
  shippingcharges: { type: Number, default: 0 }, 
  totalamount: { type: Number, default: 0 }, // Corrected syntax for default value // Corrected syntax for default value
  cashreceived: { type: Number, default: 0 }, // Corrected syntax for default value // Corrected syntax for default value
  billstatus: { type: String, default: 'received' },
  paymentstatus: { type: String, default: 'paid' },
  paymentMode: { type: String, default: 'cash' },  
  invoiceNumberfbr: { type: String}, 
  notes: { type: String }, // Corrected syntax for default value
  salecart: { type: Array, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

const billSaleModel = mongoose.model("billSaleModel", billSaleSchema); // Changed model name to "Bill"

export default billSaleModel;
