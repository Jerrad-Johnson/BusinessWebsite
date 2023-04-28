import {NavbarOptions, OrientationOptions} from "../../types/layout";
import {Dispatch, SetStateAction, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import MainLayout from "../MainLayout";

export function GalleryMapMain({isUserMobile, width, screenOrientation, navbarOpenOrClosed, setNavbarOpenOrClosed, MapWithNoSSR}:{
    isUserMobile: boolean,
    width: number,
    screenOrientation: OrientationOptions,
    navbarOpenOrClosed: NavbarOptions,
    setNavbarOpenOrClosed: Dispatch<SetStateAction<NavbarOptions>>,
    MapWithNoSSR: React.ComponentType
}){

    const [lens, setLens] = useState("");

    return (
        <MainLayout isUserMobile={isUserMobile} width={width} navbarOpenOrClosed={navbarOpenOrClosed} setNavbarOpenOrClosed={setNavbarOpenOrClosed} screenOrientation={screenOrientation}>
            <div className={"main__content--headline"}></div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Lens</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={lens}
                    onChange={(e) => {
                        setLens(e.target.value);
                    }}
                    label="Lens"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Otus 55</MenuItem>
                    <MenuItem value={20}>Otus 85</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Camera</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={lens}
                    onChange={(e) => {
                        setLens(e.target.value);
                    }}
                    label="Lens"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Otus 55</MenuItem>
                    <MenuItem value={20}>Otus 85</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={lens}
                    onChange={(e) => {
                        setLens(e.target.value);
                    }}
                    label="Lens"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Otus 55</MenuItem>
                    <MenuItem value={20}>Otus 85</MenuItem>
                </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">ISO</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={lens}
                    onChange={(e) => {
                        setLens(e.target.value);
                    }}
                    label="Lens"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Otus 55</MenuItem>
                    <MenuItem value={20}>Otus 85</MenuItem>
                </Select>
            </FormControl>



            <div id={"map"} className={"height: 100px;"}>
                <MapWithNoSSR />
            </div>
        </MainLayout>
    );
}