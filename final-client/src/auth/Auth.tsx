import React, { Component } from 'react';
import { Register } from './Register';
import { Login } from './Login';
import Button from '@material-ui/core/Button';
import Home from '../site/Home';


type AcceptedProps = {
    updateSessionToken: (newToken: string) => void;
    updateUserRole: (newUserRole: string) => void;
};

type UserState = {
    showLogin: boolean;
};

export default class Auth extends Component<AcceptedProps, UserState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            showLogin: false,
        };
    }

    loginToggle = (event: any) => {
        event.preventDefault();
        if (this.state.showLogin === false) {
            return this.setState({
                showLogin: true,
            });
        }
        if (this.state.showLogin === true) {
            return this.setState({
                showLogin: false,
            });
        }
    };

    render() {
        return (
            <div className='auth'>
                <div id="registerlogin">
                    {this.state.showLogin ? (
                        <div>
                            <Register updateSessionToken={this.props.updateSessionToken} updateUserRole={this.props.updateUserRole} />
                        </div>
                    ) : (
                        <div>
                            <Login updateSessionToken={this.props.updateSessionToken} updateUserRole={this.props.updateUserRole} />
                        </div>
                    )}
                    <br />
                
                        <Button style={{
                            margin: "auto",
                            width: "50px",
                            textAlign: "center",
                            padding: " 0, 0, 40px, 0"
                        }}
                        
                        variant='outlined' onClick={(e) => { this.loginToggle(e) }}> {this.state.showLogin ? "Already a member? Login" : "Not a member yet? Sign up"}</Button>
                       
                </div>
            </div>
        );
    }
}