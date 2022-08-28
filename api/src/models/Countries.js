const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  // Validaciones sacadas de https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/ (oficial sequelize)
  sequelize.define('Countries', {
    id :{
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    image: {
        type: DataTypes.TEXT,
        aloowNull: false,
    },

    continent: {
        type: DataTypes.STRING,
        alowNull: false,
    },

    capital: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    subregion: {
        type: DataTypes.STRING,
    },

    area: {
        type: DataTypes.REAL
    },

    poblation: {
      type:DataTypes.REAL
    }
    

  });
};


/*

ID (Código de 3 letras) *
Nombre *
Imagen de la bandera *
Continente *
Capital *
Subregión
Área
Población

*/