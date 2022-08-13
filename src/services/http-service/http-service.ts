import IHttpService from "./http-service.interface";

const defaultDomain = String(process.env.REACT_APP_DOMAIN_URL);
const defaultHeaders:HeadersInit | undefined =  {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export class HttpService implements IHttpService{
    domain:string;
    headers: HeadersInit | undefined;
    constructor(domain:string = defaultDomain, headers = defaultHeaders){
        this.domain = domain;
        this.headers = headers;
    }
    post = (endpoint:string, body: object | string) => {
		return (
			fetch(this.domain + endpoint, {
				method: 'POST',
				headers: this.headers,
				body: JSON.stringify(body)})
                .then(async (response: Response) => {
				return response.json();
			})
				.catch((error: Error) => (error.message))
		)
	}
}