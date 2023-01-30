import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/api/v1/restaurant/";
class RestaurantsService{

    getRestaurants(){
        let token = sessionStorage.getItem('token');
        const headers= { 
                Authorization: 'Bearer '.concat(token)
            }; 
        console.log(headers);
        return axios.get(REST_API_BASE_URL,{headers});
    }

    getDishes(name){
        let token = sessionStorage.getItem('token');
        const headers = {
                Authorization: 'Bearer '.concat(token)
        };
        console.log(headers);
        return axios.get(REST_API_BASE_URL + name + '/menu',{headers});
    }

    getRestDishes(){
        let token = sessionStorage.getItem('token');
        const headers = {
                Authorization: 'Bearer '.concat(token)
        };
        console.log(headers);
        return axios.get(REST_API_BASE_URL + "dishes",{headers});
    }
}
export default new RestaurantsService();