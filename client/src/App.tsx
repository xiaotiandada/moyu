import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import Home from './views/Home';
import List from './views/List';
import Detail from './views/Detail';
import Custom from './views/Custom';
import Header from './components/Header';
import Bookshelf from './views/Bookshelf';
import History from './views/History';


import './App.css';
import 'antd/dist/antd.css';

function App() {

  const Layout = ({ children }: any) => {
    return (
      <>
        <Header></Header>
        {children}
      </>
    )
  }

  return (
    <StyledWrapper>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Layout>
              <Home></Home>
            </Layout>
          </Route>
          <Route path="/custom" exact>
            <Layout>
              <Custom></Custom>
            </Layout>
          </Route>
          <Route path="/bookshelf" exact>
            <Layout>
              <Bookshelf></Bookshelf>
            </Layout>
          </Route>
          <Route path="/history" exact>
            <Layout>
              <History></History>
            </Layout>
          </Route>
          <Route path="/:id/" exact>
            <Layout>
              <List></List>
            </Layout>
          </Route>
          <Route path="/:id/:page" exact>
            <Layout>
              <Detail></Detail>
            </Layout>
          </Route>
        </Switch>
      </Router>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
padding: 40px 0 0 0;
`

export default App;
