import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { getCountries, postActivity, sortByName } from '../../redux/actions';

import style from './FormNewActivity.module.css'


function validate (input){ // Recibe un OBJETO input, es decir nuestro estado.
  let errors = {};
  if (!/^[A-Za-z\s]*$/.test(input.name) ) errors.name = 'Only letters and spaces allowed.'
  if (!input.name) errors.name = 'Activity name is required.'
  if (input.duration < 0 || input.duration > 24) errors.duration = 'Duration range should be 0 to 24 hours.'
  if (!input.season) errors.season = 'Season is required to create a new activity.'
  if (input.countriesID.length <= 0) errors.countriesID = 'Please select one or more countries.'
  return errors
}


function FormActivity() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(()=>{
    dispatch(getCountries('')).then(dispatch(sortByName('ASC')))
  }, [dispatch])

  const countries = useSelector((state) => state.countries) // Me traigo los países de la store;

  const sortedCountries = countries.sort(function (a,b){ //Como "getCountries" me los trae desordenados, necesito ordenarlos.
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    else return 0
  })

  const [input, setInput] = useState({
    name: '',
    difficulty: 0,
    duration: 1,
    season: '',
    countriesID: [],
  })

  // Manejador de errores
  const [errors, setErrors] = useState({
    name: 'Activity name is required.',
    season: 'Season is required to create a new activity.',
    countriesID: 'Please select one or more countries.',
  }); 
  let errorsCount = ((Object.keys(errors).length) > 0)
  console.log(errorsCount)

  function handleChange(e){
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })

    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value,
    }))
  }

  function handleCheck(e){
    if (e.target.checked){
      setInput({
        ...input,
        season: e.target.value
      })
      setErrors(validate({
        ...input,
        season: e.target.value
      }))
    } else {
      setInput({
        ...input,
        season: ''
      })
      setErrors(validate({
        ...input,
        season: ''
    }))
  }
}

  function handleSelect(e){
    e.preventDefault()
    const countrySelected = countries.find((el) => el.name === e.target.value)
    setInput({
      ...input,
      countriesID: [...input.countriesID, countrySelected.id]
    })
    setErrors(validate({
      ...input,
      countriesID: [...input.countriesID, countrySelected.id]
    }))
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(postActivity(input))
    alert('New activity created!')
    setInput({
      name: '',
      difficulty: 0,
      duration: 1,
      season: '',
      countriesID: [],
    })
    history.push('/countries')
  }

  function handleDeleteCountry(el){
    setInput({
      ...input,
      countriesID: [...input.countriesID.filter((countryID) => countryID !== el.id)]
    })
    console.log(el.name)
  }

  // Info de los countries que quedaron en el estado seleccionados con el SELECT

  const infoFromState = input.countriesID
  
  function infoCountry(arrayState, countries){
    return arrayState.map(countryID => { // devuelve un array [...]
      return countries.find(country => country.id === countryID) // Devuelve un valor [0,1,2,3]
    })
  }

  const infoCountries = infoCountry(infoFromState, countries)

  return (
    <React.Fragment>
      
      <nav className={style.navMain}>
        <a className={style.logo} href="/">
          <img src="https://logodix.com/logo/1931272.png" alt="logo home" />
        </a>
        <div className={style.navBtnContainer}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/activities">Create activity</a></li>
            <li><a href="/countries">About me</a></li>
          </ul>
        </div>
      </nav>
      <section className={style.formGridContainer}>

        <div className={style.activityContainer}>
          <div className={style.activityInfo}>
          <div className={style.activityTitleContainer}>
            <h3>Create a country-specific activity!</h3>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={style.formFieldContainer}>
                <label>
                <span className={errors.name ? style.mandatory : ''}>*</span>
                  Activity name:</label>
                <input 
                  className={errors.name || !input.name ? style.error : style.correct} 
                  type="text" value={input.name} 
                  name='name'
                  placeholder='Write a name for your activity' 
                  onChange={e => handleChange(e)}/>

              <div className={errors.name ? style.mandatory : errors.correct}>
                {input.name}
              </div>
            </div>
            
            <div className={style.formFieldContainer}>
                <label>Set difficulty level:</label>
                <input type="range" value={input.difficulty} name='difficulty' min='1' max='5' step='1' onChange={e => handleChange(e)}/>
            </div>
            
            <div className={style.formFieldContainer}>
              <label>Set duration (hours):</label>
              <input 
                className={errors.duration ? style.error : ''}
                type="number" 
                value={input.duration} 
                name='duration' 
                min='1' 
                max='24' 
                onChange={e => handleChange(e)}/>
            </div>
    
            <div className={style.formFieldContainer}>
              <div>
                <span className={errors.season ? style.mandatory : ''}>*</span><label>Select a season: </label>
              </div>
              <div>
                <div>
                  <label className={input.season === 'Summer' ? style.checked : ''}>Summer</label>
                  <input
                    className={style.checkbox}
                    disabled={input.season !== 'Summer' && input.season !== '' ? true : false}   
                    type="checkbox" 
                    value="Summer" 
                    name='Summer' 
                    onChange={e => handleCheck(e)}/> 
                </div>

                <div>
                  <label className={input.season === 'Autumn' ? style.checked : ''}>Autumn</label>
                  <input 
                    className={style.checkbox}
                    disabled={input.season !== 'Autumn' && input.season !== '' ? true : false}  
                    type="checkbox" 
                    value="Autumn" 
                    name='Autumn' 
                    onChange={e => handleCheck(e)}/>
                </div>
                
                <div>
                  <label className={input.season === 'Winter' ? style.checked : ''}>Winter</label> 
                  <input
                    className={style.checkbox}
                    disabled={input.season !== 'Winter' && input.season !== '' ? true : false}  
                    type="checkbox" 
                    value="Winter" 
                    name='Winter' 
                    onChange={e => handleCheck(e)}/>
                </div>

                <div>
                  <label className={input.season === 'Spring' ? style.checked : ''}>Spring</label>
                  <input
                      className={style.checkbox}
                      disabled={input.season !== 'Spring' && input.season !== '' ? true : false} 
                      type="checkbox" 
                      value="Spring" 
                      name='Spring' 
                      onChange={e => handleCheck(e)}/>
                </div>
              </div>
            </div>
            
            <div className={style.formFieldContainer}>
              <label>
                <span className={errors.countriesID ? style.mandatory : ''}>*</span>
                Choose countries:
                </label>
              <select onChange={e => handleSelect(e)}>
                {
                sortedCountries.map((country) => {
                  return (
                  <option value={country.name}>{country.name}</option>)})
                }
              </select>
            </div>
            <div className={style.divContainer}>
              { 
                  infoCountries.map((el) => {
                    return (
                      <div className={style.divSmallCard}>
                        <i
                          onClick={()=>handleDeleteCountry(el)}
                          class="fa-solid fa-xmark" className={style.closeIcon}></i>
                          <img className={style.imageSmall} src={el.flag} alt={`Flag of${el.name}`} />
                      </div>
                    )
                  })
                }
              </div>

              <div className={style.formBtnContainer}>
                <button className={style.formBtn}><a href='/countries'>Go back</a></button>
                <button className={style.formBtn} type='submit' disabled={errorsCount}>¡Create!</button>
              
              </div>
          </form>
          </div>
        </div>
      </section>
    </React.Fragment>
    )
}

export default FormActivity