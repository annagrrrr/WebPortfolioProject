const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true        
    },
    images: {
        type: [String],
        default: []   
    }
})

module.exports = mongoose.model('Project', ProjectSchema);
