import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import './style/HomeStyle.css';

function Home(){

    return(
        <div className="main">
            <Container>
                <Row className="row justify-content-center">
                    <Col xs={12} sm={6} md={4} lg={3}>
                        <div style={{display:"flex", justifyContent:"center", textAlign:"center", height:"100vh", alignItems:"center"}}>
                            <Button variant="outline-primary" href="login" >Login</Button>
                            <div style={{width:"5px"}}/>
                            <Button variant="outline-success" href="register">Register</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home; 