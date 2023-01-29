import React,{ useState, useEffect } from "react"; 
import  { Table,Collapse,Button, Form } from "react-bootstrap";
import MenuTable from "../component/Table/MenuTable";
import RestTable from "../component/Table/RestTable";
function Management(){

    const restData ={
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
    }


    return(
        <div className="main">
            <header>Restaurant Management</header>
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
                            //handleOpen={handleOpen}
                            />
                        ))} 
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