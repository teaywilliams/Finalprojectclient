import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CardActions from '@material-ui/core/CardActions';
import APIURL from '../../helpers/enviroment';



type AcceptedProps = {
    sessionToken: string | null;
};
type ProfileState = {
    title: string;
    picture: string;
    details: string;
    userId: number;
};


export default class ProfileCreate extends Component<AcceptedProps, ProfileState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            title: '',
            picture: '',
            details: '',
            userId: 0,
        };
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        if (this.props.sessionToken) {
            console.log('Before ProfileCreate Fetch');
            fetch(`${APIURL}/profile/add`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.sessionToken
                }),
                body: JSON.stringify({
                    profile: {
                        title: this.state.title,
                        picture: this.state.picture,
                        details: this.state.details,
                        userId: this.state.userId,
                    }
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => console.log(err));
        } else {
            console.log("that didn't work");
        }
    };

    render() {
        return (
            <div id="addBoard">
                <div id='profileCreateDiv'>
                    <h2 id='profileHeading'>Add a Board</h2>
                    <FormControl style={{ backgroundColor: 'rgba(169, 180, 198, 0.3)'}}>
                        <div className='picture'>
                            <TextField
                                label="Board Name"
                                variant="outlined"
                                type='text'
                                onChange={(e) => {
                                    this.setState({ title: e.target.value });
                                }}
                            />
                            {}
                        </div>
                        <div>
                            <TextField
                                label="Image Link"
                                variant='outlined'
                                type='text'
                                onChange={(e) => {
                                    this.setState({ picture: e.target.value });
                                }}
                            />
                        </div>
                        <div>
                            <TextField
                                // id='outlined-textarea'
                                label='Details'
                                type='text'
                                // multiline
                                variant='outlined'
                                onChange={(e) => {
                                    this.setState({ details: e.target.value });
                                }}
                            />
                            <CardActions>
                    
                                    <Button variant='contained' onClick={(e) => { this.handleSubmit(e) }}> <Link to='/profile/mine'/>Add Board</Button>
                        
                            </CardActions>
                        </div>
                        
                    </FormControl>
                    {/* <ProfileCard /> */}
                </div>
            </div>
        );
    }
}