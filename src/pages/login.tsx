import Login from "../components/login/login";
import IHttpService from "../services/http-service/http-service.interface";

const LoginPage = ({ httpService }: { httpService: IHttpService }) => {
    return (
        <Login httpService={httpService} />
    )
}

export default LoginPage;
