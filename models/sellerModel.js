import mongoose from 'mongoose';

const sellerSchema = mongoose.Schema({
 sellername: { type: String, required: true },
 mobilenumber: { type: String, required: true, unique: true },
 email: { type: String },
 shopname: { type: String },
 city: { type: String },
 country: { type: String },
 posid: { type: String },
 fbrtoken: { type: String },
 address: { type: String },
 sortby: { type: String },
 notes: { type: String }

}, { timestamps: true });

const sellerModel = mongoose.model("sellerModel", sellerSchema);


export default sellerModel;
