const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
// Validaciones sacadas de https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/ (oficial sequelize)

  sequelize.define('activity', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate :{
        is: /^[\w\-\s]+$/
      }
    },

    difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validalte: {
            min: 1,
            max: 5,
        }
    },

    duration: {
        type: DataTypes.INTEGER,  /* CHECKEAR EL FORMATO DE TIME */
        alowNull: false,
        validate: { //La duración va a tomar el formato en HORAS, entonces puede durar todo un día maximo o menos de una hora minimo.
            min: 0,
            max: 24,
        }
    },

    season: {
        type: DataTypes.ENUM('Summer', 'Winter', 'Autumn', 'Spring'),
        allowNull: false,
    }
  });
};

/* 
ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera)

*/