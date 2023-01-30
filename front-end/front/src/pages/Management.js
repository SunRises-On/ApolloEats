import React,{ useState, useEffect } from "react"; 
import  { Table,Collapse,Button, Form, Modal, ModalBody } from "react-bootstrap";
import { BsSave } from "react-icons/bs";
import RestTable from "../component/Table/RestTable";
function Management(){
    const [popup, setPopup] = useState(false);
    const [popRestName, setPopRestName] = useState("");
    const [value,setValue] = useState({
        name: "",
        price : ""
    });
    const [restData,setRestData] = useState({
        restaurant :
        [
            {
                id: 1, 
                name:"FrugalEats", 
                registered: true,
                menu:[
                    {
                        id:1,
                        name:"Pizza",
                        price:"$1.00"
                    },
                    {
                        id:2,
                        name:"Soup",
                        price:"$2.50"
                    }
                ]
            },
            {
                id:  2,
                name: "Sonic",
                registered: true,
                menu:[
                    {
                        id:1,
                        name:"Tater Tots",
                        price:"$2.50"
                    },
                    {
                        id:2,
                        name:"Diet Coke",
                        price:"$3.99"
                    }
                ]
                
            }
        ]
    });

    function deleteD(restName, id){
        console.log("restname = " + restName + " id = " + id);
        //filter out deleted dish
        const oldArray = restData.restaurant.map( rest=>{
            if(rest.name.valueOf() === restName.valueOf()){
                let newMenu = rest.menu.filter( dish=>{
                    return dish.id != id
                } )
                rest.menu = newMenu;
                return rest
            }
            return rest
        })
        
        console.log(oldArray);
        setRestData({
            ...restData,
            ...oldArray
        })
        //update id for dish 
        const newArray = restData.restaurant.map( rest=>{
            if(rest.name.valueOf()=== restName.valueOf()){
                let newId = 0;
                let newMenu = rest.menu.map( r=>{
                    newId = newId + 1
                    r.id = newId
                    return r
                })
                rest.menu = newMenu;
                return rest
            }
            return rest
        })
        setRestData({
            ...restData,
            ...newArray
        })
        
    }
    function openModal( openPop, restName ){
        console.log("in openModal = " + openPop + " restName = " + restName);
        setPopup(openPop);
        setPopRestName(restName);

    }
    
    function addDish (restName, newName, newPrice){
        //add new dish too menu:[] 
        const newArray = restData.restaurant.map(rest=>{
            if(rest.name.valueOf()=== restName.valueOf()){
                let newId = rest.menu.length
                console.log(newId)
                let newMenu = rest.menu.map(dish=>{
                    return dish;
                })
                newMenu[newId]={id:newId+1,name:newName,price:newPrice}
                console.log(newMenu)
                rest.menu = newMenu
                return rest
            }
            return rest
        })
        setRestData({
            ...restData,
            ...newArray
        })
    }
    ///////////////////
    const handleClose = () => {
        setPopup(false);
        //setIsClicked([]);
    };
    const changeHandler = (e) =>{
        console.log("change = " + e.target.value);
        
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };
    const handleSave = (e) =>{
        e.preventDefault();
        //api call add new dish !!!
        console.log(" rest name = " + popRestName +" name = " +value.name +" price = " + value.price) ; 
        addDish(popRestName, value.name, value.price);
        
        setValue({
            ...value,
            name: "", price:""
        })
    }
    return(
        <div className="main">
            <>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th style={{width: '10%'}}>#</th>
                            <th style={{width: '30%'}}>Restaurant Name</th>
                            <th style={{width: '15%'}}>Hide</th>
                            <th style={{width: '15%'}}>Edit</th>
                            <th style={{width: '15%'}}>Dish</th>
                            <th style={{width: '15%'}}>Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restData.restaurant.map((rest)=>(
                            <RestTable
                            key={rest.name}
                            rest={rest}
                            id={rest.id}
                            deleteD={deleteD}
                            openModal={openModal}
                            //handleOpen={handleOpen}
                            />
                        ))} 
                    </tbody>
                </Table>
                 {popup && 

                    <Modal
                    centered
                    show={popup} 
                    onHide={handleClose} 
                    >
                        <Modal.Header closeButton>

                        </Modal.Header>
                        <ModalBody>
                            {popRestName}
                            <br/>
                            <label>
                                Name:
                                <input
                                value={value.name}
                                type="text"
                                name="name"
                                onChange={changeHandler}
                                />
                            </label>
                            <br/><br/>
                            <label>
                                Price:
                                <input
                                value={value.price}
                                type="text"
                                name="price"
                                onChange={changeHandler}
                                />
                            </label>
                        </ModalBody>
                        <Modal.Footer>
                            <Button onClick={handleSave}>Save</Button>
                            <Button onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                }  
            </>
        </div>
    );
}
export default Management;