import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/LayoutContainer';
import { CustomThemeProvider } from './ThemeContext';

const App = () => (
  <CustomThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" component={Layout} />
      </Routes>
    </BrowserRouter>
  </CustomThemeProvider>
);

export default App;
