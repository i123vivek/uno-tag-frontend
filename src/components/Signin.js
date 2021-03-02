import React, { Component } from 'react';
import './App.css';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, FormGroup, Label, Row } from 'reactstrap';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            UserName: '',
            Password: ''
        }
        this.Password = this.Password.bind(this);
        this.UserName = this.UserName.bind(this);
        this.login = this.login.bind(this);
    }
    UserName(event) {
        this.setState({ UserName: event.target.value })
    }
    Password(event) {
        this.setState({ Password: event.target.value })
    }
    login(event) {
        // debugger;
        fetch('http://localhost:8000/api/v1/users/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: this.state.UserName,
                password: this.state.Password
            })
        }).then((Response) => Response.json())
            .then((result) => {
                // console.log(result);
                if (result.status === 200) {
                    localStorage.setItem('userInfo', JSON.stringify(result.data));
                    this.props.history.push("/Home");
                }
                else {
                    alert('Invalid User');
                }
            })
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <CardGroup>
                                <Card className="p-2">
                                    <CardBody>
                                        <Form>
                                            <div className="row mb-4 pageheading">
                                                <div className="col-sm-12" style={{ textAlign: 'center', fontWeight: 'bolder', borderBottom: '1px solid black' }}>
                                                    Login
                                                </div>
                                            </div>
                                            <FormGroup>
                                                <Label for="exampleUserName">UserName</Label>
                                                <Input type="email" name="userName" id="exampleUserName" onChange={this.UserName} placeholder="Enter UserName" />
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="examplePassword">Password</Label>
                                                <Input type="password" name="password" id="examplePassword" onChange={this.Password} placeholder="Enter Password" />
                                            </FormGroup>
                                            <Button onClick={this.login} color="success" block>Login</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default Login;