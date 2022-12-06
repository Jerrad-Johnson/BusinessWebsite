import httpClient from "../../common/httpClient";
import {serverUrl} from "../../common/variables";
import {Dispatch, ReactElement, SetStateAction, useState} from "react";
const cc = console.log;

function Login<NextPage>(){

    return (
        <>
            <LoginPanel/>
        </>
    );
}

function LoginPanel(){
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className={"container container__login container--login--admin"}>
            <h1 className={"container__main-header"}>Admin Login</h1>
            <form>
                <label>Username
                    <input className={""} type={"text"} placeholder={"Username"} value={username} onChange={(e) => {
                        setUsername(e.target.value);
                    }}/>
                </label>
                <label>Password
                    <input className={""} type={"password"} placeholder={"Password"} value={password} onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                </label>
                <button className={"button button-submit"} onClick={(e) => {
                    e.preventDefault();
                    handleLogin(username, password);
                }}>Submit</button>
            </form>
        </div>
    );
}




async function handleLogin(username: string, password: string): Promise<void>{
    const loginInformation: {username: string; password: string} = {"username": username, "password": password}
    const res = await httpClient.post(`${serverUrl}/admin/login`, loginInformation);
    //await httpClient.post(`${serverUrl}/admin/images/updateAllImages`);
}


export default Login;