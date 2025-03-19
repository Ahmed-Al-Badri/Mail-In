import { BaseShow } from "../Format/Format";
import { InnerShow } from "../Format/Format";
import Teps from "./Teps/Teps";
import "./Style/body.css";
import Navigate from "../Format/Navigation/Navigation";
import Mail from "./Mail/Mail";
import { Server, Login } from "../Logins/Logins";
import Setting from "../Settings/Settings";
import Draft from "./Draft/Draft";

class Head extends InnerShow {
  constructor(probs) {
    super(probs);
  }

  do_render() {
    let hold = <>The head</>;

    return [hold, "Head", {}];
  }
}
const Bars = [
  "Unread",
  "Inbox",
  "Archive",
  "Drafts",
  "Sent",
  "Spam",
  "Deleted",
];

class Side extends BaseShow {
  constructor(probs) {
    super(probs);
    this.state = { ...this.state, amounts: {} };
  }

  do_mount() {
    Setting.amounts_mails = (prob) => {
      this.setState({ amounts: prob });
    };
    Setting.Amount_count();
  }

  do_render() {
    let hold = (
      <>
        {Bars.map((type, val) => {
          return (
            <div
              className="Bar"
              key={val}
              onClick={() => {
                Navigate.move_to(type);
              }}
            >
              <div className="Small BarContent">
                <div className="BarName">{type}</div>
                <div className="Amount__">{this.state.amounts[type] || ""}</div>
              </div>
              <div className="BottomLine" />
              <div className="Barline" />
            </div>
          );
        })}
      </>
    );
    return [hold, "Side", {}];
  }
}

class Body extends InnerShow {
  constructor(probs) {
    super(probs);
    this.state = { ...this.state, Draft_load: null };
  }

  do_mount() {
    Setting.All_Mails();
    Setting.draft_listener = (prob) => {
      Setting.draft_id = prob;
      this.setState({ Draft_load: prob });
    };
  }

  do_render() {
    let hold = (
      <>
        <Side />
        <Teps hrefs="" href="" Sharp={true} Tep={Bars[0]} />
        {Bars.map((res, val) => {
          return <Teps href={res} Tep={res} key={val} />;
        })}
        <Mail hrefs="" href="Type" />
        {this.state.Draft_load !== null ? (
          <>
            <Draft
              key={`${this.state.Draft_load} is the draft key`}
              draft={this.state.Draft_load}
            />
          </>
        ) : (
          <div className="Empty__">
            <div
              onClick={() => {
                Setting.draft_listener(undefined);
              }}
              className="DraftMail"
            >
              Compose
            </div>
          </div>
        )}
      </>
    );

    /**
     <div className="Teps__">
          <div className="Info__">
            <div className="Info2__"></div>
          </div>
        </div>
     */

    /**
     
        
     
     */

    return [hold, "Body", {}];
  }
}

class Base extends BaseShow {
  constructor(probs) {
    super(probs);
  }

  do_mount() {
    Setting.All_Mails();
  }

  do_render() {
    let hold = (
      <>
        <Head />
        <Body />
      </>
    );

    return [hold, "Base", {}];
  }
}

export default Base;
