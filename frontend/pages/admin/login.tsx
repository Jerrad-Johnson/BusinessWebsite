import type {JSXElement} from "@babel/types";
import useSWR from "swr";
const cc = console.log;

const loginPanel: JSX.Element = (
  <div className={"container container__login container--login--admin"}>
      <h1>Admin Login</h1>
  </div>
);

function Login<NextPage>(): JSX.Element{
    return (
        <>
            {loginPanel}
        </>
    );
}

async function updateImages(){
    //let result = await
}


export default Login;