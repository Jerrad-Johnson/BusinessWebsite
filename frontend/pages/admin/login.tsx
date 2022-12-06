import httpClient from "../../common/httpClient";
import {serverUrl} from "../../common/variables";
import {Dispatch, ReactElement, SetStateAction, useState} from "react";
const cc = console.log;

function Login<NextPage>(): ReactElement{

    return (
        <>
            <LoginPanel/>
        </>
    );
}

function LoginPanel(): ReactElement{
    const [username, setUsername]: [string, Dispatch<SetStateAction<string>>] = useState("w");
    const [password, setPassword]: [string, Dispatch<SetStateAction<string>>] = useState("e");

    return (
        <div className={"container container__login container--login--admin"}>
            <h1 className={"container__main-header"}>Admin Login</h1>
            <form>
                <label>Username
                    <input type={"text"} placeholder={"Username"} value={username} onChange={(e) => {
                        e.preventDefault();
                        setUsername(e.target.value);
                    }}/>
                </label>
                <label>Password
                    <input type={"password"} placeholder={"Password"} value={password} onChange={(e) => {
                        e.preventDefault();
                        setPassword(e.target.value);
                    }}/>
                </label>
                <button className={"button button-submit"} onClick={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>Submit</button>
            </form>
        </div>
    );
}




async function handleLogin(): Promise<void>{
    //const res = await httpClient.post(`${serverUrl}/admin/login`);
    //await httpClient.post(`${serverUrl}/admin/images/updateAllImages`);
}


export default Login;