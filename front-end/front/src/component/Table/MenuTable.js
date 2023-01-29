import React, { useEffect, useState, useReducer } from "react"; 
import { Table } from "react-bootstrap";
import DishTable from "./DishTable";
function MenuTable({menu, restName} ){
    return(
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
                        {menu.map((dish)=>(
                            <DishTable
                            key={dish.name}
                            dish={dish}
                            id={dish.id}
                            restName= {restName}
                            //handleOpen={handleOpen}
                            />
                        ))}
                    </tbody>
                </Table>
            </td> 
        </tr>
    );
}
export default MenuTable;