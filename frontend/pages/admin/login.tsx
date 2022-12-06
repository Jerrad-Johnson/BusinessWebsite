import type {JSXElement} from "@babel/types";
import useSWR from "swr";

const cc = console.log;

const loginPanel: JSX.Element = (
  <div className={"container container__login container--login--admin"}>
      <h1 className={"container__main-header"}>Admin Login</h1>
      <form>
          <input type={"text"} placeholder={"Username"}/>
          <input type={"password"} placeholder={"Password"}/>
          <button className={"button button-submit"} onClick={(e) => {
              e.preventDefault();
          }}>Submit</button>
      </form>
  </div>
);

function Login<NextPage>(): JSX.Element{
    return (
        <>
            {loginPanel}
        </>
    );
}

async function handleLogin(): Promise<void>{

}


export default Login;