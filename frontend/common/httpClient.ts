import axios, {AxiosInstance} from "axios";
export const durationToTimeout: number = 60000;
const cc = console.log;

const httpClient: AxiosInstance = axios.create();
httpClient.defaults.timeout = durationToTimeout;
httpClient.defaults.withCredentials = true;

export default httpClient;