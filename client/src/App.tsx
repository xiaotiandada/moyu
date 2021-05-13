import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import Home from './views/Home/index';
import List from './views/List';
import Detail from './views/Detail';

import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <List></List>
        </Route>
        <Route path="/:id/:page">
          <Detail></Detail>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
