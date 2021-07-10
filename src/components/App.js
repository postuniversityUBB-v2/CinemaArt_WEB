import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import '../../src/styles/App.scss';
import { redirects, baseRoutes } from '../routes';

function App() {
  const redirectRoutes = redirects.map((redirect, index) => <Redirect key={index} {...redirect} />);
  const routes = baseRoutes.map((route, index) => <Route key={index}{...route} />);
  return (
    <Router>
      <Switch>
        {redirectRoutes}
        {routes}
      </Switch>
    </Router>
  );
}

export default App;
