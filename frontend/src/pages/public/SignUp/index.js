import React from "react";
import { Button, Form, Container, Row, Col, Alert } from "react-bootstrap";
import Logo from "../../../assets/logo.png";
import { BoxForm, BoxContent } from "./styles";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
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
              <h2>Cadastro</h2>
              <p>Informa todos os campos para realizar o cadastro.</p>
              <Form>
                <Form.Group controlId="nomeGroup">
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control type="text" placeholder="Digite seu nome" />
                </Form.Group>
                <Form.Group controlId="emailGroup">
                  <Form.Label>E-mail:</Form.Label>
                  <Form.Control type="email" placeholder="Digite seu e-mail" />
                </Form.Group>
                <Form.Group controlId="dominioGroup">
                  <Form.Label>Domínio:</Form.Label>
                  <Form.Control type="url" placeholder="Digite seu domínio" />
                </Form.Group>
                <Form.Group controlId="senhaGroup">
                  <Form.Label>Senha:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite uma senha"
                  />
                </Form.Group>
              </Form>
              <Button block variant="primary">
                Realizar cadastro
              </Button>
            </BoxForm>
            <BoxContent>
              <Link className="button" to="/signin">
                Voltar para o login
              </Link>
            </BoxContent>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default SignUp;
