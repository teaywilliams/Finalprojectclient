import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { UserDetails, UserData } from '../../Interfaces';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import APIURL from '../../helpers/enviroment';


type AdminProps = {
    sessionToken: string | null;
    email: string | null | undefined;
    userId: number;
    updateUserId: (newUserId: number) => void;
};

type UserState = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: string;
    userData: UserDetails[];
    results: UserDetails;
};

export default class AdminEditUser extends Component<AdminProps, UserState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            isAdmin: "",
            userData: [
                {
                    id: 0,
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    isAdmin: '',
                },
            ],
            results: {
                id: 0,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                isAdmin: '',
            },
        };
    }

    fetchUser = () => {
        console.log('Before User Fetch', this.props.sessionToken);
        if (this.props.sessionToken) {
            fetch(`${APIURL}/user/one/${this.props.userId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((res) => res.json())
                .then((results) => {
                    this.setState({ id: results.id });
                    this.setState({ firstName: results.firstName });
                    this.setState({ lastName: results.lastName });
                    this.setState({ email: results.email });
                    this.setState({ isAdmin: results.email });
                })

                .catch((err) => console.log(err));
        }
    };

    handleSubmit = (event: any) => {
        if (this.props.sessionToken) {
            event.preventDefault();
            fetch(`${APIURL}/user/admin/${this.props.userId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    user: {
                        id: this.state.id,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        password: this.state.password,
                        isAdmin: this.state.isAdmin,
                    }
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                });
        }
    };

    handleDelete = (id: number | undefined) => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/user${this.props.userId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((res) => {
                    this.fetchUser();
                })
                .catch((err) => alert(err));
        }
    };
    render() {
        return (
            <div>
                <h3>Edit an account</h3>
                {/* <FormControl> */}
                <TextField
                    label='First Name'
                    type='text'
                    value={this.state.firstName}
                    onChange={(e) => {
                        this.setState({ firstName: e.target.value });
                    }}
                />
                <TextField
                    label='Last Name'
                    type='text'
                    value={this.state.lastName}
                    onChange={(e) => {
                        this.setState({ lastName: e.target.value });
                    }}
                />
                <TextField
                    label='Email'
                    type='text'
                    value={this.state.email}
                    onChange={(e) => {
                        this.setState({ email: e.target.value });
                    }}
                />
                <TextField
                    label='Admin?'
                    type='text'
                    value={this.state.isAdmin}
                    onChange={(e) => {
                        this.setState({ isAdmin: e.target.value });
                    }}
                />
                <div>
                    <Button variant='outlined' color='primary' onClick={(e) => {
                        this.handleSubmit(e);
                        console.log(`
                                id: ${this.state.id},
                                firstName: ${this.state.firstName},
                                lastName: ${this.state.lastName},
                                email: ${this.state.email},
                                admin: ${this.state.isAdmin},
                                `);
                    }}
                    >
                        <Link to='/admin/userTable'>
                            <EditIcon />
                                Edit
                            </Link>
                    </Button>
                    <Link to='/admin/userTable'>
                        <Button variant='outlined' color='primary' value={this.state.id} onClick={(e) => { this.handleDelete(this.state.id); }}>
                            <DeleteIcon />
                                Delete
                            </Button>
                    </Link>
                </div>
            </div>
        );
    }
}