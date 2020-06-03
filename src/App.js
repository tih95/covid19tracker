import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/home/Home.page';
import Country from './pages/country/Country.page';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/countries/:country" component={Country} />
      </Switch>
    </div>
  );
}

export default App;
