import { Component } from "react";
import Setting from "../Settings/Settings";
import "./Logins.css";
import { BaseShow } from "../Format/Format";

class Server extends BaseShow {
  constructor(probs) {
    super(probs);
    this.state = { ...this.state, Option: 1 };
  }

  active__(type) {
    return type === this.state.Option ? "Active" : "";
  }

  submit() {
    Setting.Server({
      style:
        this.state.Option == 1
          ? "ws"
          : this.state.Option == 2
          ? "wss"
          : this.option_three || "",
      address: this.address || "",
      port: this.port || "",
    });
    console.log("The Address is " + this.address);
  }

  do_render() {
    let data = (
      <div className="Login">
        <div>
          Login to server
          <a
            className="hrefright"
            href="https://github.com/Ahmed-Al-Badri/ServerData"
          >
            The Server Repo
          </a>
        </div>

        <div className="Details">
          Server details
          <div className="Options">
            <div
              className={`Option ${this.active__(1)}`}
              onClick={() => {
                this.setState({ Option: 1 });
              }}
            >
              WS
            </div>
            <div
              className={`Option ${this.active__(2)}`}
              onClick={() => {
                this.setState({ Option: 2 });
              }}
            >
              WSS
            </div>
            <div
              className={`Option ${this.active__(3)}`}
              onClick={() => {
                this.setState({ Option: 3 });
              }}
            >
              {this.state.Option === 3 ? (
                <input
                  className="Input"
                  type="text"
                  onChange={(prob) => {
                    this.option_three = prob.target.value;
                  }}
                />
              ) : (
                <>Other</>
              )}
            </div>
          </div>
        </div>
        <div className="Info">
          <div className="Data">
            <div>Address</div>{" "}
            <input
              className="Get"
              type="text"
              onChange={(prob) => {
                this.address = prob.target.value;
              }}
            />
          </div>
          <div className="Data">
            <div>Port</div>{" "}
            <input
              className="Get"
              type="text"
              onChange={(prob) => {
                this.port = prob.target.value;
              }}
            />
          </div>
        </div>

        <div className="Options">
          <div
            className="Connect"
            onClick={() => {
              this.submit();
            }}
          >
            Connect to Server
          </div>
        </div>
      </div>
    );

    return [data, "server__", {}];
  }
}

class Login extends BaseShow {
  constructor(prob) {
    super(prob);
    this.state = {
      ...this.state,
      option: "login", // Determines if 'login' or 'create'
      email: "",
      username: "",
      password: "",
      name: "",
    };
  }

  active__(type) {
    return type === this.state.option ? "Active" : "";
  }

  submit() {
    if (this.state.option === "create") {
      console.log(
        "Creating account with:",
        this.state.email,
        this.state.username,
        this.state.password
      );
      if (
        this.state.username != "" &&
        this.state.name != "" &&
        this.state.email != "" &&
        this.state.password
      ) {
        Setting.Creats({
          username: this.state.username,
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        });
      }
    } else {
      if (this.state.username != "" && this.state.password != "") {
        Setting.Logins({
          username_email: this.state.username,
          password: this.state.password,
        });
      }
      console.log("Logging in with:", this.state.username, this.state.password);
    }
  }

  do_render() {
    let data = (
      <div className="Login">
        <div>Login or Create Account</div>
        <div className="Options">
          <div
            className={`Option ${this.active__("login")}`}
            onClick={() => this.setState({ option: "login" })}
          >
            Login
          </div>
          <div
            className={`Option ${this.active__("create")}`}
            onClick={() => this.setState({ option: "create" })}
          >
            Create
          </div>
        </div>
        {this.state.option === "create" ? (
          <div className="Info">
            <div className="Data">
              <div>Name</div>
              <input
                className="Get"
                type="text"
                key={"Name"}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="Data">
              <div>Email</div>
              <input
                className="Get"
                type="text"
                key={"Email"}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="Data">
              <div>Username</div>
              <input
                className="Get"
                type="text"
                key={"Username"}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
            <div className="Data">
              <div>Password</div>
              <input
                className="Get"
                type="password"
                key={"Password"}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
          </div>
        ) : (
          <div className="Info">
            <div className="Data">
              <div>Username/Email</div>
              <input
                className="Get"
                type="text"
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
            <div className="Data">
              <div>Password</div>
              <input
                className="Get"
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
          </div>
        )}
        <div className="Options">
          <div
            className="Connect"
            onClick={() => {
              this.submit();
            }}
          >
            {this.state.option === "create" ? "Create Account" : "Login"}
          </div>
        </div>
      </div>
    );

    return [data, "login__", {}];
  }
}

export { Server, Login };
