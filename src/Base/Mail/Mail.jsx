import { InnerShow } from "../../Format/Format";
import Setting from "../../Settings/Settings";
import { DateFormat } from "../../Settings/Settings";
import "./Style/Style.css";
class Mail extends InnerShow {
  constructor(probs) {
    super(probs);
    this.state = {
      ...this.state,
      mail: null,
      loaded: null,
      found: null,
      mail_id: window.location.pathname.split("/")[2],
    };
  }

  do_mount() {
    Setting.get_mail = (prob) => {
      this.setState({
        loaded: true,
        found: prob != undefined ? true : false,
        mail: prob,
      });
      console.log(prob);
    };
    console.log(this.state.mail_id);
    Setting.Mail_detail(this.state.mail_id);
  }

  onMount_two() {
    console.log("being actived");
    console.log("the url is " + this.state.mail_id);
    this.setState(
      {
        loaded: false,
        found: false,
        mail_id: window.location.pathname.split("/")[2],
      },
      () => {
        console.log("the mail id is now " + this.state.mail_id);
        Setting.Mail_detail(this.state.mail_id);
      }
    );
  }

  do_render() {
    const { loaded, found, mail } = this.state;
    let content;
    if (loaded) {
      if (found && mail) {
        console.log(mail.content.content.replace(/\n/g, <br />));
        let info = mail.content.content.split(/\n/g);

        content = (
          <div className="MailDetails__" key={this.state.mail_id}>
            <div className="TopicString">{`Topic: ${mail.content.topic}`}</div>
            <div className="LayerDetails">
              <div className="Details_1">
                <div>From: {mail.from}</div>
                <div>To: {mail.to.join(", ")}</div>
              </div>
            </div>
            <div className="MailContent">
              <div className="Content_1">
                {...mail.content.content.replace(/\n/g, "<br />")}
              </div>
            </div>
            <div className="DateString">
              {`Date Sent: `}
              {DateFormat(mail.data_send)}
            </div>
          </div>
        );
      } else {
        content = <div>Data not Found</div>;
      }
    } else {
      content = <div>Data is loading...</div>;
    }

    return [content, "Info___", {}];
  }
}

export default Mail;
