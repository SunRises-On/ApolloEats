import React, {useEffect, useState} from 'react';
import {Card,Row,Col,Container} from 'react-bootstrap';
import ErrorService from '../services/ErrorService';
import RestaurantsService from '../services/RestaurantsService';
export default function Dynamic(){

    //restaurant data
    const [restData, setRestData] = useState([]);
    const [im,setIm] = useState("");
    function getRegRestaurants (){
        RestaurantsService.getRestaurants().then(response=>{
           // console.log(response.data);
           // console.log(response.data.list);
           const temp = response.data;
           setRestData(JSON.parse(JSON.stringify(temp)));
          // console.log("At array(0) :" + JSON.stringify(temp.at(0)) );
          console.log("At array(0) " + JSON.stringify(restData.at(0).name));

           console.log("At array(1) " + JSON.stringify(restData.at(1).name));
            setIm(JSON.stringify(restData.at(0).image));
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
    return(
        <Container>
            <Row>
                {restData.map((rest, k)=>(
                    <Col key={k} xs={12} md={4} lg={3}>
                        <Card>
                            
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
}
