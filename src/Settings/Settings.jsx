let LOGINS = {
  username_email: sessionStorage.getItem("username_email") || "",
  password: sessionStorage.getItem("password") || "",
};

let CREATS = {
  name: "",
  username: "",
  email: "",
  password: "",
};

let SERVER = {
  style: sessionStorage.getItem("ws") || "ws", // Added default to ws
  address: sessionStorage.getItem("address") || "",
  port: sessionStorage.getItem("port") || "8081", // Default port
};

class Settings {
  constructor() {
    this.server = () => {};
    this.login = () => {};
    this.all_mail = () => {};
    this.mail = () => {};
    this.get_mail = () => {};
    this.style = {};
    this.Style_status = () => {};
    this.users = {};
    this.draft_listener = () => {};
    this.draft_id = null;
    this.reference = sessionStorage.getItem("ref") || "";
    this.draft_request = () => {};
    this.users = {};
    this.current_mails = [];
    this.amounts_mails = () => {};
    this.update_for = "temp";
    //this.chats = [];
    this.onusers = [];
    try {
      this.Server();
      this.Logins();
    } catch (e) {}
  }

  Server(prob = SERVER) {
    sessionStorage.setItem("ws", prob.style);
    sessionStorage.setItem("address", prob.address);
    sessionStorage.setItem("port", prob.port);
    SERVER = prob;
    this.reconnectWebSocket();
  }

  Logins(prob = LOGINS) {
    sessionStorage.setItem("username_email", prob.username_email);
    sessionStorage.setItem("password", prob.password);
    LOGINS = prob;
    if (this.logged) {
      this.reconnectWebSocket(); // Create the WebSocket after login
      this.logged = false;
    }
    //console.log(prob);
    this.send({ type: "login", args: [prob.username_email, prob.password] });
  }

  Creats(prob = CREATS) {
    //sessionStorage.setItem("username", prob.username);
    sessionStorage.setItem("email", prob.email);
    sessionStorage.setItem("password", prob.password);
    CREATS = prob;
    //console.log(prob);
    //console.log("create login");
    if (this.logged) {
      this.reconnectWebSocket(); // Create the WebSocket after account creation
      this.logged = false;
    }
    this.send({
      type: "create_account",
      args: [prob.email, prob.username, prob.password, prob.name],
    });
  }

