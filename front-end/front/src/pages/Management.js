import React,{ useState, useEffect } from "react"; 
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs';
import  { Table,Collapse,Button, Form } from "react-bootstrap";
function Management(){
    const [open,setOpen] = useState(false);
    const [add,setAdd] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [originalRegister, setOriginalRegister] = useState(false);
    ///////////////////////////////////////////////////////////////////
    const [value,setValue] = useState({
        name: "Dish Name beeb",
        price : "$1.00 boop"
    });
    const [initialValue, setInitialValue] =useState([]);
    const changeHandler = (e) =>{
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };
    const [isEditing2, setIsEditing2] = useState(false);
///////////////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////////
    const handleEdit2 = () =>{
        console.log("in handleEdit2");
        setIsEditing2(!isEditing2);
    }

    const handleSave2 = () => {
        console.log("in handleSave2");
        console.log( "initial name : " + initialValue.name);
        //if string is different do api call        

        setIsEditing2(!isEditing2);
    }

     useEffect(()=>{
        console.log("in use Effect");
        //set initial values
        setInitialValue({
            ...initialValue,
            name: value.name,
            price: value.price
        });
     },[])
    // useEffect(()=> {
    //     setValue(...initialValue2)
    // },[initialValue2])

    return(
        <div className="main">
            <header>Restaurant Management</header>
            <>
                <Table striped bordered hover
                
                >
                    <thead>
                        <tr>
                            <th
                            style={{width:'10%'}}
                            >#</th>
                            <th
                            style={{width: '30%'}}
                            >Restaurant Name</th>
                            <th
                            style={{width: '15%'}}
                            >Hide</th>
                            <th
                            style={{width: '15%'}}
                            >Edit</th>
                            <th
                            style={{width: '15%'}}
                            >Dish</th>
                            <th
                            style = {{width: '15%'}}
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
                        <Collapse in={open}>
                            <tr>
                                <td 
                                colSpan={6}
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
                                                >
                                                    <input
                                                    value={value.name}
                                                    type='text'
                                                    name='name'
                                                    disabled={!isEditing2 ? true : false}
                                                    onChange={changeHandler}
                                                    >
                                                    </input>
                                                </td>
                                                <td
                                                colSpan={1}
                                                >
                                                    <input
                                                    value={value.price}
                                                    type='text'
                                                    name='price'
                                                    disabled={!isEditing2? true : false}
                                                    onChange={changeHandler}
                                                    >
                                                    </input>
                                                </td>
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
                {/* {open && 
                            //<Popup 
                            // show={open} 
                            // onHide={handleClose} 
                            // rest={isClicked}
                            ///>
                    }  */}
            </>
        </div>
    );
}
export default Management;