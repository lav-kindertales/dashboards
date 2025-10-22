import React from 'react';
import { CustomThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout/Layout';
import './index.css';

function App() {
  return (
    <CustomThemeProvider>
      <Layout />
    </CustomThemeProvider>
  );
}

export default App;