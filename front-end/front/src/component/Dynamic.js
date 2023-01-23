import React, {useEffect, useState} from 'react';
import {Card,Row,Col,Container} from 'react-bootstrap';
import ErrorService from '../services/ErrorService';
import RestaurantsService from '../services/RestaurantsService';
export default function Dynamic(){

    //restaurant data
    const [restData, setRestData] = useState([]);
    function getRegRestaurants (){
        RestaurantsService.getRestaurants().then(response=>{
            console.log(response.data);
            //console.log(response.data.restaurant)
           const temp = response.data.restaurant;
           setRestData(JSON.parse(JSON.stringify(temp)));
         //  console.log(JSON.stringify(restData));
          // console.log("At array(0) :" + JSON.stringify(temp.at(0)) );
          //console.log("At array(0) " + JSON.stringify(restData.at(0)));

         //  console.log("At array(1) " + JSON.stringify(restData.at(1).name));
        }).catch(error=>{
            console.log("Error from Dynamic.js");
            ErrorService.handle(error);
        })
    }
    useEffect(()=>{
       getRegRestaurants();
       const interval=setInterval(()=>{
        console.log("Polling database every 10 secs.");
        getRegRestaurants();
       },10000)
       return()=> clearInterval(interval);
    },[restData]);

    if(restData.length>0){
        return(
            <Container>
                <Row>
                    {restData.map((rest, k)=>(
                        <Col key={k} xs={12} md={4} lg={3}>
                            <Card className='m-2'>
                            
                                <Card.Img src={'data:image/png;base64,'+rest.image}/>
                                <Card.Body>
                                    <Card.Title>{rest.name}</Card.Title>
                                </Card.Body> 
                            </Card>
                        </Col> 
                    ))} 
                </Row>
            </Container>
        )
    }else{
        return(
            <header>No restaurants.</header>
        )
    }
}
