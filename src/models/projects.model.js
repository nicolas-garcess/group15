const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProjectSchema = new Schema({
  idProyecto: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
  objetivos: {
    type: Schema.Types.Mixed,
    required: true,
  },
  presupuesto: {
    type: Number,
    required: true,
  },
  fechaInicial: {
    type: Date,
    required: true,
  },
  fechaFinal: {
    type: Date,
    required: true,
  },
  directorProyecto: {
    type: String,
    required: true,
  },
  estaDisponible: {
    type: Boolean,
    required: true,
  },
  avance: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  fase: {
    type: String,
    required: true,
  },
  estudiantes: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  investigadores: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  notas: {
    type: [Schema.Types.Mixed],
    required: true,
  },
});

// Modelo de datos, recibe el nombre de la colección de la base de datos y el esquema
const ProjectModel = mongoose.model('projects', ProjectSchema);

module.exports = ProjectModel;
