import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Logo from "../../../assets/logo.png";
import { BoxForm, BoxContent } from "./styles";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  handleSignIn = async (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <BoxContent>
              <img src={Logo} alt="MailShrimp" />
            </BoxContent>
            <BoxForm>
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
                <Button block variant="secondary" typo="submit">
                  Submit
                </Button>
              </Form>
            </BoxForm>
            <BoxContent>
              <p>Novo na plataforma?</p>
              <Link className="button" to="/signup">
                Crie sua conta agora
              </Link>
            </BoxContent>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default SignIn;
