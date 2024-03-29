import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {store} from '../app/store'
import {Provider} from "react-redux";
import GetTheme from "../components/GetTheme";
import {createTheme, ThemeProvider} from "@mui/material";


function MyApp({ Component, pageProps }: AppProps) {
    return (
      <Provider store={store}>
          <GetTheme/>
        <Component {...pageProps} />
      </Provider>
  );
}

export default MyApp;