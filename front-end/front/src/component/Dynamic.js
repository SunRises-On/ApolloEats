import React, {useEffect, useState} from 'react';
import {Row,Container} from 'react-bootstrap';
import ErrorService from '../services/ErrorService';
import RestaurantsService from '../services/RestaurantsService';
import Popup from './Popup';
import { RestCard } from './RestCard';

export default function Dynamic(){
    const [isLoading,setIsLoading] = useState(false);
    const [open,setOpen] = useState(false);
    const [isClicked, setIsClicked] = useState([]);
    const [restData, setRestData] = useState([]);

    function getRegRestaurants (){
        RestaurantsService.getRestaurants().then(response=>{
            console.log(response.data);
           const temp = response.data.restaurant;
           setRestData(JSON.parse(JSON.stringify(temp)));
        }).catch(error=>{
            console.log("Error from Dynamic.js");
            ErrorService.handle(error);
        })
    }

 
    useEffect(()=>{
       //load from database on render
       if(isLoading === false){
        console.log("Load on restaurants on render.");
        getRegRestaurants();
        setIsLoading(true);
       }
       const interval=setInterval(()=>{
        console.log("Polling database every 10 secs.");
        getRegRestaurants();
       },10000)
       return()=> clearInterval(interval);
    },[restData]);

    const handleOpen = (id) => {
        console.log("handle open : " + id);
        setIsClicked(restData.find(x=>x.id === id));
        console.log(restData.find(x=>x.id=== id));
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setIsClicked([]);
    };

    if(restData.length>0){
        return(
            <Container>
                <Row>
                    {restData.map((rest)=>(
                        <RestCard
                        key={rest.name}
                        rest={rest}
                        id={rest.id}
                        handleOpen={handleOpen}
                        />
                    ))} 
                    {open && 
                            <Popup 
                             show={open} 
                             onHide={handleClose} 
                             rest={isClicked}
                            />
                    } 
                </Row>
            </Container>
        )
    }else{
        return(
            <header>No restaurants.</header>
        )
    }
}
