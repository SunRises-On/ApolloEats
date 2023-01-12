import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import './style/RegisterStyle.css';
import { useState } from "react";

function Register(){
    
    const [registerPayload, setRegisterPayload] = useState({
        username: '',  
        email: '',
        password: ''
    })

    const handleChange =(e)=>{
        const key= e.target.name;
        const value = e.target.value;
        setRegisterPayload({...registerPayload,[key]:value});
    }


    //const handleSubmit= (username,email,password)=>{
    const handleSubmit =(e)=>{
        e.preventDefault();
        
        console.log(registerPayload);
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
                                <Form>
                                    <br/>
                                    <h2>CREATE AN ACCOUNT</h2>
                                    <Form.Group className="mb-3" style={{textAlign:"left"}} controlId="formBasicUsername">
                                        <Form.Label >Username</Form.Label>
                                        <Form.Control 
                                        type="username" 
                                        placeholder="Enter username" 
                                        name="username"
                                        onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" style={{textAlign:"left"}}  controlId="formBasicEmail" >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                        type="email" 
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={handleChange}
                                        />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group> 

                                    <Form.Group className="mb-3" style={{textAlign:"left"}} controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                        type="password" 
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Button 
                                    variant="primary" 
                                    type="submit"
                                    onClick={(e)=>handleSubmit(e)}
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