  reconnectWebSocket(prob = SERVER) {
    if (this.WebS) {
      this.WebS.close(); // Close existing connection if any
    }

    this.WebS = new WebSocket(`${prob.style}://${prob.address}:${prob.port}`);
    this.WebS.onopen = () => {
      this.server(true);
      //console.log("WebSocket connection established.");
    };

    this.WebS.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        this.handleServerResponse(response);
      } catch (e) {}
    };

    this.WebS.onclose = () => {
      this.server(false);
    };

    this.WebS.onerror = () => {
      this.server(false);
    };
  }

  handleServerResponse(response) {
    if (response == "Close") {
      this.WebS.close();
      return;
    }
    // Handle server responses here
    // For example, you might want to distinguish based on response type
    switch (response.type) {
      case "login":
        if (response.status === 1) {
          sessionStorage.setItem("ref", response.response.user.reference);
          //console.log(response);
          this.reference = response.response.user.reference;
          //console.log("the ref given from the server is " + this.reference);
          this.login(true);
          //console.log("Login successful.", response.data);
        } else {
          this.login(false);
          //console.log("Login failed.", response.response);
        }
        break;
      case "create_account":
        if (response.status === 1) {
          sessionStorage.setItem("ref", response.response.user.reference);
          this.reference = response.response.user.reference;
          //console.log(response);
          this.login(true);
          //console.log("Account created successfully.", response.data);
        } else {
          this.login(false);
          //console.log("Account creation failed.", response.response);
        }
        break;
      case "get_mail":
        console.log(response);
        this.get_mail(response.mail);
        break;
      case "all_mails":
        ////console.log(response);
        this.current_mails = response.mails;
        this.users = { ...this.users, ...response.mail_users };
        this.all_mail(response.mails);
        //console.log(this.users);
        //console.log("All Mail");
        break;
      case "get_draft":
        console.log("draft");
        //console.log(response);
        this.draft_request(response.draft);
        break;

      default:
        //console.log(response);
        //console.warn("Unknown response type received.");
        break;
    }
  }

  All_Mails() {
    this.send({
      type: "all_mails",
      args: [this.reference],
    });
  }

  Get_All() {
    this.send({
      type: "get_all",
      args: [this.reference],
    });
  }

  Get_Draft(prob) {
    this.send({
      type: "get_draft",
      args: [this.reference, prob],
    });
  }

  Update_mail(prob, to) {
    this.send({
      type: "update_status",
      args: [this.reference, prob, to],
    });
    this.current_mails.map((res, key) => {
      if (res.mail_id == prob) {
        if (res.status == 6 && to == 6) {
          this.current_mails[key].status = 7;
        } else {
          this.current_mails[key].status = to;
        }
      }
    });
    this.all_mail(this.current_mails);
  }

  Get_User(prob) {
    //if (this.users[prob] == undefined) {
    //  this.send({ type: "user_info", args: [prob] });
    //  return prob;
    //}
    //return this.users[prob];
  }

  Get_Chat(prob) {
    this.send({ type: "get_chat", args: [this.reference, prob] });
  }

  Get_Style() {
    this.send({ type: "get_style", args: [this.reference] });
  }

  Update_Style(prob) {
    this.send({ type: "update_mail", args: [this.reference, prob] });
  }

  Mail_detail(prob) {
    this.send({ type: "get_mail", args: [this.reference, prob] });
  }

  Send_Message(chat_id, message) {
    this.send({
      type: "send_to_chat",
      args: [this.reference, chat_id, message.message],
    });
  }

  Leave_Chat(chat_id) {
    this.send({
      type: "leave_chat",
      args: [this.reference, chat_id],
    });
  }

  async send(prob = {}) {
    if (this.WebS.readyState) {
      this.WebS.send(JSON.stringify(prob));
    } else {
      setTimeout(() => {
        this.send(prob);
      }, 0.25);
    }
  }

  Amount_count() {
    const counts = {
      Inbox: 0,
      Unread: 0,
      Archive: 0,
      Drafts: 0,
      Sent: 0,
      Spam: 0,
      Deleted: 0,
    };

    this.current_mails.forEach((mail) => {
      switch (mail.status) {
        case 0:
          counts["Drafts"]++;
          break;
        case 1:
          counts["Inbox"]++;
          counts["Unread"]++;
          break;
        case 2:
          counts["Inbox"]++;
          break;
        case 3:
          counts["Archive"]++;
          break;
        case 4:
          counts["Sent"]++;
          break;
        case 5:
          counts["Spam"]++;
          break;
        case 6:
          counts["Deleted"]++;
          break;
        default:
          break;
      }
    });
    this.amounts_mails(counts);
  }

  format_mails(type) {
    let validStatuses;
    this.Amount_count();
    switch (type) {
      case "Inbox":
        validStatuses = [1, 2];
        break;
      case "Unread":
        validStatuses = [1];
        break;
      case "Archive":
        validStatuses = [1, 2, 3];
        break;
      case "Drafts":
        validStatuses = [0];
        break;
      case "Sent":
        validStatuses = [4];
        break;
      case "Spam":
        validStatuses = [5];
        break;
      case "Deleted":
        validStatuses = [6];
        break;
      default:
        validStatuses = [1, 2];
        break;
    }

    const filteredData = this.current_mails.filter((data) =>
      validStatuses.includes(data.status)
    );

    const sortedData = filteredData.sort((a, b) =>
      b.date < a.date ? -1 : a.date > b.date ? 1 : 0
    );
    console.log(sortedData);
    console.log("info");
    return sortedData;
  }
}
const DateFormat = (dates) => {
  if (!dates || dates.length === 0) {
    return "";
  }

  const current = new Date();
  const date = new Date(dates);
  const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };

  if (date.getFullYear() !== current.getFullYear()) {
    return (
      <div className="DateFormat">
        {`${date.toLocaleDateString(
          undefined,
          optionsDate
        )} ${date.toLocaleTimeString([], optionsTime)}`}
      </div>
    );
  }

  if (date.getMonth() !== current.getMonth()) {
    return (
      <div className="DateFormat">
        {`${date.toLocaleDateString(undefined, {
          month: "long",
          day: "numeric",
        })} at ${date.toLocaleTimeString([], optionsTime)}`}
      </div>
    );
  }

  if (date.getDate() !== current.getDate()) {
    return (
      <div className="DateFormat">
        {`On ${date.getDate()} ${date.toLocaleDateString(undefined, {
          month: "long",
        })} at ${date.toLocaleTimeString([], optionsTime)}`}
      </div>
    );
  }

  return (
    <div className="DateFormat">
      {`${date.toLocaleTimeString([], optionsTime)}`}
    </div>
  );
};
const Setting = new Settings();

export default Setting;
export { DateFormat };
