import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {store} from '../app/store'
import {Provider} from "react-redux";
import GetTheme from "../components/GetTheme";
import {createTheme, ThemeProvider} from "@mui/material";


function MyApp({ Component, pageProps }: AppProps) {

    const muiFontTheme = createTheme({
        Tabs: {
            fontFamily: ["Arapey"],
            "fontSize": 20,
            "fontWeightLight": 300,
            "fontWeightRegular": 400,
            "fontWeightMedium": 500
        }
    });


    return (
        <ThemeProvider theme={muiFontTheme}>
          <Provider store={store}>
              <GetTheme/>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
  );
}

export default MyApp;