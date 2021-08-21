import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Logo from "../../../assets/logo.png";

class SignIn extends React.Component {
  handleSignIn = async (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={12} md={5}>
            <div>
              <img src={Logo} alt="MailShrimp" />
            </div>
            <h2>Login</h2>
            <p>Informe seus dados para autenticar:</p>
            <Form onSubmit={this.handleSignIn}>
              <Form.Group controlId="emailGroup">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group controlId="passwordGroup">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button block variant="secondary"  typo="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default SignIn;
