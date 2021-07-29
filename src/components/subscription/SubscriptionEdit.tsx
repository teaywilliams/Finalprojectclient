import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { SubscriptionDetails } from '../../Interfaces';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import APIURL from '../../helpers/enviroment';
import {RouteComponentProps, withRouter} from "react-router-dom";


interface Params{id: string}
interface AcceptedProps extends RouteComponentProps<Params>{
  sessionToken: string | null;
  // subscriptionId: number;
};

type SubscriptionDataState = {
  subscriptionData: SubscriptionDetails[];
  results: SubscriptionDetails;
  subId: number;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  zip: string;
};

class SubscriptionEdit extends Component<AcceptedProps, SubscriptionDataState> {
  constructor(props: AcceptedProps) {
    super(props);

    const string_id= this.props.match.params.id
        const id= string_id === null || isNaN(parseInt(string_id)) ? 0 : parseInt(string_id)
console.log(id);
    this.state = {
      subId: id,
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      state: '',
      zip: '',
      subscriptionData: [
        {
          id: 0,
          streetAddress1: '',
          streetAddress2: '',
          city: '',
          state: '',
          zip: '',
        },
      ],

      results: {
        id: 0,
        streetAddress1: '',
        streetAddress2: '',
        city: '',
        state: '',
        zip: '',
      },
    };
  }
  componentDidMount() {
    this.fetchSubscription();
    console.log('SubscriptionEdit Props', this.props);
  }
  fetchSubscription = () => {
    if (this.props.sessionToken) {
      console.log('Before SubscriptionEdit Fetch');
      fetch(`${APIURL}/subscription/mine/${this.state.subId}`, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.props.sessionToken,
          Accept: "application/json",
        }),
      })
        .then((res) => res.json())
        .then((results) => {
          const subscription = results.subscription
          console.log('results: ', results)

          this.setState({ 
            subId: subscription.id,
            streetAddress1: subscription.streetAddress1,
           streetAddress2: subscription.streetAddress2, 
           city: subscription.city,
            state: subscription.state,
            zip: subscription.zip })

          console.log('Record Id from SubscriptionEdit', subscription.id);
        })
        .catch((err) => console.log(err));
    }
  };
  // componentDidMount() {
  //   this.fetchSubscription();
  //   console.log('SubscriptionEdit Props', this.props);
  // }

  handleSubmit = (event: any) => {
    console.log('Before SubscriptionEdit Submit');
    if (this.props.sessionToken) {
      event.preventDefault();
      fetch(`${APIURL}/subscription/update/${this.state.subId}`, {
        method: 'PUT',
        body: JSON.stringify({
          streetAddress1: this.state.streetAddress1,
          streetAddress2: this.state.streetAddress2,
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.props.sessionToken,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.props.history.push('/subscription/mine')
        })
        .catch((err) => console.log(err));
    }
  };

  handleDelete = (id: number) => {
    if (this.props.sessionToken) {
      fetch(`${APIURL}/subscription/delete/${this.state.subId}`, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: this.props.sessionToken,
        }),
      })
        .then((res) => {
          this.fetchSubscription();
        })
        .catch((err) => alert(err));
    }
  };

  render() {
    return (
      <div>
        <div id='subscriptionEditDiv'>
          <h2 id='subscriptionEditHeading'>Edit Your Subscription</h2>
          <div>
            <TextField
              label='Street Address 1'
              variant='outlined'
              type='text'
              value={this.state.streetAddress1}
              onChange={(e) => {
                this.setState({ streetAddress1: e.target.value });
              }}
              />
              </div>
              <div>
            <TextField
              label='Street Address 2'
              variant='outlined'
              type='text'
              value={this.state.streetAddress2}
              onChange={(e) => {
                this.setState({ streetAddress2: e.target.value });
              }}
              />
              </div>
            <div>
              <TextField
                label='City'
                variant='outlined'
                type='text'
                value={this.state.city}
                onChange={(e) => {
                  this.setState({ city: e.target.value });
                }}
              />
              </div>
              <div>
              <TextField
                label='State'
                variant='outlined'
                type='text'
                value={this.state.state}
                onChange={(e) => {
                  this.setState({ state: e.target.value });
                }}
              />
              </div>
              <div>
              <TextField
                label='Zip Code'
                variant='outlined'
                type='text'
                value={this.state.zip}
                onChange={(e) => {
                  this.setState({ zip: e.target.value });
                }}
              />
            </div>
            <div
              style={{
                color: '#000000',
                display: 'flex',
                justifyContent: 'space-evenly',
              }}
            >
              <Button
                variant='contained'
                onClick={(e) => {
                  this.handleSubmit(e);
                }}
              >
                <EditIcon />
                <Link style={{ color: '#000000' }} to='/subscription/mine'>
                  Update
                </Link>
              </Button>
            </div>
            <div>
              <Link style={{ color: '#000000' }} to='/subscription/mine'>
                <Button
                  variant='contained'
                  value={this.state.subId}
                  onClick={(e) => {
                    this.handleDelete(this.state.subId);
                  }}
                >
                  <DeleteIcon />
                  Delete Subscription
                </Button>
              </Link>
            </div>
          {/* </FormControl> */}
        </div>
      </div>
    );
  }
}
export default  withRouter(SubscriptionEdit);