import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
// import Home from './views/Home/index';
import List from './views/List';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <List></List>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
