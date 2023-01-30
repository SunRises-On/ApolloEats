import React, { useEffect, useState, useReducer } from "react"; 
import { Table,Form,Button,Collapse } from "react-bootstrap";
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs';
import RestaurantsService from "../../services/RestaurantsService";
import ErrorService from "../../services/ErrorService";
import DishTable from "./DishTable";
function RestTable ({rest, deleteD, openModal}){
    
    const [open,setOpen] = useState(false);
    const [add,setAdd] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [originalRegister, setOriginalRegister] = useState(false);

    const handleEdit = () =>{
        console.log("in handleEdit");
        setIsEditing(!isEditing);
    }
    const handleSave = () =>{
        console.log("in handleSave");
        setIsEditing(!isEditing);
        if(isShowing != originalRegister){
            console.log("Api call !!! Change registration");
            updateRegistered();
        }
    }
    function updateRegistered(){
        const name = rest.name;
        console.log("Name  :" + name);
        RestaurantsService.updateRegistered(name, rest).then(response=>{
            console.log("response from registered = " + response.data);
            setOriginalRegister(!originalRegister);

            
        }).catch(error =>{
            console.log("Error from Management.js");
            ErrorService.handle(error);
        })
    }
    const handleOpen = () =>{
      //  console.log("In handleOpen open = " + open);
        setOpen(!open);
    }
    const handleAdd = () =>{
        setAdd(!add);
        openModal(add, rest.name);
    }
    return(
        <>
            <tr id={rest.id}>
                <td>{rest.id}</td>
                <td>{rest.name}</td>
                <td>
                    <Form>
                        <Form.Check
                        type="switch"
                        id="custom-switch"
                        //label = {!isShowing ? 'Show' : 'Hide'}
                        onClick={ ()=>{ setIsShowing(!isShowing); console.log("Switch click")}}
                        disabled={!isEditing ? true: false}
                        >
                        </Form.Check>
                    </Form>
                </td>
                <td>
                    <Button 
                    variant= { !isEditing ? 'primary' : 'success'}
                    size="sm"
                    onClick={!isEditing ? handleEdit : handleSave}
                    >
                        { !isEditing ? 'Edit' : 'Save'}
                    </Button>
                </td>
                <td>
                    <Button
                    variant = 'success'
                    size="sm"
                    onClick={handleAdd}
                    >
                        Add
                    </Button>
                </td>
                <td
                onClick={handleOpen} 
                >
                    {!open ?<BsFillCaretDownFill/> :<BsFillCaretUpFill/>}
                </td>
            </tr>
            <Collapse in={open}>
            <tr>
            <td colSpan={6} >
                <Table className="mb-0">
                    <thead>
                        <tr>
                            <th colSpan={1} style={{width:'10%'}}>#</th>
                            <th colSpan={1} style={{width: '30%'}}>Dish Name</th>
                            <th colSpan={1} style={{width: '20%'}}>Price</th>
                            <th colSpan={1} style={{width: '20%'}}>Edit</th>
                            <th colSpan={1} style={{width: '20%'}}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rest.menu.map((dish)=>(
                            <DishTable
                            key={dish.name}
                            dish={dish}
                            id={dish.id}
                            restName= {rest.name}
                            deleteD={deleteD}
                            //handleOpen={handleOpen}
                            />
                        ))}
                    </tbody>
                </Table>
            </td> 
        </tr>
                
                
            </Collapse>
        </>
    )
}
export default RestTable;