import React, { useEffect, useState, useReducer } from "react"; 
import {Button, Table } from "react-bootstrap";

function DishTable ({dish, restName}){
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

    const [isEditing2, setIsEditing2] = useState(false);
    return(
        <tr id={dish.id} >
            <td colSpan={1}>
                {dish.id}
            </td>
            <td colSpan={1}>
                <input
                value={dish.name}
                type='text'
                name='name'
                disabled={!isEditing2 ? true : false}
                onChange={changeHandler}
                />
            </td>
            <td colSpan={1}>
                <input
                value={dish.price}
                type='text'
                name='price'
                disabled={!isEditing2? true : false}
                onChange={changeHandler}
                />
            </td>
            <td colSpan={1}>
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
    );
}
export default DishTable;