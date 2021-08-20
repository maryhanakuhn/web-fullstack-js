import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Logo from "../../../assets/logo.png"

class SignIn extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
          <div>
            <img src={Logo} alt="MailShrimp"/>
          </div>
          <h2>Login</h2>
          <p>Informe seus dados para autenticar:</p>
          </Col>
        </Row>
       
      </Container>
    );
  }
}
export default SignIn;
