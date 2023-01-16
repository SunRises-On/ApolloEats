import React from "react";
import { Container, Row, Col, Card, Form, Button} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';

import './style/LoginStyle.css';

function Login(){

    const formik = useFormik({
        initialValues:{
            email:"",password:"",
        },
        validationSchema: Yup.object({
        //elements must be of type string
        email: Yup.string(),
        password: Yup.string()
        }),
        onSubmit: values =>{
            alert(JSON.stringify(values));
        //    LoginService.login(values).then(response=>{
                //get token from response
        //        const token = response.data.token;
                //set JWT token to sessionStorage
        //        sessionStorage.setItem("token",token);
                //set token to axios common header
       //         setAuthToken(token);
                //redirect to restaurants
        //        window.location.href='restaurants';
        //    })
        //    .catch(error=>ErrorService.handle(error));
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
                                    <h2>Log in</h2>
                
                                    <br/>
                                    <Form.Group controlId="formEmail" 
                                    className="mb-3"
                                    style={{textAlign:"left"}}
                                    >
                                        {/* <Form.Label>Email :</Form.Label> */}
                                        <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        />
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId="formPassword"
                                    className="mb-3"
                                    style={{textAlign:"left"}}
                                    >
                                        {/* <Form.Label>Password :</Form.Label> */}
                                        <Form.Control
                                        type="text"
                                        name="password"
                                        placeholder="Password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        />
                                    </Form.Group>
                                    <br/>
                                    <Button variant="primary" type="submit">
                                        LOGIN
                                    </Button>
                                    <br/><br/>
                                    <p style={{fontSize:'.8em', textAlign:"left"}}>
                                        Don't have an account? <a href='register' class='link-info' style={{fontSize:'1em'}}>Sign up</a></p>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Login;