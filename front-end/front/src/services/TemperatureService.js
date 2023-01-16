import axios from "axios";
// was 8080
const WEATHER_API_BASE_URL = "http://localhost:8080/api/v1/hourly";

class TemperatureService{
     getTemperatures(){
        let token = sessionStorage.getItem('token');
        const headers= { 
                Authorization: 'Bearer '.concat(token)
            }; 
        console.log(headers);
        return axios.get(WEATHER_API_BASE_URL,{headers});
    }

}
export default new TemperatureService();