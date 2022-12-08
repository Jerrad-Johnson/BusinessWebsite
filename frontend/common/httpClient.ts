import axios, {AxiosInstance} from "axios";
export const durationToTimeout: number = 10000;
const cc = console.log;

const httpClient: AxiosInstance = axios.create();
httpClient.defaults.timeout = durationToTimeout;
httpClient.defaults.withCredentials = true;

export default httpClient;