const mongoose = require('mongoose');
const { Schema } = mongoose;

const Schemapromocion = new Schema({
    NombrePromocion: {
        type: String, required: true
    },
    Descripcion: {
        type: String, required: true
    },
    NombreProducto: {
        type: String, required: true
    },
    DescuentoRegalia: {
        type: [String], required: true
    },
    FechaInicio: {
        type: String, required: true
    },
    FechaFin: {
        type: String, required: true
    }
});

module.exports = mongoose.model('promocion', Schemapromocion);