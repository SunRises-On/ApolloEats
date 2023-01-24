import React from "react";
import { Col, Card } from "react-bootstrap";
export const RestCard = ({rest, handleOpen})=>{
   
    return(
        <Col  xs={12} md={4} lg={3}>
            <Card 
            //hoverable
            className='m-2'
            onClick={()=> handleOpen(rest.id)}
            >
                <Card.Img src={'data:image/png;base64,'+rest.image}/>
                <Card.Body>
                    <Card.Title>{rest.name} id ={rest.id}</Card.Title>
                </Card.Body> 
            </Card>
        </Col> 
    );
};