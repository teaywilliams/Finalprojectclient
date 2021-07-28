import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Toolbar } from "@material-ui/core";

type ValueTypes = {};
type AcceptedProps = {
    clearUser: () => void;
    sessionToken: string | null;
    email: string | null | undefined;
};

export class AdminNavbar extends Component<AcceptedProps, ValueTypes> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div id='adminContainer'>
                    <div style={{ display: 'block', justifyContent: 'flext-start'}} className='header'>
                      
                        <h1 style={{textAlign: "center", color: "rgba(23, 22, 22, 0.872)"}}>What would you like to manage?</h1>
                    </div>
                </div>
                <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* <Button style={{ margin: '1rem 3rem' }}>
                        <Link style={{ color: "rgba(23, 22, 22, 0.872)", fontSize: "30px" }} to='/admin/home' >Admin Home</Link>
                    </Button> */}
                    {/* <Button style={{ margin: '1rem 3rem' }}>
                        <Link style={{ color: '#0000000' }} to='/admin/userTable'>
                            User Management
                    </Link>
                    </Button> */}
                    <Button style={{ margin: '1rem 3rem' }}>
                        <Link style={{ color: "rgba(23, 22, 22, 0.872)", fontSize: "30px" }} to='/admin/profileEdit'>
                            Profile Entries
                    </Link>
                    </Button>
                    <Button style={{ margin: '1rem 3rem' }}>
                        <Link style={{ color: "rgba(23, 22, 22, 0.872)", fontSize: "30px" }} to='/admin/subscriptionEdit'>
                            Subscriptions
                    </Link>
                    </Button>
                    <Button style={{ margin: '1rem 3rem'}} onClick={this.props.clearUser}>
                        <Link style={{ color: "rgba(23, 22, 22, 0.872)", fontSize: "30px" }} to='/user/register'>
                            Logout
                    </Link>
                    </Button>
                    {console.log('Admin Nav Footer')}
                </Toolbar>
            </div>
        );
    }
}

export default AdminNavbar;