const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const authSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    hash_password: {
        type: String,
        required: true,
    },

    role:{
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    status:{
        type: String,
        enum: ['active', 'block'],
        required: true
    }
},
    {
        timestamps: true
    }
);
authSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.hash_password);
    },
};


module.exports = mongoose.model('auth', authSchema);
