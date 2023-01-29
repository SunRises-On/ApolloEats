import React,{ useState } from "react"; 
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs';
import  { Table,Collapse,Button, ToggleButton, Form } from "react-bootstrap";
import { click } from "@testing-library/user-event/dist/click";
function Management(){
    const [open,setOpen] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [originalRegister, setOriginalRegister] = useState(false);


    const [isEditing2, setIsEditing2] = useState(false);
    const [saveName, setSaveName] = useState(false);
    const [savePrice, setSavePrice] = useState(false);

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

    const handleEdit2 = () =>{
        console.log("in handleEdit2");
        setIsEditing2(!isEditing2);
    }

    const handleSave2 = () => {
        console.log("in handleSave2");
        setIsEditing2(!isEditing2);
    }

    return(
        <div className="main">
            <header>Restaurant Management</header>
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th
                            style={{width:'10%'}}
                            >#</th>
                            <th
                            style={{width: '30%'}}
                            >Restaurant Name</th>
                            <th
                            style={{width: '20%'}}
                            >Hide</th>
                            <th
                            style={{width: '20%'}}
                            >Edit</th>
                            <th
                            style = {{width: '20%'}}
                            >Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Restaurant Name</td>
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
                            <td
                            onClick={()=>setOpen(!open)} 
                            >
                                {!open ?<BsFillCaretDownFill/> :<BsFillCaretUpFill/>}
                            </td>
                        </tr>
                        <Collapse in={open}>
                            <tr>
                                <td 
                                colSpan={5}
                                >
                                    <Table className="mb-0">
                                        <thead>
                                            <tr>
                                                <th 
                                               // width="170"
                                                colSpan={1}
                                                style={{width:'10%'}}
                                                >#</th>
                                                <th
                                                colSpan={1}
                                                style={{width: '30%'}}
                                                >Dish Name</th>
                                                <th
                                                colSpan={1}
                                                style={{width: '20%'}}
                                                >Price</th>
                                                <th
                                                colSpan={1}
                                                style={{width: '20%'}}
                                                >Edit</th>
                                                <th
                                                colSpan={1}
                                                style={{width: '20%'}}
                                                >Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td
                                                colSpan={1}
                                                >1</td>
                                                <td
                                                colSpan={1}
                                                >Dish Name</td>
                                                <td
                                                colSpan={1}
                                                >$1.00</td>
                                                <td
                                                colSpan={1}
                                                >
                                                    <Button 
                                                    variant= { !isEditing2 ? 'primary' : 'success'}
                                                    size="sm"
                                                    onClick={!isEditing2 ? handleEdit2 : handleSave2}
                                                    >
                                                        { !isEditing2 ? 'Edit' : 'Save'}
                                                    </Button>
                                                </td>
                                                <td
                                                colSpan={1}
                                                >Delete</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td> 
                            </tr>
                        </Collapse>
                    </tbody>
                </Table>
            </>
        </div>
    );
}
export default Management;