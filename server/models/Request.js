const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const RequestSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true        
    },
    request: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Request', RequestSchema);
