import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainContainer from './components/MainContainer';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <MainContainer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}
