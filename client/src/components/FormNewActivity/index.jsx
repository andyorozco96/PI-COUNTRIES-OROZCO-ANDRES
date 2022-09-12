import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { getCountries, postActivity, sortByName } from '../../redux/actions';

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
    duration: 0,
    season: '',
    countriesID: [],
  })

  function handleChange(e){
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  function handleCheck(e){
    e.preventDefault()
    if (e.target.checked){
      setInput({
        ...input,
        season: e.target.value
      })
    } 
  }

  function handleSelect(e){
    e.preventDefault()
    const countrySelected = countries.find((el) => el.name === e.target.value)
    setInput({
      ...input,
      countriesID: [...input.countriesID, countrySelected.id]
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(postActivity(input))
    alert('New activity created!')
    setInput({
      name: '',
      difficulty: 0,
      duration: 0,
      season: '',
      countriesID: [],
    })
    history.push('/countries')
  }

  return (
    <div>
      <Link to='/countries'><button>Go back</button></Link>
      <h1>¡Crea una actividad y asignale un país!</h1>
        
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Activity name:</label>
          <input type="text" value={input.name} name='name' onChange={e => handleChange(e)}/>
        </div>
        
        <div>
          <label>Set difficulty(1 to 5):</label>
          <input type="range" value={input.difficulty} name='difficulty' min='0' max='5' step='1' onChange={e => handleChange(e)}/>
        </div>
        
        <div>
          <label>Set duration(hours):</label>
          <input type="number" value={input.duration} name='duration' min='0' max='24' onChange={e => handleChange(e)}/>
        </div>

        <div>
          <label>Season:</label>
          <label><input type="checkbox" value="Summer" name='Summer' onChange={e => handleCheck(e)}/>Summer</label>
          <label><input type="checkbox" value="Autumn" name='Autumn' onChange={e => handleCheck(e)}/>Autumn</label>
          <label><input type="checkbox" value="Winter" name='Winter' onChange={e => handleCheck(e)}/>Winter</label>
          <label><input type="checkbox" value="Spring" name='Spring' onChange={e => handleCheck(e)}/>Spring</label>
        </div>
        
        <div>
          <select onChange={e => handleSelect(e)}>
            {
            sortedCountries.map((country) => (
              <option value={country.name}>{country.name}</option>
            ))
            }
          </select>
          <ul>{input.countriesID.map((name) => (
            <li>{name}</li>
          ))}
          </ul>
        </div>

        <button type='submit'>¡Create!</button>
      </form>
    </div>
  )
}

export default FormActivity