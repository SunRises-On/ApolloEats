import { Modal,Button } from "react-bootstrap";
import React, { useState } from "react";
import RestaurantsService from "../services/RestaurantsService";
import ErrorService from "../services/ErrorService";
export default function Popup({rest, id, onHide, show}){
    
    const [dishes, setDishes] = useState([]);

    console.log(" rest.name : " + rest.name);
    console.log("Popup");

    function getDishes (){
        const payload = rest.name;
        RestaurantsService.getDishes(payload).then(response=>{
            console.log(response.data);
           const temp = response.data;
           setDishes(JSON.parse(JSON.stringify(temp)));
        }).catch(error=>{
            console.log("Error from Dynamic.js");
            ErrorService.handle(error);
        })
    }
    getDishes();
    return(
        <>
            {/* <div 
            onClick={()=>setIsOpen(false)}
            /> */}

            <div>
                <Modal
                    size="lg"
                    centered
                    show={show} 
                    onHide={onHide} 
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {rest.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Menu</h4>
                        {dishes.map((dish)=>(
                            <p>{dish.name} {dish.price}</p>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    );
}