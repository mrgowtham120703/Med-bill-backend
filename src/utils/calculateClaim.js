// Very small rule engine to compute allowed amounts, deductable, coinsurance

module.exports = function claculateClaim(claim, insurance){

    //compute billed amount form items if not provided

    let billed = claim.billedAmount || 0;
    if(!claim.billedAmount){
        billed = 0;
        (claim.procedures || []).forEach(p => billed += (p.unicost || 0) * (p.qty || 1));
        (claim.medications || []).forEach(m => billed += (m.uniCost || 0) * (m.qty || 1));

        if(claim.bedDays) billed += (claim.bedDays * 500); // simple bed rate
        if(claim.ambulanceUsed) billed += (claim.ambulanceCharge || 0);
    }

    // allowed amount : naive - insurer allows 80% of billed by default 

    const allowed = billed * 0.8;
    const remainingDed = Math.max(0, (insurance.deductibleTotal || 0) - (insurance.deductableUsed || 0));
    const dedApllied = Math.min(allowed, remainingDed);
    const insurerBase = allowed - dedApplied;
    const coinsurance = insurerBase * ((insurance.coPaypercent || 0)/100);
    const patientResp = dedApplied + coinsurance + Math.max(0, billed - allowed);
    const insurerResp = Math.max(0, allowed - coinsurance - dedApplied);

    return {
        billed, 
        allowed,
        deductibleApplied: dedApllied,
        coinsuranceApplied: coinsurance,
        patientResponsibility: patientResp,
        insurerResponsibility: insurerResp 
    }
}