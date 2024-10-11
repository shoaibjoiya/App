
import mongoose from 'mongoose';
import autoIncrementFactory from 'mongoose-sequence';

// Pass the mongoose instance to the factory
const autoIncrement = autoIncrementFactory(mongoose);
const itemsSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  code:        { type: Number,  unique: true },
  brandid:     { type: mongoose.Schema.Types.ObjectId, ref:'brandsModel', required: true     },
  cateid:      { type: mongoose.Schema.Types.ObjectId, ref:'categoryModel', required: true   },
  unitid:      { type: mongoose.Schema.Types.ObjectId, ref:'unitsModel', required: true      },
  whareid:     { type: mongoose.Schema.Types.ObjectId, ref: 'warehouseModel', required: true },
  barcode:     { type: Array },
  cost:        { type: Number ,default: '0' },
  avgcost:     { type: Number ,default: '0' },
  price:       { type: Number ,default: '0' },
  wsprice:     { type: Number ,default: '0' },
  discount:    { type: Number ,default: '0' },
  alertqty:    { type: Number ,default: '0' },
  imglink:     { type: String               },
  tax:         { type: Number ,default: '0' },
  lockProduct: { type: Boolean, default: false },
  ingredient:  { type: Boolean, default: false },
  isVariant:   { type: Boolean, default: false }, 
  ordernote:   { type: String },
  userid:      { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true   },
  sellerid:    { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
},
{
   timestamps: true 
});
itemsSchema.plugin(autoIncrement, { inc_field: 'code' });
const itemsModel = mongoose.model("itemsModel", itemsSchema);

export default itemsModel;
