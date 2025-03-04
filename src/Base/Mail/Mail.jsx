import { InnerShow } from "../../Format/Format";
import "./Style/Style.css";
class Mail extends InnerShow {
  constructor(probs) {
    super(probs);
  }

  do_render() {
    let mail_for = window.location.pathname.split("/");
    mail_for = mail_for[2] || "mail not found";
    let hold = (
      <>
        <div className="MailDetails">
          <div className="Topic_1">
            <div className="Border" />
            <div className="TopicString">{`This is the topic for ${mail_for}`}</div>
          </div>
          <div className="LayerDetails">
            <div className="Border" />
            <div className="Details_1">
              <div className="From_1">From who</div>
              <div className="SendTo">To Who</div>
            </div>
          </div>

          <div className="MailContent">
            <div className="SideBorder" />
            <div className="Border" />
            <div className="Content_1">
              This is the content of the mail {"\n"}
              Info
              <div> Datas </div>
              <div> Datas </div>
              <div> Datas </div>
              <div> Datas </div>
            </div>
          </div>
        </div>
      </>
    );

    return [hold, "Info", {}];
  }
}

export default Mail;
