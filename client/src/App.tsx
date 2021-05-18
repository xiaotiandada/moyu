import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import Home from './views/Home';
import List from './views/List';
import Detail from './views/Detail';
import Custom from './views/Custom';
import Header from './components/Header';

import './App.css';
import 'antd/dist/antd.css';

function App() {
  return (
    <StyledWrapper>
<Router>
      <Header></Header>
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/custom" exact>
          <Custom></Custom>
        </Route>
        <Route path="/:id/" exact>
          <List></List>
        </Route>
        <Route path="/:id/:page" exact>
          <Detail></Detail>
        </Route>
      </Switch>
    </Router>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
padding: 55px 0 0 0;
`

export default App;
