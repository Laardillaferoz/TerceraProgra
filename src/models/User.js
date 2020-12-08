const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const SchemaUsuario = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    birth: { 
        type: String, 
        required: true 
    },
    sex: { 
        type: String, 
        required: true 
    },
    user: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    }, date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String
    }
});

SchemaUsuario.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

SchemaUsuario.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', SchemaUsuario);