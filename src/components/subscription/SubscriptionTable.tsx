import React, { Component } from "react";
import APIURL from "../../helpers/enviroment";
import { SubscriptionDetails } from "../../Interfaces";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

type AcceptedProps = {
  sessionToken: string | null;
  // subscriptionId: number;
  // updateSubscriptionId: (newSubscriptionId: number) => void;
};

type SubscriptionDataState = {
  subscriptionData: SubscriptionDetails[];
  results: SubscriptionDetails;
};
const styles = {
  table: {
    minWidth: 650,
  },
};

export default class SubscriptionTable extends Component<
  AcceptedProps,
  SubscriptionDataState
> {
  constructor(props: AcceptedProps) {
    super(props);
    //   console.log(props),
    this.state = {
      subscriptionData: [],
      results: {
        id: 0,
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        state: "",
        zip: "",
      },
    };
  }
  componentDidMount() {
    this.fetchSubscriptions();
  }
  fetchSubscriptions = () => {
    console.log("Before Subscription Table Fetch");
    if (this.props.sessionToken) {
      fetch(`${APIURL}/subscription/mine`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => res.json())
        .then((data: SubscriptionDetails[]) => {
          this.setState({ subscriptionData: data });
        })
        .then(() => {
          if (this.state.subscriptionData !== null) {
            console.log(this.state.subscriptionData);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  subscriptionMapper = () => {
    return this.state.subscriptionData.map((subscriptions: SubscriptionDetails, index) => {
      return (
        <TableRow key={index}>
          {/* <TableCell component="th" scope="row">
            {subscriptions.id}{" "}
          </TableCell> */}
          <TableCell align="center">{subscriptions.streetAddress1}</TableCell>
          <TableCell align="center">{subscriptions.streetAddress2}</TableCell>
          <TableCell align="center">{subscriptions.city}</TableCell>
          <TableCell align="center">{subscriptions.state}</TableCell>
          <TableCell align="center">{subscriptions.zip}</TableCell>
          <TableCell><Link to={`/subscription/update/${subscriptions.id}`}>Edit</Link></TableCell>
        </TableRow>
      );
    });
  };

  handleDelete = (id: number) => {
    if (this.props.sessionToken) {
      fetch(`${APIURL}/subscription/delete/${id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => {
          this.fetchSubscriptions();
        })
        .catch((err) => alert(err));
    }
  };

  render() {
    return (
      <div>
        <div>
          <h3 
          style={{
            textAlign: 'center', 
            fontSize: '30px', 
            letterSpacing: '3px',
            }}>My Subscription</h3>

          <TableContainer className="mysub" component={Paper} id="subscriptionTable" style={{width:'1000px', justifyContent: 'center', font: '20px'}}>
          
            <Table style={styles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell align="center">id</TableCell> */}
                  <TableCell style={{
                    fontSize: 20,
                  }}
                    align="center">Street Address 1</TableCell>
                  <TableCell style={{
                    fontSize: 20,
                  }}
                  align="center">Street Address 2</TableCell>
                  <TableCell style={{
                    fontSize: 20,
                  }}
                  align="center">City</TableCell>
                  <TableCell style={{
                    fontSize: 20,
                  }}
                  align="center">State</TableCell>
                  <TableCell style={{
                    fontSize: 20,
                  }}
                  align="center">Zip</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.subscriptionMapper()}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}