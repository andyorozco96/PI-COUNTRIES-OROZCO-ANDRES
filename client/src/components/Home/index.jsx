import React from 'react'
import {Link} from 'react-router-dom'

import style from './Home.module.css'

function Home() {
  return (
    <section className={style.divContainer}>
        <div className={style.divText}><p>Do you want to know information about all the countries around the world? <span>Go see</span>.</p></div>
        <div className={style.divBtn}><Link to= '/countries'><button>¡START NOW!</button></Link></div>
    </section>
  )
}

export default Home