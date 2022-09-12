import './App.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home';
import Cards from './components/Cards';
import CardDetail from './components/CardDetail';
import FormActivity from './components/FormNewActivity';
// import Sidebar from './components/Sidebar';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/countries/:id'  component={CardDetail}/> 
        <Route path='/countries'  component={Cards}/> 
        <Route path='/activities'  component={FormActivity}/> 
      </Switch>
    </React.Fragment>
  );
}

export default App;
