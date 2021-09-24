const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const { Schema } = mongoose;


const StudentSchema = new Schema({
    id: {
        type: String,
        required: true,
        min: 3,
        max: 15
    },
    nombre: {
        type: String,
        required: true,
        min: 3,
        max: 40
    },
    carrera: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    celular: {
        type: String,
        required: true,
        min: 10,
        max: 10,
    },
    idProyecto: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    usuario: {
        type: String,
        required: true,
        min: 6,
        max: 15
    },
    contrasena: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    activo: {
        type: Boolean,
        required: true,
        default: true
    }
});

//Modelo de datos, recibe el nombre de la colección de la base de datos y el esquema
const StudentModel = mongoose.model('estudiantes', StudentSchema);

module.exports = StudentModel;