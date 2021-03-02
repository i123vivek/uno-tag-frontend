import React, { Component } from 'react';
import { Button, Card, CardBody, Col, Container, Form, Input, FormGroup, Label, Row } from 'reactstrap';

const options = [
    {
        "key": "AN",
        "name": "Andaman and Nicobar Islands"
    },
    {
        "key": "AP",
        "name": "Andhra Pradesh"
    },
    {
        "key": "AR",
        "name": "Arunachal Pradesh"
    },
    {
        "key": "AS",
        "name": "Assam"
    },
    {
        "key": "BR",
        "name": "Bihar"
    },
    {
        "key": "CG",
        "name": "Chandigarh"
    },
    {
        "key": "CH",
        "name": "Chhattisgarh"
    },
    {
        "key": "DH",
        "name": "Dadra and Nagar Haveli"
    },
    {
        "key": "DD",
        "name": "Daman and Diu"
    },
    {
        "key": "DL",
        "name": "Delhi"
    },
    {
        "key": "GA",
        "name": "Goa"
    },
    {
        "key": "GJ",
        "name": "Gujarat"
    },
    {
        "key": "HR",
        "name": "Haryana"
    },
    {
        "key": "HP",
        "name": "Himachal Pradesh"
    },
    {
        "key": "JK",
        "name": "Jammu and Kashmir"
    },
    {
        "key": "JH",
        "name": "Jharkhand"
    },
    {
        "key": "KA",
        "name": "Karnataka"
    },
    {
        "key": "KL",
        "name": "Kerala"
    },
    {
        "key": "LD",
        "name": "Lakshadweep"
    },
    {
        "key": "MP",
        "name": "Madhya Pradesh"
    },
    {
        "key": "MH",
        "name": "Maharashtra"
    },
    {
        "key": "MN",
        "name": "Manipur"
    },
    {
        "key": "ML",
        "name": "Meghalaya"
    },
    {
        "key": "MZ",
        "name": "Mizoram"
    },
    {
        "key": "NL",
        "name": "Nagaland"
    },
    {
        "key": "OR",
        "name": "Odisha"
    },
    {
        "key": "PY",
        "name": "Puducherry"
    },
    {
        "key": "PB",
        "name": "Punjab"
    },
    {
        "key": "RJ",
        "name": "Rajasthan"
    },
    {
        "key": "SK",
        "name": "Sikkim"
    },
    {
        "key": "TN",
        "name": "Tamil Nadu"
    },
    {
        "key": "TS",
        "name": "Telangana"
    },
    {
        "key": "TR",
        "name": "Tripura"
    },
    {
        "key": "UK",
        "name": "Uttar Pradesh"
    },
    {
        "key": "UP",
        "name": "Uttarakhand"
    },
    {
        "key": "WB",
        "name": "West Bengal"
    }
];
class Register extends Component {

    constructor() {
        super();

        this.state = {
            Name: '',
            State: '',
            UserName: '',
            Password: ''
        }

        this.UserName = this.UserName.bind(this);
        this.Password = this.Password.bind(this);
        this.Name = this.Name.bind(this);
        this.State = this.State.bind(this);
        this.register = this.register.bind(this);
    }

    UserName(event) {
        this.setState({ UserName: event.target.value })
    }
    Password(event) {
        this.setState({ Password: event.target.value })
    }
    State(event) {
        this.setState({ State: event.target.value })
    }
    Name(event) {
        this.setState({ Name: event.target.value })
    }
    register(event) {
        fetch('http://localhost:8000/api/v1/users/signup', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.Name,
                password: this.state.Password,
                userName: this.state.UserName,
                state: this.state.State
            })
        }).then((Response) => Response.json())
            .then((Result) => {
                // console.log("result value here is", Result)
                if (Result.status === 200) {
                    this.props.history.push("/Login");
                }
                else
                    alert('Registration failed !');
            })
    }
    render() {
        return (
            <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="9" lg="7" xl="6">
                            <Card className="mx-4">
                                <CardBody className="p-4">
                                    <Form>
                                        <div className="row mb-4 pageheading">
                                            <div className="col-sm-12" style={{ textAlign: 'center', fontWeight: 'bolder', borderBottom: '1px solid black' }}>
                                                Sign Up
                                            </div>
                                        </div>

                                        <FormGroup>
                                            <Label for="exampleName">Name</Label>
                                            <Input type="text" name="name" id="exampleName" onChange={this.Name} placeholder="Enter Name" />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="exampleUserName">UserName</Label>
                                            <Input type="email" name="userName" id="exampleUserName" onChange={this.UserName} placeholder="Enter UserName" />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="examplePassword">Password</Label>
                                            <Input type="password" name="password" id="examplePassword" onChange={this.Password} placeholder="Enter Password" />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="exampleSelect">State</Label>
                                            <Input type="select" name="state" onChange={this.State} id="exampleState">
                                                {options.map((option) => (
                                                    <option value={option.name}>{option.name}</option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                        <Button onClick={this.register} color="success" block>Create Account</Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>



        );
    }
}
export default Register;