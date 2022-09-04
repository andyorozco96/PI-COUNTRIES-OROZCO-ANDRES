const { Router } = require('express');
const {Country, Activity, cache}= require('../db');
const {Op} = require('sequelize')
const axios = require('axios');
const db = require('../db');
const { get } = require('.');


const countriesRouter = Router();

const URL_CHAR_API = "https://restcountries.com/v3/all"


////////////////////// GET ALL COUNTRIES FROM API + DATABASE /////////////////////
const getAllCountriesAPI = async() => {
    const {data} = await axios.get(URL_CHAR_API);
    const dataApi = data.map((e) => { // Me retorna un arreglo con objetos adentro con solo las propiedades que necesito para mi model.
        return {
            id: e.cca3,
            name: e.name.common,
            flag: e.flags[0], // Solo me traigo la imagen en svg que es la primera del array
            continent: e.continents[0], // Solo me traigo el primer continente, porque es un array
            capital: e.capital ? e.capital[0] : 'This country does not have a capital', // Corroboro si existe una capital sino mando un msje
            subregion: e.subregion ? e.subregion : 'This country does not have a subregion',
            area: e.area,
            population: e.population,
        }
    })
    try{
        await Country.bulkCreate(dataApi)
    }catch(error){
        next(error)
    }
    const allData= await Country.findAll({include: Activity})
    cache.countriesDb = allData
};

// countriesRouter.get('/', async (req,res,next)=>{
//     const dataApi = await getAllCountriesAPI()
//     await Country.bulkCreate(dataApi)
//     const dataDB = await Country.findAll()
//     return res.json(dataDB)
// })


countriesRouter.get('/', async (req, res, next) => {
    const {name, filter, order, page} = req.query //Me guardo el nombre en caso de haber

    try {
        if (!cache.countriesDb) {
            await getAllCountriesAPI()
        }
    }catch(error){
        next(error)
    }
    

   if (name){ // En caso de existir un query "name" que filtre los países que coincidan
        try {
            let countries = await Country.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%` // El [Op.iLike] es un operador de sequelize case insensitive y se le coloco los '%' al inicio y al final busca ${name} como un substring dentro del nombre de los países.
                    }
                }
            });
            return res.json(countries) // retorno los países encontrados como JSON
        } catch (error){
            next (error)
        }
    }

    else if (filter){
        try{
            let countries = await Country.findAll(
                // {
                //     where:{
                //         status: filter,
                //     },
                //     limit: 9,   // limit y offest pertenecen al paginado de sequelize 
                //                 //https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#limits-and-pagination
                //     offset: page,
                //     order: [["name", order]], // Info sacada de https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering
                //     include: {model: Activity} // para traer también las actividades de la tabla intermedia.
                // }
            );
            return res.json(countries)
       } catch(error){
        next(error)
       }
    }
    else {
        try{
            let countries = await Country.findAll(
                {
                    limit: 9,
                    //offset: page,
                    //order: [['name', DESC]],
                    include: {model: Activity}
                }
            );
            return res.json(countries)
        }catch (error){
            next(error)
        }
    }
})


countriesRouter.get('/:id', async (req, res, next) => {  // Ruta en caso de que me pasen un ID
    let id = req.params.id.toUpperCase() // me traigo el ID y lo paso a mayúsculas para que coincida con los ID de la api que son 3 letras en mayúsculas.

    try {
        let country = await Country.findByPk(id)
        return res.json(country)
    } catch(error){
        next(error)
    }
})

module.exports = {countriesRouter, getAllCountriesAPI}

