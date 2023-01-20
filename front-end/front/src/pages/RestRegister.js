import React from "react";
import * as Yup from 'yup';
import { Container, Row, Col, Card, Form, Button} from "react-bootstrap";
// import './style/RegisterStyle.css';
import { useFormik } from "formik";
import RegisterService from '../services/RegisterService';
import ErrorService from '../services/ErrorService';
import { setAuthToken } from "../helpers/setAuthToken";
function RestRestaurant(){
    const formik = useFormik({
        initialValues:{
            user: { name:"", registered:true},
        },
        validationSchema: Yup.object().shape({
            user: Yup.object().shape({
                name: Yup.string()
                    .min(3, "*Restaurant names must have at least 3 characters.")
                    .max(100, "*Restaurant names can't be longer than 100 characters")
                    .required("*Restaurant name is required"),
                registered: Yup.bool()
            })
        }),
        onSubmit: values =>{
            alert(JSON.stringify(values));
            // RegisterService.register(values).then(response=>{
            //     //get token from response
            //     const token = response.data.token;
            //     //set JWT token to sessionStorage
            //     sessionStorage.setItem("token",token);
            //     //set token to axios common header
            //     setAuthToken(token);
            //     //redirect to restaurants
            //     window.location.href='restaurants';
            // })
            // .catch(error=>ErrorService.handle(error));
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
                                        name="user.name"
                                        placeholder="Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.user?.name}
                                        className={formik.touched.user?.name && formik.errors.user?.name? "is-invalid" : (formik.touched.user?.name && !formik.errors.user?.name ? "is-valid" : null)}
                                        />
                                        {formik.touched.user?.name && formik.errors.user?.name ? (
                                            <div style={{color:'#FF6565', padding:'.5em .2em', height:'1em', position:'absolute' ,fontSize:'.8em'}}
                                            >
                                                {formik.errors.user?.name}
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
                                        name="user.registered"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.user?.registered}
                                        />
                                        {!formik.touched.user?.registered? (
                                            <div style={{color:'#FF6565', padding:'.5em .2em', height:'1em', position:'absolute' ,fontSize:'.8em'}}
                                            >
                                                Click to show restaurant after upload!
                                            </div>
                                        ):null}
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