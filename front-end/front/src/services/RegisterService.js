import axios from 'axios';

const REGISTER_API_BASE_URL = "http://localhost:8080/api/v1/auth/register";
class RegisterService{

    register(payload){
        return axios.post(REGISTER_API_BASE_URL, payload);
    }

}
export default new RegisterService();