import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Toolbar } from "@material-ui/core";

type AcceptedProps = {
  clearUser: () => void;
  sessionToken: string | null;
  email: string | null | undefined;
};

export class Navbar extends Component<AcceptedProps, {}> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {};
    console.log(props);
  }
  render() {
    return (
      <div className="mainNav">
        {/* <div id="navContainer"></div> */}
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Button style={{ fontSize: 30, margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/profile/mine">
              {" "}
              My Boards
            </Link>
          </Button>
          <Button style={{ fontSize: 30, margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/profile/add">
              {" "}
              Add a Board
            </Link>
          </Button>
          {/* <Button
          style={{ fontSize: 22, margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/profile/mine">
              {" "}
              Update a Board
            </Link>
          </Button> */}
          <Button style={{fontSize: 30, margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/subscription/signup">
              Subscribe
            </Link>
          </Button>
          <Button style={{fontSize: 30, margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/subscription/mine">
              My Subscription
            </Link>
          </Button>
          {/* <Button style={{ fontSize: 22, margin: "1rem 3rem" }}>
            <Link style={{ color: "#000000" }} to="/subscription/update/:id">
              Edit my Subscription
            </Link>
          </Button> */}
          <Button
            style={{ fontSize: 30, margin: "1rem 3rem" }}
            onClick={this.props.clearUser}
          >
            <Link style={{ color: "#000000" }} to="/home">
              Logout
            </Link>
          </Button>
          {console.log("Nav Footer")}
        </Toolbar>
      </div>
    );
  }
}
export default Navbar;