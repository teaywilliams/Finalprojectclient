import React, { Component } from "react";
// import { FormControl, TextField, Button } from "@material-ui/core";
// import FormControl from '@material-ui/core';
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ProfileDetails } from "../../Interfaces";
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import APIURL from "../../lib/enviroment";


type AcceptedProps = {
    sessionToken: string | null;
    profileId: number;
};

type ProfileDataState = {
    profileData: ProfileDetails[];
    results: ProfileDetails;
    profId: number;
    title: string;
    picture: string;
    details: string;
};

// const useStyles = makeStyles({
//     root: {
//         minWidth: 275,
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)',
//     },
//     title: {
//         fontSize: 14,
//     },
//     pos: {
//         marginBottom: 12,
//     },
// });

export class ProfileEdit extends Component<AcceptedProps, ProfileDataState>{
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            profId: 0,
            title: '',
            picture: '',
            details: '',
            // profile: {},
            profileData: [
                {
                    id: 0,
                    title: '',
                    picture: '',
                    details: '',
                },
            ],
            results: {
                id: 0,
                title: '',
                picture: '',
                details: '',
            },
        };
    }
    componentDidMount() {
        this.fetchProfile();
        console.log('ProfEdit Props', this.props);
    }
    fetchProfile = () => {
        if (this.props.sessionToken) {
            console.log('Before ProfileEdit Fetch');
            fetch(`${APIURL}/profile/one/${this.props.profileId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                    Accept: "application/json",
                }),
            })
                .then((res) => res.json())
                .then((results) => {
                    this.setState({ profId: results.id });
                    this.setState({ title: results.title });
                    this.setState({ picture: results.picture });
                    this.setState({ details: results.details });
                    console.log('Record Id from ProfileEdit: ', results.id);
                })
                .catch((err) => console.log(err));
        }
    };

    handleSubmit = (event: any) => {
        console.log('As ProfileEdit Update');
        if (this.props.sessionToken) {
            event.preventDefault();
            fetch(`${APIURL}/profile/update/${this.props.profileId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: this.state.title,
                    picture: this.state.picture,
                    details: this.state.details,
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((err) => console.log(err));
        }
    };


    // handleDelete = (id: number) => {
    //     if (this.props.sessionToken) {
    //         fetch(`${APIURL}/profile/delete/${this.props.profileId}`, {
    //             method: 'DELETE',
    //             headers: new Headers({
    //                 'Content-Type': 'application/json',
    //                 Authorization: this.props.sessionToken,
    //             }),
    //         })
    //             .then((res) => {
    //                 this.fetchProfile();
    //             })
    //             .catch((err) => alert(err));
    //     }
    // };

    render() {
        return (
            <div>
                <div id='profileEditDiv'>
                    <h3 id='profileEditHeading'>Edit Boards</h3>
                    {/* <FormControl style={{ backgroundColor: '#FFFFFF' }}> */}
                    {/* <Card>
                        <CardContent> */}
                    <div>
                        <TextField
                            label="Edit Board Name"
                            variant="outlined"
                            type='text'
                            value={this.state.title}
                            onChange={(e) => {
                                this.setState({ title: e.target.value });
                            }}
                        />
                    </div>
                    <div>
                        <TextField
                            label="Edit Image"
                            variant='outlined'
                            type='text'
                            value={this.state.picture}
                            onChange={(e) => {
                                this.setState({ picture: e.target.value });
                            }}
                        />
                    </div>
                    
                        <TextField
                            // id='outlined-textarea'
                            label='Edit Details'
                            type='text'
                            value={this.state.details}
                            // multiline
                            variant='outlined'
                            onChange={(e) => {
                                this.setState({ details: e.target.value });
                            }}
                        />
                
                    <div id="editButton">
                        <Button variant='contained' onClick={(e) => { this.handleSubmit(e) }}>
                            
                            <Link style={{ color: '#000000' }} to='/profile/mine'>
                            <EditIcon />
                                Edit a Profile Entry
                            </Link>
                        </Button>
                    </div>
                    {/* <div id="deleteProfileButton">
                        <Link to='/profile/mine'>
                            <Button
                                variant='contained'
                                // color='primary'
                                value={this.state.profId}
                                onClick={(e) => {
                                    this.handleDelete(this.state.profId);
                                }}
                            >
                                <DeleteIcon />
                                            Delete Profile
                                    </Button>
                        </Link>
                    </div> */}
                    {/* </CardContent>
                    </Card> */}
                    {/* </FormControl> */}
                </div>
            </div>
        );
    }
}

export default ProfileEdit;