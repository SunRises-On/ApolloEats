import React from "react";
import * as Yup from 'yup';
import { Container, Row, Col, Card, Form, Button} from "react-bootstrap";
// import './style/RegisterStyle.css';
import { useFormik } from "formik";
import UploadService from "../services/UploadService";
import ErrorService from '../services/ErrorService';
import { setAuthToken } from "../helpers/setAuthToken";
function RestRestaurant(){
    const formik = useFormik({
        initialValues:{
            restaurant: { name:"", registered:true},
            files:["","",""],
        },
        validationSchema: Yup.object().shape({
            restaurant: Yup.object().shape({
                name: Yup.string()
                    .min(3, "*Restaurant names must have at least 3 characters.")
                    .max(100, "*Restaurant names can't be longer than 100 characters")
                    .required("*Restaurant name is required"),
                registered: Yup.bool()
            })
        }),
        onSubmit: values =>{
            alert(JSON.stringify(values));
            UploadService.register(values).then(response=>{
                 //get token from response
                 const token = response.data.token;
                 //set JWT token to sessionStorage
                 sessionStorage.setItem("token",token);
                 //set token to axios common header
                 setAuthToken(token);
                 //redirect to restaurants
                 window.location.href='restaurants';
             })
            .catch(error=>ErrorService.handle(error));
        },
    });
    return(
        <div className="main">
            <Container className="d-flex align-items-center justify-content-center" style={{height: '80vh'}}>
                <Row>
                    <Col>
                        <Card className="m-5" style={{maxWidth: '600px'}}>
                            <Card.Body className='px-5'>
                                <Form onSubmit={formik.handleSubmit} >
                                    <br/>
                                    <h2>Register Restaurant</h2>
                                    <Form.Group controlId="formName" 
                                    className="mb-3"
                                    style={{textAlign:"left"}}
                                    >
                                        <Form.Label>Restaurant Name :</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="restaurant.name"
                                        placeholder="Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.restaurant?.name}
                                        className={formik.touched.restaurant?.name && formik.errors.restaurant?.name? "is-invalid" : (formik.touched.restaurant?.name && !formik.errors.restaurant?.name ? "is-valid" : null)}
                                        />
                                        {formik.touched.restaurant?.name && formik.errors.restaurant?.name ? (
                                            <div style={{color:'#FF6565', padding:'.5em .2em', height:'1em', position:'absolute' ,fontSize:'.8em'}}
                                            >
                                                {formik.errors.restaurant?.name}
                                            </div>
                                        ):null}
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId="formRegistered"
                                    className="mb-3"
                                    style={{textAlign:"left"}}
                                    >
                                        <Form.Check
                                        label={"register"}
                                        type={"checkbox"}
                                        name="restaurant.registered"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.restaurant?.registered}
                                        />
                                        {!formik.touched.restaurant?.registered? (
                                            <div style={{color:'#FF6565', padding:'.5em .2em', height:'1em', position:'absolute' ,fontSize:'.8em'}}
                                            >
                                                Click to show restaurant after upload!
                                            </div>
                                        ):null}
                                    </Form.Group>
                                    <Form.Group controlId="formFile"
                                                className="mb-3"
                                                style={{textAlign:"left"}}
                                    >
                                        <Form.Label>
                                            Restaurant Image:
                                        </Form.Label>
                                        <Form.Control 
                                        type="file" 
                                        name="files[0]"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.files[0]}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formFile"
                                                className="mb-3"
                                                style={{textAlign:"left"}}
                                    >
                                        <Form.Label>
                                            Restaurant License:
                                        </Form.Label>
                                        <Form.Control 
                                        type="file" 
                                        name="files[1]"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.files[1]}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formFile"
                                                className="mb-3"
                                                style={{textAlign:"left"}}
                                    >
                                        <Form.Label>
                                            Restaurant Menu:
                                        </Form.Label>
                                        <Form.Control 
                                        type="file" 
                                        name="files[2]"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.files[2]}
                                        />
                                    </Form.Group>
                                    <br/>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default RestRestaurant;