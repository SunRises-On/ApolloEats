import React,{ useState } from "react"; 
import {BsFillCaretDownFill, BsFillCaretUpFill} from 'react-icons/bs';
import  { Table,Collapse,Button, ToggleButton } from "react-bootstrap";
function Management(){
    const [open,setOpen] = useState(false);
    const [isEditing,setIsEditing] = useState(false);
    const [isShowing, setIsShowing] = useState(false);
    const [open2,setOpen2] = useState(false);

    const handleEdit = () =>{
        console.log("in handle click");
        setIsEditing(!isEditing);
    }
    const handleSave = () =>{
        console.log("in handle save");
        setIsEditing(!isEditing);
    }
    return(
        <div className="main">
            <header>Restaurant Management</header>
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Restaurant Name</th>
                            <th>Hide</th>
                            <th>Edit</th>
                            <th>Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            onClick={()=>setOpen(!open)} 
                        >
                            <td>1</td>
                            <td>Child col 2 Child col 2 Child col 2</td>
                            <td>
                                <ToggleButton
                                variant = {!isShowing ? '' : ''}
                                size = "sm"
                                >
                                    {!isShowing?'Show': 'Hide'}
                                </ToggleButton>
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
                                <BsFillCaretDownFill/>
                                <BsFillCaretUpFill/>
                            </td>
                        </tr>
                        <Collapse in={open}>
                            <tr>
                                <td colSpan={3}>
                                    <Table className="mb-0">
                                        <thead>
                                            <tr>
                                                <th width="170">#</th>
                                                <th>Dish Name</th>
                                                <th>Price</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan={"3"}>Child col 1</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </td> 
                            </tr>
                        </Collapse>
                        <tr
                            onClick={()=>setOpen2(!open2)} 
                        >
                            <td>Child col 1</td>
                            <td>Child col 2</td>
                            <td>Child col 3</td>
                        </tr>
                        <Collapse in={open2}>
                                <tr  className="collapse multi-collapse1" id="multiCollapseExample1">
                                    <td>Child col 1</td>
                                    <td>Child col 2</td>
                                    <td>Child col 3</td>
                                </tr>
                        </Collapse>
                    </tbody>
                </Table>
            </>
        </div>
    );
}
export default Management;