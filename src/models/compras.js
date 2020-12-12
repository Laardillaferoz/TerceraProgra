const mongoose = require('mongoose');
const { Schema } = mongoose;

const SchemaCompra = new Schema({
    cliente:{
        type: String,
    },
    products:{
        type: Array,
        default: []
    },
    precioFinal:{
        type: Number,
        default:0
    }
    //ProductoCompra: {type: String, required:true },
    //Cantidad: {type: String, required:true },
});

module.exports=mongoose.model('compras', SchemaCompra);