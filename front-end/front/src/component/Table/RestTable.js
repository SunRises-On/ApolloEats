import React, { useEffect, useState, useReducer } from "react"; 
import { Table,Form,Button,Collapse } from "react-bootstrap";
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs';
import MenuTable from "./MenuTable";
function RestTable ({rest}){
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
            setOriginalRegister(!originalRegister);
        }
    }

    const handleAdd = () =>{
        setAdd(!add);
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
                onClick={()=>setOpen(!open)} 
                >
                    {!open ?<BsFillCaretDownFill/> :<BsFillCaretUpFill/>}
                </td>
            </tr>
            {/* <Collapse in={open}>
               // <MenuTable />
            </Collapse> */}
        </>
    )
}
export default RestTable;