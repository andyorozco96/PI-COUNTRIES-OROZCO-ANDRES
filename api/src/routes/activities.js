const { Router } = require('express');
const {Country, Activity, cache}= require('../db');
const {getAllCountriesAPI} = require('./countries')


const activitiesRouter = Router();


activitiesRouter.get ('/', async (req, res, next) =>{
    try {
        const activities = await Activity.findAll()
        res.json(activities)
    } catch (error){
        next(error)
    }
})


activitiesRouter.post('/', async (req,res,next) =>{

    const {name, difficulty, duration, season, countriesID} = req.body // countriesID : ["ARG", "COL"]
    if (!name || !difficulty || !duration || !season || !countriesID){ // countriesID va a ser un arreglo con los ID de cada país
        return res.status(501).send({error: 'Todos los campos son obligatorios'})
    }

    else if (!cache.countriesDb){
        try {
            await getAllCountriesAPI()
        }catch(error){
            next(error)
        }
    }

    try{
        let [activity, created] = await Activity.findOrCreate(
            {
                where: {
                    name,
                    difficulty,
                    duration,
                    season,
                }
            })
        activity.addCountries(countriesID)
        res.json(activity)   
    }catch(error){
        next(error)
    }
})




module.exports = {activitiesRouter};
