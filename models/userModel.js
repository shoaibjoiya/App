import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
 name: { type: String, required: true },
 mobileno: { type: String, required: true ,unique: true},
 password: { type: String, required: true },
 role: { type: String, enum: ['admin', 'seller', 'customer', 'subuser'], default: 'customer' },
 sellerid: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerModel' },
 verified : {type:Boolean ,  default:false}

}, { timestamps: true });

const userModel = mongoose.model("userModel", userSchema);

export default userModel;
 