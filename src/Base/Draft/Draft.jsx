import { BaseShow } from "../../Format/Format";
import Setting from "../../Settings/Settings";
import { DateFormat } from "../../Settings/Settings";
import "./Draft.css";

import Holding from "../../assets/Draft.svg";

class Draft extends BaseShow {
  constructor(prob) {
    super(prob);
    this.state = {
      ...this.state,
      draft_id: prob.draft || undefined,
      draft_data: undefined,
      draft_loaded: undefined,
      topic: "",
      valid_to: [],
      temp_to: "",
      content: "",
    };
    let temp = "";
    this.draft = undefined; // prob.data => data
    // prob.id = id
  }

  do_mount() {
    Setting.draft_request = (prob) => {
      this.draft = prob;
      console.log(prob);
      this.setState({
        draft_loaded: true,
        draft_id: prob.id,
        topic: prob.data.content.topic,
        content: prob.data.content.content,
        send_to: prob.data.content.sent_to || "",
        valid_to: prob.data.to,
        data: prob,
      });
      //console.log(prob);
      //console.log("is the gotten id " + prob.id);
      //console.log("The topic is " + prob.data.content.topic);
    };
    //this.data = "data";
    //this.state.send_to = this.data;
    //console.log(this.state.draft_id + " is the wanted id");

    Setting.Get_Draft(this.state.draft_id);
  }

  render() {
    if (this.state.draft_loaded) {
      Setting.Update_Style({
        mail_id: this.state.draft_id,
        to: this.state.valid_to,
        content: {
          topic: this.state.topic,
          content: this.state.content,
          send_to: this.state.send_to,
        },
      });
      console.log("the email send was ");
    }

    let data = (
      <div className="Draft">
        <div className="Draft_main">
          <div
            className="CloseDraft"
            onClick={() => {
              Setting.draft_listener(null);
            }}
          >
            Close
          </div>
          {this.state.draft_loaded ? (
            <>
              <div className="MailDetails__">
                <div className="DateMail">
                  Draft create date{" "}
                  {DateFormat(this.draft.data.date_create || "")}
                  <img src={Holding} className="img" />
                </div>
                <div className="To_send">
                  <div className="Main_to_empty">Recipents{"  "}</div>

                  <div className="Main_to">To {"  "}</div>

                  <input
                    className="DraftInput SENDER__ "
                    onChange={(prob) => {
                      console.log(prob.target.value);
                      console.log(prob.target.value.split(" "));
                      this.setState({
                        send_to: prob.target.value,
                        valid_to: prob.target.value.split(" "),
                      });
                    }}
                    value={this.state.send_to || ""}
                    type="text"
                  />
                </div>
                <div className="Topic">
                  Topic{"  "}
                  <input
                    className="DraftInput TOPIC__ "
                    onChange={(prob) => {
                      this.setState({ topic: prob.target.value });
                    }}
                    value={this.state.topic}
                    type="text"
                  />
                </div>

                <div className="ContentDraft">
                  <div>Content of Mail</div>
                  <textarea
                    className="DraftInput ContentInput BODY__ "
                    onChange={(prob) => {
                      console.log(prob.target.value);
                      this.setState({ content: prob.target.value });
                    }}
                  >
                    {this.state.content}
                  </textarea>
                </div>
                <div className="BottomContent">
                  <div
                    className="BottomData"
                    onClick={() => {
                      console.log("updated mail");
                      Setting.Update_mail(this.state.draft_id, 4);
                      Setting.draft_listener(null);
                    }}
                  >
                    Send Mail
                  </div>
                  <div
                    className="BottomData"
                    onClick={() => {
                      Setting.Update_mail(this.state.draft_id, 6);
                      Setting.draft_listener(null);
                    }}
                  >
                    Delete
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>Draft not loaded</>
          )}
        </div>
      </div>
    );

    return [data];
  }
}

export default Draft;

/*
Mail json data. This.statedraft_data

const mail_data = {
  from: "",
  to: ["", ""],
  previous: "id_of_mail",
  mail_id: "uniqe 18 len or more",
  date_create: "date create",
  is_draft: true, //false if not, as in send.
  data_send: "undefined untile send",
  content: {
    topic: "Topic of the mail",
    content: "contents of the mail",
    date: "date send, as in became undraft",
    leftto: "", // this represents the user sento that are not
    // valid,
  },
}

Setting.users has = {of users} in which
Setting.users[email] = {
name: "",
email: "",
id: "",
}

*/
