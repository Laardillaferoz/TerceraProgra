const mongoose = require('mongoose');
const { Schema } = mongoose;

const SchemaUsuario = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    birth: { type: String, required: true },
    sex: { type: String, required: true },
    user: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('usuario', SchemaUsuario);