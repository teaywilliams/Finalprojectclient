import React, { Component } from 'react';
import { Register } from './Register';
import { Login } from './Login';
import Button from '@material-ui/core/Button';
import Home from '../site/Home';
// import './Auth.css';

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
            <div>
                <div>
                <Home />
                    {this.state.showLogin ? (
                        <div>
                            <Register updateSessionToken={this.props.updateSessionToken} updateUserRole={this.props.updateUserRole} />
                        </div>
                    ) : (
                        <div>
                            <Login updateSessionToken={this.props.updateSessionToken} 
                            updateUserRole={this.props.updateUserRole}  />
                        </div>
                    )}
                    <br />
                    
                    <div id="toggle">
                        <Button  style={{
                            fontSize: '15px',
                            alignItems: "center",
                            margin: "auto",
                            width: "80px",
                            // justifyContent:'center',
                            display: 'flex',
                            // flexDirection: 'initial',
                            padding: '10px 30px ',
                        }}

                        variant='outlined' onClick={(e) => { this.loginToggle(e) }}> {this.state.showLogin ? "Already a member? Login" : "Not a member yet? Sign up"}</Button>
                        {/* <Home /> */}
                    </div>
                </div>
            </div>
        );
    }
}