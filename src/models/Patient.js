const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
    firstname: String,
    lastName: String,
    dob: Date,
    identifiers: [{ type: String, value: String }],
    insurance: {
        insurerName: String,
        policyNumber: String,
        coverageStart: Date,
        coverageEnd: Date,
        deductableTotal: { type: Number, default: 0 },
        deductableUsed: { type: Number, default: 0 },
        coPayPercent: { tyoe: Number, default: 0 }
    }
}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);