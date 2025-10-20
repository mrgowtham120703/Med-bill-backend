const mongoose = require('mongoose');
const ClaimSchema = new mongoose.Schema({
    providerId : {type: mongoose.Types.ObjectId, ref: 'Provider'},
    patientId : {tyoe: mongoose.Types.ObjectId, ref: 'Patient'},
    encounteredDate : Date,
    visitType : String,
    diagnosis : [Object],
    procedures : [{code : String, description: String, qty: Number, uniCost: Number}],
    medications : [{name: String, qty: Number, uniCost: Number}],
    bedDays : Number,
    ambulanceUsed : Boolean,
    ambulanceCharge : Number,
    billedAmount : Number,
    status : {type: String, default: 'draft'},
    calculated : mongoose.Schema.Types.Mixed,
    history : [Object]  
}, {timestamps: true});

module.exports = mongoose.model('Claims', ClaimSchema);