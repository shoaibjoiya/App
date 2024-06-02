
import mongoose from 'mongoose';

const itemsSchema = new mongoose.Schema({
  productname: { type: String, required: true },
  code:        { type: String, required: true },
  brandid:     { type: mongoose.Schema.Types.ObjectId, ref:'brandsModel', required: true   },
  cateid:      { type: mongoose.Schema.Types.ObjectId, ref:'categoryModel', required: true },
  unitid:      { type: mongoose.Schema.Types.ObjectId, ref:'unitsModel', required: true    },
  barcode:     { type: Array },
  cost:        { type: String ,default: '0' },
  avgcost:     { type: String ,default: '0' },
  price:       { type: String ,default: '0' },
  wsprice:     { type: String ,default: '0' },
  discount:    { type: String ,default: '0' },
  alertqty:    { type: String ,default: '0' },
  tax:         { type: String ,default: '0' },
  ordernote:   { type: String },
  userid:      { type: mongoose.Schema.Types.ObjectId, ref: 'userModel', required: true   },
  sellerid:    { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel', required: true }
},
{
   timestamps: true 
});

const itemsModel = mongoose.model("itemsModel", itemsSchema);

export default itemsModel;
