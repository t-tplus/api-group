const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    tel: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth',
    },
    status:{
        type:String,
        enum: ['0', '1'],
    },
    addDate:{
        type:Date,
    },
    endDate:{
        type:Date,
    }

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('score', scoreSchema);