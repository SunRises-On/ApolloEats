import React from "react";
import * as Yup from 'yup';
import { Container, Row, Col, Card, Form, Button} from "react-bootstrap";
// import './style/RegisterStyle.css';
import { useFormik } from "formik";

function Register(){


    const formik = useFormik({
        initialValues:{
            username:"", email:"",password:"",
        },
        validationSchema: Yup.object({
        //elements must be of type string
        username: Yup.string()
        // .matches(!usernameRegEx, "*Username format not valid. Username can only be letters.")
            .min(3, "*Usernames must have at least 3 characters.")
            .max(100, "*Usernames can't be longer than 100 characters")
            .required("*Username is required"),
        email: Yup.string()
            .email("*Must be a valid email address")
            .max(100, "*Email must be less than 100 characters")
            .required("*Email is required"),
        password: Yup.string()
            .required("*Password required.")
        }),
        onSubmit: values =>{
            alert(JSON.stringify(values));
        //    RegisterService.register(values).then(response=>{
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
     
    const usernameRegEx = 'var usernameRegex= "^[A-Za-z]{3,100}$"';
    const emailRegEx = '';
    const passwordRegEx='';
    
    return(
        <div className="main">
            <Container className="d-flex align-items-center justify-content-center" style={{height: '80vh'}}>
                <Row>
                    <Col>
                        <Card className="m-5" style={{maxWidth: '600px'}}>
                            <Card.Body className='px-5'>
                                <Form onSubmit={formik.handleSubmit} >
                                    <br/>
                                    <h2>CREATE AN ACCOUNT</h2>
                                    <Form.Group controlId="formUsername" 
                                    className="mb-3"
                                    style={{textAlign:"left"}}
                                    >
                                        <Form.Label>Username :</Form.Label>
                                        <Form.Control 
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                        //touched is a formik property, been clicked on
                                        // isInvalid={touched.username && errors.username}
                                        className={formik.touched.username && formik.errors.username ? "is-invalid" : (formik.touched.username && !formik.errors.username ? "is-valid" : null)}
                                        />
                                        {formik.touched.username && formik.errors.username ? (
                                            <div style={{color:'#FF6565', padding:'.5em .2em', height:'1em', position:'absolute' ,fontSize:'.8em'}}
                                            >
                                                {formik.errors.username}
                                            </div>
                                        ):null}
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId="formEmail" 
                                    className="mb-3"
                                    style={{textAlign:"left"}}
                                    >
                                        <Form.Label>Email :</Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        className={formik.touched.email && formik.errors.email ? "is-invalid" : (formik.touched.email && !formik.errors.email ? "is-valid" : null)}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div style={{color:'#FF6565', padding:'.5em .2em', height:'1em', position:'absolute' ,fontSize:'.8em'}}
                                            >
                                                {formik.errors.email}
                                            </div>
                                        ):null}
                                    </Form.Group>
                                    <br/>
                                    <Form.Group controlId="formPassword"
                                    className="mb-3"
                                    style={{textAlign:"left"}}
                                    >
                                        <Form.Label>Password :</Form.Label>
                                        <Form.Control
                                        type="text"
                                        name="password"
                                        placeholder="Password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        className={formik.touched.password && formik.errors.password ? "is-invalid" : (formik.touched.password && !formik.errors.password ? "is-valid" : null)}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <div style={{color:'#FF6565', padding:'.5em .2em', height:'1em', position:'absolute' ,fontSize:'.8em'}}
                                            >
                                                {formik.errors.password}
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
    );
}
export default Register;