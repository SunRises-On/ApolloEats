import React from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup, FormCheck } from "react-bootstrap";
// import './style/RegisterStyle.css';
import { ErrorResponse } from "@remix-run/router";
import { useState } from "react";

function Register(){
    const [validated, setValidated]=useState(false);
    const [userValid, setUserValid]= useState(false);
    const [form, setForm] = useState({});
    const [errors, setErrors]=useState({});

    const setField = (field, value)=>{
        setForm({
            ...form,
            [field]: value
        })
        //Check and see if errors exist, and remove from the error object:
        if(!!errors[field]) setErrors({
            ...ErrorResponse,
            [field]:null
        })
    }
    const findFormErrors  =()=>{
        const{username}= form;
        const newErrors={};
        //only letters, length is 8-29 
        var usernameRegex= "^[A-Za-z]{8,29}$";
        //name errors
        if(!username || username === '') {
            newErrors.name = 'Please input username';
            setUserValid(false);
        }
        else if(username.length <= 7){
            newErrors.name = 'Must have more than 7 characters.'
            setUserValid(false);
        }
        else if(!username.match(usernameRegex)){
            newErrors.name = 'Can contain only letters.'
            setUserValid(false);
        }
        else if(username.match(usernameRegex)){
            setUserValid(true);
        }
        return newErrors;
    }
    //const handleSubmit= (username,email,password)=>{
    const handleSubmit =(e)=>{
        e.preventDefault();
        //get our new errors
        const newErrors=findFormErrors();
        // const form = e.currentTarget;
        if(Object.keys(newErrors).length>0){
            setErrors(newErrors);
            //setUserValid(false);
            console.log('Component: sendVerificationCode not working')

            // Event: Cancels Event (Stops HTML Default Form Submit)
            e.preventDefault();

            // Event: Prevents Event Bubbling To Parent Elements
            e.stopPropagation();

        }else{
            //alert('No Errors');
            setUserValid(true);
            console.log(form);
        }


        // setValidated(true);
        // e.preventDefault();
        // console.log(registerPayload);
       // RegisterService.register(registerPayload).then(response =>{
          //get token from response
        //  const token = response.data.token;
          //set JWT token to sessionStorage
         // sessionStorage.setItem("token",token);
          //set token to axios common header
         // setAuthToken(token);
          //redirect user to weather temps
         // window.location.href='/weather';
        //})
          //.catch(error=>ErrorService.handle(error));
    };
    

    

    return(
        <div className="main">
            <Container className="d-flex align-items-center justify-content-center" style={{height: '80vh'}}>
                <Row>
                    <Col>
                        <Card className="m-5" style={{maxWidth: '600px'}}>
                            <Card.Body className='px-5'>
                                <Form 
                                noValidate 
                                validate={validated? 1:0} 
                                onSubmit={handleSubmit}
                                >
                                    <br/>
                                    <h2>CREATE AN ACCOUNT</h2>
                                    <Form.Group className="mb-3 " style={{textAlign:"left"}} controlId="validationCustom01">
                                        <Form.Label >Username</Form.Label>
                                        <InputGroup
                                            id="usernameId"
                                            hasValidation
                                        >
                                            <Form.Control 
                                            required
                                            type="text" 
                                            onChange={e=>setField('username',e.target.value)}
                                            isInvalid={!userValid}
                                            isValid={userValid}
                                            placeholder="Enter username" 
                                            />
                                            <Form.Control.Feedback type="invalid" role="alert">{errors.name}</Form.Control.Feedback>
                                            <Form.Control.Feedback type="valid">Looks Great!</Form.Control.Feedback>
                                            
                                        </InputGroup>
                                        
                                        {/* <Form.Control 
                                        required
                                        type="text" 
                                        // value={registerPayload.username}
                                        placeholder="Enter username" 
                                        // name="username"
                                        // onChange={handleChange}                                            
                                        />
                                        <Form.Control.Feedback 
                                        type="invalid" 
                                        role="alert"
                                        >Please choose a username.</Form.Control.Feedback>
                                        <Form.Control.Feedback type="valid">Looks Great!</Form.Control.Feedback> */}
                                        
                                    </Form.Group>
                                    <br/><br/>
                                    {/* <Form.Group className="mb-3" style={{textAlign:"left"}}  controlId="formBasicEmail" >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                        type="email" 
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={handleChange}
                                        required
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                        <Form.Control.Feedback>Looks great!</Form.Control.Feedback>
                                    </Form.Group> 

                                    <Form.Group className="mb-3" style={{textAlign:"left"}} controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                        type="password" 
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                        required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password must be 8-20 characters, with a mix of letters and numbers.
                                        </Form.Control.Feedback>
                                    </Form.Group> */}

                                    <Button 
                                    variant="primary" 
                                    type="submit"
                                    // onClick={(e)=>handleSubmit(e)}
                                    >
                                        Submit
                                    </Button>
                                    <br/>
                                    <br/>
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