import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import APIURL from '../helpers/enviroment';


type UserState = {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
};

type AcceptedProps = {
    updateSessionToken: (newToken: string) => void;
    updateUserRole: (newUserRole: string) => void;
};

export class Register extends Component<AcceptedProps, UserState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        };
    }

    handleSubmit = (e: any) => {
        if (
            this.state.email !== "" &&
            this.state.firstName !== "" &&
            this.state.lastName !== "" &&
            this.state.password !== ""
        ) {
            e.preventDefault();
            fetch(`${APIURL}/user/register`, {
                method: "POST",
                body: JSON.stringify({
                    user: {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password
                    }
                }),
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    this.props.updateSessionToken(data.sessionToken);
                });
                
        } else {
            alert("Cannot have empty field");
        }
    };
    handleFirstNameChange = (event: any) => {
        const firstName = event.target.value;
        this.setState({ firstName: firstName });
    };
    handleLastNameChange = (event: any) => {
        const lastName = event.target.value;
        this.setState({ lastName: lastName });
    };
    handleEmailChange = (event: any) => {
        const email = event.target.value;
        this.setState({ email: email });
    };
    handlePasswordChange = (event: any) => {
        const password = event.target.value;
        this.setState({ password: password })
    };

    render() {
        return (
            <div id='registerDiv'>
                <h1 id='welcome'>Welcome!</h1>
                <ValidatorForm
                style={{
                    margin: "auto",
                    width: "50%",
                    
                }}
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={(errors) => console.log(errors)}
                >
                    <TextValidator 
                        label="first name"
                        onChange={this.handleFirstNameChange}
                        name="first name"
                        value={this.state.firstName}
                        validators={["required"]}
                        errorMessages={["Field is required"]}
                        autoComplete="off"
                    />
                    <TextValidator 
                        label="last name"
                        onChange={(e) => this.handleLastNameChange(e)}
                        name="last name"
                        value={this.state.lastName}
                        validators={["required"]}
                        errorMessages={["Field is required"]}
                        autoComplete="off"
                    />
                    <TextValidator
                        label="email"
                        onChange={(e) => this.handleEmailChange(e)}
                        name="email"
                        type="text"
                        value={this.state.email}
                        pattern=".+@.+.com"
                        validators={["required"]}
                        errorMessages={["Must be in standard email format. Ex: youremail@email.com"]}
                    />
                    <TextValidator
                        label="password"
                        onChange={this.handlePasswordChange}
                        name="password"
                        value={this.state.password}
                        type="password"
                        pattern="[z-zA-Z0-9]+"
                        minLength='5'
                        validators={["minStringLength:5", "required"]}
                        errorMessages={["Password must contain one capital letter, one number, and be at least 5 characters in length."]}
                    />
                    <br />
                    <Button variant='outlined' onClick={this.handleSubmit}>
                        Register
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}