import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Layout/LayoutContainer';
import { CustomThemeProvider } from './ThemeContext';

const App = () => (
  <CustomThemeProvider>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Layout} />
      </Switch>
    </BrowserRouter>
  </CustomThemeProvider>
);

export default App;
