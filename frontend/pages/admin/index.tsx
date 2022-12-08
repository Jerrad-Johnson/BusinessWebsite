import useSWR from "swr";
import httpClient from "../../common/httpClient";
import {serverUrl} from "../../common/variables";
import {ReactElement} from "react";
const cc = console.log;

function Index<NextPage>(): ReactElement{
    return (
        <button onClick={(e) => {
            updateImages();
        }}>Update Images</button>
    );
}

async function updateImages(): Promise<void>{
    await httpClient.post(`${serverUrl}/admin/images/updateAllImages`);
}


export default Index;