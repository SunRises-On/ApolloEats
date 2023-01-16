class ErrorService{

    handle(error){
        if(error.response){
            //Request completed but server responded with an error
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }else if(error.request){
            //Request completed but no response received from server.
            console.log(error.request);
          }else{
            //Error occured while setting up request.
            console.log("Error : " + error.message);
          }
    }

}
export default new ErrorService();