const mongoose = require('mongoose');

const { Schema } = mongoose;

const ResearcherSchema = new Schema({
  id: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  nombre: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 40,
  },
  idProyecto: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
  },
  usuario: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
  },
  contrasena: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
  },
  horasDedicacion: {
    type: Number,
    required: true,
    min: 8,
    max: 40,
  },
  activo: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Modelo de datos, recibe el nombre de la colección de la base de datos y el esquema
const ResearcherModel = mongoose.model('investigadores', ResearcherSchema);

module.exports = ResearcherModel;
