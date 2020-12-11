const mongoose = require('mongoose');
const { Schema } = mongoose;

const SchemaCompra = new Schema({
    ProductoCompra: {type: String, required:true },
    Cantidad: {type: String, required:true },
});

module.exports=mongoose.model('compras', SchemaCompra);