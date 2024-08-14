import mongoose from 'mongoose';
import autoIncrementFactory from 'mongoose-sequence';

// Pass the mongoose instance to the factory
const autoIncrement = autoIncrementFactory(mongoose);

const itemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'itemsModel', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  kotqty: { type: Number, default: 0 },
}, { _id: false }); // No _id for subdocuments

const billSaleSchema = mongoose.Schema({
  billdate: { type: Date, required: true },
  saleid: { type: Number,  unique: true },
  whareid: { type: mongoose.Schema.Types.ObjectId, ref: 'warehouseModel', required: true },
  custid: { type: mongoose.Schema.Types.ObjectId, ref: 'partyEntryModel', required: true },
  customerName: { type: String },
  mobileNumber: { type: String },
  deliveryAddress: { type: String },
  riderName: { type: String },
  riderid: { type: String },
  waiterName: { type: String },
  waiterid: { type: String },
  tableName: { type: String },
  tabileid: { type: String },
  chefid: { type: String },
  kitchenid: {  type: mongoose.Schema.Types.ObjectId, ref: 'kitchenModel' },
  orderType: { type: String },
  discount: { type: Number, default: 0 },
  saletax: { type: Number, default: 0 },
  shippingcharges: { type: Number, default: 0 },
  totalamount: { type: Number, default: 0 },
  cashreceived: { type: Number, default: 0 },
  receivedamount: { type: Number, default: 0 },
  billstatus: { type: String, default: 'received' },
  paymentstatus: { type: String, default: 'paid' },
  paymentMode: { type: String, default: 'cash' },  
  invoiceNumberfbr: { type: String}, 
  notes: { type: String },
  salecart: [itemSchema],
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true },
  sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
}, { timestamps: true });

// Apply the autoIncrement plugin to the schema
billSaleSchema.plugin(autoIncrement, { inc_field: 'saleid' });

const billSaleModel = mongoose.model("billSaleModel", billSaleSchema);

export default billSaleModel;
