// - College Model
// { name: { mandatory, unique, example iith}, fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, logoLink: {mandatory}, isDeleted: {boolean, default: false} }


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const collegeSchema = new Schema({
    name: {
        type : String,
        required: true,
        unique: true,
        },
    fullName: {
        type : String,
        required: true,
        },
    logoLink: {
        type : String,
        required: true
        },
    isDeleted: {   
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('College', collegeSchema);