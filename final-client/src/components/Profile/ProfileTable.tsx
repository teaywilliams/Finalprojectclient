import React, { Component } from "react";
import { ProfileDetails, Prof } from "../../Interfaces";


// import { ProfileEdit } from './ProfileEdit';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import APIURL from "../../helpers/enviroment";
import { Link } from "react-router-dom";

type AcceptedProps = {
  sessionToken: string | null;

};

type ProfileDataState = {
  profileData: ProfileDetails[];
  results: ProfileDetails;
};
const styles = {
  table: {
    minWidth: 650,
  },
};

export default class ProfileTable extends Component<
  AcceptedProps,
  ProfileDataState
> {
  constructor(props: AcceptedProps) {
    super(props);
    //   console.log(props),
    this.state = {
      profileData: [],
      results: {
        id: 0,
        title: "",
        picture: "",
        details: "",
      },
    };
  }
  componentDidMount() {
    this.fetchProfiles();
  }
  fetchProfiles = () => {
    console.log("Before Profile Table Fetch");
    if (this.props.sessionToken) {
      fetch(`${APIURL}/profile/mine`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((data: ProfileDetails[]) => {
          this.setState({ profileData: data });
        })
        .then(() => {
          if (this.state.profileData !== null) {
            console.log(this.state.profileData);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  profileMapper = () => {
    return this.state.profileData.map((profiles: ProfileDetails, index) => {
      return (
        <TableRow key={index}>
          {/* <TableCell component="th" scope="row">{profiles.id}{" "}</TableCell> */}
          <TableCell align="center">{profiles.title}</TableCell>
          <TableCell align="center"><img src={profiles.picture} style={{width:'100px'}} /></TableCell>
          <TableCell align="center">{profiles.details}</TableCell>
          <TableCell><Link to={`/profile/update/${profiles.id}`}>Edit</Link></TableCell>
        </TableRow>
      );
    });
  };

  handleDelete = (id: number) => {
    if (this.props.sessionToken) {
      fetch(`${APIURL}/profile/delete/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => {
          this.fetchProfiles();
        })
        .catch((err) => alert(err));
    }
  };

  render() {
    return (
      <div>
        <h3
        style={{
          textAlign: 'center', 
          fontSize: '30px', 
          letterSpacing: '3px',
          }}>Current Boards</h3>
        <TableContainer className= "current" component={Paper} style={{width:'1000px', justifyContent: 'center' }}>
          <Table style={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow id='table'>
                <TableCell align="center">Board Title</TableCell>
                <TableCell align="center">Board Image Link</TableCell>
                <TableCell align="center">Board Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.profileMapper()}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}