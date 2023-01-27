import httpClient from "../../common/httpClient";
import {ReactElement, useState} from "react";
const cc = console.log;

function Login<NextPage>(): ReactElement{

    return (
        <>
            <LoginPanel/>
        </>
    );
}

function LoginPanel(): ReactElement{
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
    const res = await httpClient.post(`${process.env.SERVERURL}/admin/login`, {username, password});
    if (res.data.loggedIn === true) window.location.href = "/admin";
}


export default Login;