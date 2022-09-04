import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <React.Fragment>
        <h1>Welcome</h1>
        <Link to= '/countries'>Comenzar</Link>
    </React.Fragment>
  )
}

export default Home