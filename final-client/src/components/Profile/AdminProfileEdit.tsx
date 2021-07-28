import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ProfileDetails } from "../../Interfaces";
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import APIURL from "../../helpers/enviroment";
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Params{id: string}
interface AcceptedProps extends RouteComponentProps<Params>{
    sessionToken: string | null;
    updateProfileId: (newProfileId: number) => void;
};


type ProfileDataState = {
  profileData: ProfileDetails[];
  results: ProfileDetails;
  profId: number;
  title: string;
  picture: string;
  details: string;
  profile: any;
};

class AdminProfileEdit extends Component< AcceptedProps, ProfileDataState> {
  constructor(props: AcceptedProps) {
    super(props);

    const string_id= this.props.match.params.id
    const id= string_id === null || isNaN(parseInt(string_id)) ? 0 : parseInt(string_id)

    this.state = {
      profId: id,
      title: "",
      picture: "",
      details: "",
      profile: {},
      profileData: [
        {
          id: 0,
          title: "",
          picture: "",
          details: "",
        },
      ],
      results: {
        id: 0,
        title: "",
        picture: "",
        details: "",
      },
    };
  }
  componentDidMount() {
    this.fetchProfile();
    console.log("AdminProfileEdit Props", this.props);
  }
  fetchProfile = () => {
    if (this.props.sessionToken) {
      console.log("Before AdminProfileEdit Fetch");
      fetch(`${APIURL}/profile/one/${this.state.profId}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
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
          details: profile.details,
          profile: profile.profiles,
         })
        })
        .catch((err) => console.log(err));
    }
  };

  handleSubmit = (event: any) => {
    console.log("As ProfileEdit Update", this.state);
    if (this.props.sessionToken) {
      event.preventDefault();
      fetch(`${APIURL}profile/update/${this.state.profId}`, {
        method: "PUT",
        body: JSON.stringify({
          profile: {
            title: this.state.title,
            picture: this.state.picture,
            details: this.state.details,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.title);
        })
        .catch((err) => console.log(err));
    }
  };

  handleDelete = (id: number) => {
    if (this.props.sessionToken) {
      fetch(`${APIURL}/profile/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
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
        <div id="profileEditDiv">
          <h2 id="profileEditHeading">Edit a Board Entry</h2>
          {/* <FormControl style={{ width: "50%", backgroundColor: "#FFFFFF" }}> */}
          <div>
            <TextField
              label="Board Title"
              variant="outlined"
              type="text"
              value={this.state.title}
              onChange={(e) => {
                this.setState({ title: e.target.value });
              }}
            />
            <TextField
              label="Board Image"
              variant="outlined"
              type="text"
              value={this.state.picture}
              onChange={(e) => {
                this.setState({ picture: e.target.value });
              }}
            />
          </div>
          <TextField
            id="outlined-textarea"
            label="Board Details"
            type="text"
            value={this.state.details}
            multiline
            variant="outlined"
            onChange={(e) => {
              this.setState({ details: e.target.value });
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            
            <Button
              variant="contained"
              onClick={(e) => {
                this.handleSubmit(e);
              }}
            >
              <Link style={{ color: "#000000" }} to="/admin/profileList">
                <EditIcon />
                  Edit a Board Item
                </Link>
            </Button>
            <Link to="/admin/profileList">
              <Button
                variant="outlined"
                color="primary"
                value={this.state.profId}
                onClick={(e) => {
                  this.handleDelete(this.state.profId);
                }}
              >
                <DeleteIcon />
                  Delete Board
                </Button>
            </Link>
          </div>
          {/* </FormControl> */}
        </div>
      </div>
    );
  }
}

export default withRouter(AdminProfileEdit);