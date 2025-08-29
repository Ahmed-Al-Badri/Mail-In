import { Component } from "react";
import { Server, Login } from "./Logins/Logins";
import Setting from "./Settings/Settings";
import Base from "./Base/Base";
class Access extends Component {
  constructor(probs) {
    super(probs);
    this.state = { server: false, login: false };
  }

  componentDidMount() {
    Setting.server = (prob) => {
      this.setState({ server: prob });
    };
    Setting.login = (prob) => {
      this.setState({ login: prob });
    };
    Setting.reconnectWebSocket();
  }

  render() {
    return (
      <>
        {this.state.server == false ? (
          <Server />
        ) : (
          <>
            {this.state.login == false ? (
              <Login />
            ) : (
              <>
                <Base />
              </>
            )}
          </>
        )}
      </>
    );
  }
}

export default Access;
