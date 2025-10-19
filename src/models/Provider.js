const mongoose = require('mongoose');
const ProviderSchema = new mongoose.Schema({
    name: String,
    npi : String,
    address : Object,
    contact: Object,
}, {timestamps : true});
module.exports = mongoose.model('Provider', ProviderSchema);