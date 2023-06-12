// - Intern Model
// ```
// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
// ```

const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true 
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[0-9]{10}$/, 'Must match a valid mobile number!']
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College',
        required: true,
        isDeleted: false
    }
   
})

module.exports = mongoose.model('Student',internSchema)