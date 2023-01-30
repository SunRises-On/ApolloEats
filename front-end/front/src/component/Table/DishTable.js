import React, { useEffect, useState, useReducer } from "react"; 
import {Button, Table } from "react-bootstrap";

function DishTable ({dish,id,restName,deleteD}){
    const [deleteDish,setDishDelete] = useState(false);
    const [value,setValue] = useState({
        name: "",
        price : ""
    });
    const [initialVal, setInitialVal]=useState({
        name: "",
        price: ""
    });

    const changeHandler = (e) =>{
        console.log("change = " + e.target.value);
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };
    const handleDelete = () =>{
        console.log("In handle Delete");
        setDishDelete(!deleteDish);
        //api call

        deleteD(restName, dish.id);
  
        //then call api update function from Management js!!!
    }
    const handleEdit2 = () =>{
        console.log("in handleEdit2");
        setIsEditing2(!isEditing2);
    }

    const handleSave2 = () => {
        console.log("in handleSave2");
        
        //if string is different do api call        
        if( initialVal.name.valueOf() != value.name.valueOf()){
            //api call update
            console.log("Api update name "); 

            //then change inital value
            setInitialVal({
                ...initialVal,
                name: value.name
            })

            //then call api update function from Management js !!

        }
        else if( initialVal.price.valueOf() != value.price.valueOf()){
            //api call update
            console.log("Api call price");

            //then change initial value
            setInitialVal({
                ...initialVal,
                price: value.price
            })

            //then call api update function from Management js !!!!
        }

        setIsEditing2(!isEditing2);
    }

     useEffect(()=>{
        console.log("in use Effect");
        //set initial values
        setInitialVal({
            ...initialVal,
            name: dish.name,
            price: dish.price
        });

        setValue({
            ...value,
            name: dish.name,
            price: dish.price
        });
     },[])


    const [isEditing2, setIsEditing2] = useState(false);
    return(
        <tr id={dish.id} >
            <td colSpan={1}>
                {dish.id}
            </td>
            <td colSpan={1}>
                <input
                value={value.name}
                type='text'
                name='name'
                disabled={!isEditing2 ? true : false}
                onChange={changeHandler}
                />
            </td>
            <td colSpan={1}>
                <input
                value={value.price}
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
            >
                <Button
                variant = 'danger'
                size = 'sm'
                onClick={ handleDelete}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}
export default DishTable;