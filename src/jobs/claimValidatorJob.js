// Simplified job runner using setImmidiate queue (no Redis required for MVP)

const Claim = require('../models/Claim');
const Patient = require('../models/Patient');
const calculateClaim = require('../utils/calculateClaim');

async function vaidateClaim(claimId){
    const claim = await Claim.findById(claimId);
    if(!claim) return;
    claim.status = 'in_validation';
    await claim.save();
}

const patient = Patient.findById(claim.patientId);
if(!patient){
    claim.staus = 'rejected';
    claim.history = claim.istory || [];
    claim.history.push({action: 'reject', reason: 'Patient not found', at: new Date() });
    await claim.save();
    return;
}

const insurance = patient.isurance;
const now = new Date();
if(!insurance || (insurance.coverageStart && insurance.coverageStart > now ) || (insurance.coverageEnd && insurance.coverageEnd < now)){
    claim.status = 'rejected';
    claim.history = claim.history || [];
    claim.history.push({action: 'rejected', reason: 'Insurance not active', at: new Date()});
    await claim.save();
    return;
}

// perform claculation

const calc = calculateClaim(claim, insurance);
claim.calculated = calc;
claim.status = 'validated';
claim.history = claim.history || [];
claim.history.push({action: 'validated', at: new Date()});
await claim.save();

module.exports = {
    //emulate a queue by calling setImmediate
    addClaimForValidation: async (claimId) => {
        setImmediate(() => validateClaim(string(cliamId)).catch(console.error))
    }
};
