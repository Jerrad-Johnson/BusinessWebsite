import {Provider, useDispatch, useSelector} from "react-redux";
import {RootState, store} from "../app/store";
import {useEffect} from "react";
import {darkTheme, lightTheme, themeOptions} from "../features/theme/themeSlice";

function GetTheme(){
    return (
        <Provider store={store}>
            <ThemeLink/>
        </Provider>
    );
}

function ThemeLink(){
    let themeType: string = useSelector((state: RootState) => state.theme.value);
    const dispatch = useDispatch();

    useEffect(() => {
        let storedTheme: string | undefined | null = localStorage.getItem("themeStyle");
        if ((storedTheme !== null) && (storedTheme !== undefined)) themeType = storedTheme;
        if (storedTheme === themeOptions.light) dispatch(lightTheme());
        if (storedTheme === themeOptions.dark) dispatch(darkTheme());
    }, []);

    return (
        <>
            <link rel={"stylesheet"} href={`/${themeType}.css`}/>
        </>
    );
}

export default GetTheme;