import axios from 'axios';

const REGISTER_API_BASE_URL = "http://localhost:8080/api/v1/restaurant/upload";
class UploadService{

    register(payload){
        let token = sessionStorage.getItem('token');
        const headers= { 
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer '.concat(token)
            }; 
        console.log(headers);
        return axios.post(REGISTER_API_BASE_URL, payload,{headers});
    }

}
export default new UploadService();