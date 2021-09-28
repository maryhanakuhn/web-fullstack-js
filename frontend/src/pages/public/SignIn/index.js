import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Logo from "../../../assets/logo.png";
import { BoxForm, BoxContent } from "./styles";
import { Link, withRouter } from "react-router-dom";
import api from "../../../services/api";
import { login } from "../../../services/auth";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };
  handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password, error } = this.state;

    if (!email || !password) {
      this.setState({ error: "Informe todos os campos para acessar!" });
    } else {
      try {
        const response = await api.post("accounts/login", {
          email,
          password,
        });
        login(response.data.token);
        //se der certo redireciona pra essa tela
        this.props.history.push("/");
      } catch (error) {
        console.log(error);
        this.setState({ error: "Ocorreu um erro durante o login na conta" });
      }
    }
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
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Digite seu email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </Form.Group>
                <Form.Group controlId="passwordGroup">
                  <Form.Label>Senha:</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Digite sua senha"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Form.Group>
                <Button block variant="secondary" type="submit">
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
export default withRouter(SignIn);
