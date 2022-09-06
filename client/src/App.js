import './App.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import Cards from './components/Cards';
// import Sidebar from './components/Sidebar';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/countries'> 
          {/*<Sidebar/>*/}
          <Cards/>
        </Route>
        
      </Switch>
    </React.Fragment>
  );
}

export default App;
