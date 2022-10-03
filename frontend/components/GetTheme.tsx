import {Provider, useSelector} from "react-redux";
import {RootState, store} from "../app/store";
import {ThemeOptions} from "../features/theme/themeSlice";

function GetTheme(){
    return (
        <Provider store={store}>
            <ThemeLink/>
        </Provider>
    );
}

function ThemeLink(){
    const themeType: ThemeOptions = useSelector((state: RootState) => state.theme.value);
    return (
        <link rel={"stylesheet"} href={`/${themeType}.css`}/>
    );
}

export default GetTheme;