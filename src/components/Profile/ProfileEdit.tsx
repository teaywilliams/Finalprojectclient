import React, { Component } from "react";
import { TextField, Button, colors } from "@material-ui/core";
import { Link } from "react-router-dom";
import CardActions from '@material-ui/core/CardActions';
import { ProfileDetails } from "../../Interfaces";
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import APIURL from "../../helpers/enviroment";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface Params{id: string}
interface AcceptedProps extends RouteComponentProps<Params>{
    sessionToken: string | null;
    
};

type ProfileDataState = {
    profileData: ProfileDetails[];
    results: ProfileDetails;
    profId: number;
    title: string;
    picture: string;
    details: string;
};

 class ProfileEdit extends Component<AcceptedProps, ProfileDataState>{
    constructor(props: AcceptedProps) {
        super(props);

        const string_id= this.props.match.params.id
        const id= string_id === null || isNaN(parseInt(string_id)) ? 0 : parseInt(string_id)

        this.state = {
            profId: id,
            title: '',
            picture: '',
            details: '',
        
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
            fetch(`${APIURL}/profile/one/${this.state.profId}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                    Accept: "application/json",
                }),
            })
                .then((res) => res.json())
                .then((results) => {
                    const profile = results.profile
                    console.log('results: ', results)
                    this.setState({
                        profId: profile.id,
                        title: profile.title,
                        picture: profile.picture,
                        details: profile.details
                    })
                    
                })
                .catch((err) => console.log(err));
        }
    };

    handleSubmit = (event: any) => {
        console.log('As ProfileEdit Update', this.state);
        if (this.props.sessionToken) {
            event.preventDefault();
            fetch(`${APIURL}/profile/update/${this.state.profId}`, {
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
                    this.props.history.push('/profile/mine')
                })
                .catch((err) => console.log(err));
        }
    };


    handleDelete = (id: number) => {
        if (this.props.sessionToken) {
            fetch(`${APIURL}/profile/delete/${this.state.profId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: this.props.sessionToken,
                }),
            })
                .then((res) => {
                    this.fetchProfile();
                })
                .catch((err) => alert(err));
        }
    };

    render() {
        return (
            <div>
                <div id='profileEditDiv'>
                    <h2 
                    style={{
                        letterSpacing: "5px"
                        
                    }}
                    id='profileEditHeading'>Edit Boards</h2>
                   
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
                            
                            label='Edit Details'
                            type='text'
                            value={this.state.details}
                            variant='outlined'
                            onChange={(e) => {
                                this.setState({ details: e.target.value });
                            }}
                        />
                
                    <div id="editButton">
                        <CardActions style={{justifyContent: "center"}} >
                            <Link to='/profile/mine'>
                            <Button
                            
                             variant='contained' onClick={(e) => { this.handleSubmit(e) }}>
                            
                        
                            <EditIcon />
                                Edit a Profile Entry
                           
                        </Button>
                            </Link>
                        </CardActions>

                
                    </div>
                    <div id="deleteProfileButton">
                        <Link to='/profile/mine'>
                            <Button
                            style={{justifyContent: "center" }}
                                variant='contained'
                               
                                value={this.state.profId}
                                onClick={(e) => {
                                    this.handleDelete(this.state.profId);
                                }}
                            >
                                <DeleteIcon />
                                            Delete Profile
                                    </Button>
                        </Link>
                    </div> */
                    
                </div>
            </div>
        );
    }
}

export default withRouter(ProfileEdit);