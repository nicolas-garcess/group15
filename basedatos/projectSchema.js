db.projects.insertOne({
  idProyecto: 'proyecto002',
  objetivos: {
    objetivoGeneral: {
      idObjetivo: 'proyecto002ObjG1',
      descripcion: 'lorem ipsum dolo',
      cumplido: false,
    },
    objetivosEspecificos:
      [
        {
          idObjetivo: 'proyecto002ObjE1',
          descripcion: 'lorem ipsum dolo',
          cumplido: false,
        },
        {
          idObjetivo: 'proyecto002ObjE2',
          descripcion: 'lorem ipsum dolo',
          cumplido: false,
        },
      ],
  },
  presupuesto: 100000000,
  fechaInicial: new Date('2021-05-01T08:00:00Z'),
  fechaFinal: new Date('2021-010-01T08:00:00Z'),
  directorProyecto: 'Andrés González',
  estaDisponible: true,
  avance: 10,
  fase: 'inicio',
  estudiantes: [
    {
      idEstudiante: 'estudiante003',
      activo: true,
    },
    {
      idEstudiante: 'estudiante004',
      activo: true,
    },
  ],
  investigadores: [
    {
      idInvestigador: 'investigador002',
      activo: true,
    },
  ],
  notas: {
    nota001: 'descripcionNota',
  },
});

db.investigadores.insertOne(
  {
    idInvestigador: '001',
    nombre: 'Carlos Gonzalez',
    horasDedicacion: 5,
    idProyecto: 'proyecto002',
    usuario: 'C.Gonzalez',
    contraseña: 'casa',
  },
);

db.projects.find({
  avance: { $gt: 50 },
});
