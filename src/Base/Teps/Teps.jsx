import { BaseShow } from "../../Format/Format";
import React from "react";
import Navigate from "../../Format/Navigation/Navigation";
import Setting from "../../Settings/Settings";
import { DateFormat } from "../../Settings/Settings";
import "../Style/body.css";
const Bars = [
  "Unread",
  "Inbox",
  "Archive",
  "Drafts",
  "Sent",
  "Spam",
  "Deleted",
];

const typs = ["Read", "Unread", "Archive", "Spam", "Delete"];
const for_draft = ["Send", "Delete"];

const type_do = (prob) => {
  if (prob == "Read") {
    return 2;
  }
  if (prob == "Unread") {
    return 1;
  }
  if (prob == "Archive") {
    return 3;
  }
  if (prob == "Spam") {
    return 5;
  }
  if (prob == "Delete") {
    return 6;
  }
  if (prob == "Send") {
    return 4;
  }
};

const return_icon = (prob, className = "") => {
  if (prob == "Read") {
    return <img src="/Read.svg" alt="Read" className={`ICON ${className}`} />;
  }
  if (prob == "Unread") {
    return (
      <img src="/UnRead.svg" alt="UnRead" className={`ICON ${className}`} />
    );
  }
  if (prob == "Mail") {
    return (
      <img src="/MailIn.svg" alt="Mailin" className={`ICON ${className}`} />
    );
  }
  if (prob == "Spam") {
    return <img src="/Spam.svg" alt="Spam" className={`ICON ${className}`} />;
  }
  if (prob == "Delete") {
    return (
      <img src="/Deleted.svg" alt="Delete" className={`ICON ${className}`} />
    );
  }
  if (prob == "Send") {
    return <img src="/Draft.svg" alt="Draft" className={`ICON ${className}`} />;
  }
};

class Teps extends BaseShow {
  constructor(probs) {
    super(probs);
    this.data = [];
    this.state = {
      ...this.state,
      data_load: false,
      ref: React.createRef(),
      point: 0,
      mails: Setting.format_mails(this.href),
      size: 40,
    };
    this.temps__ = 1;
  }

  do_mount() {
    this.dataset();
    window.addEventListener("resize", (prob) => {
      if (window.innerWidth <= 900) {
        if (this.state.size == 40) {
          this.setState({ size: 80 });
        }
      } else {
        if (this.state.size == 80) {
          this.setState({ size: 40 });
        }
      }
      console.log(window.innerWidth);
      console.log("size");
    });

    if (window.innerWidth <= 900) {
      this.setState({ size: 80 });
    }
    // if (this.state.ref.current) {
    //   console.log(this.state.ref);
    //   //console.log(this.state.ref);
    //   this.state.ref.current.addEventListener("scroll", (prob) => {
    //     //console.log("log2");
    //     //console.log(prob);
    //     console.log(prob.target.scrollTop + " for first");
    //     this.setState({ points: prob.target.scrollTop });
    //   });
    // }

    if (this.state.active) {
      Setting.all_mail = (prob) => {
        this.setState(
          { mails: Setting.format_mails(this.href), data_load: true },
          () => {
            //console.log(this.state.mails);
            //console.log(this.href);
          }
        );
        console.log("Loaded");
      };
      Setting.update_for = this.href;
      Setting.All_Mails();
    }

    //window.addEventListener("scroll", () => {
    ////console.log("log");
    //  this.setState({ points: window.scrollY });
    //});
  }

  onMount_two() {
    //let b = this.temps__++;
    if (this.state.active) {
      Setting.all_mail = (prob) => {
        this.setState(
          { mails: Setting.format_mails(this.href), data_load: true },
          () => {
            console.log(this.state.mails);
            console.log(this.href);
          }
        );
        console.log("Loaded");
      };
      Setting.update_for = this.href;
      Setting.All_Mails();
    }

    // if (this.state.ref.current) {
    //   this.state.ref.current.removeEventListener("scroll", (prob) => {
    //     //console.log(b);
    //     this.setState({ points: prob.target.scrollTop });
    //   });
    //   this.state.ref.current.addEventListener("scroll", (prob) => {
    //     console.log(prob.target.scrollTop);
    //     this.setState({ points: prob.target.scrollTop });
    //   });
    // }
  }

  ramdoms(info) {
    let ramd = info; //Math.floor(Math.random() * 100.0);
    ramd %= 4;
    if (ramd == 0) {
      return "Unread";
    }
    if (ramd == 1) {
      return "Read";
    }
    if (ramd == 2) {
      return "Spam";
    }
    return "Deleted";
  }

  offMount_two() {}

  async dataset() {
    let data = [];
    for (let a = 100; a > 0; a--) {
      data.push(`${a} is the current amount`);
    }
    this.data = data;
    this.setState({ data_load: true });
  }

  mail_style(prob) {
    if (prob == 1) {
      return "Unread";
    }
    return "Read";
  }

  do_render() {
    let starts = [];
    let widths = 300;
    let screen = window.outerHeight;
    let display = Math.floor(screen / this.state.size) + 2;
    if (this.state.ref.current) {
      let windows = this.state.points || 0;
      widths = this.state.ref.current.clientWidth;
      let top = this.state.ref.current.offsetTop;
      //console.log(window.scrollY + " is the scroll while the top is " + top);

      //console.log(screen + " is the screen size");
      ////
      let points = windows - top;
      if (points < 0) {
        points = 0;
      } else {
        points = Math.floor(points);
      }

      let curs = points / this.state.size;
      curs = Math.floor(curs);
      //console.log("the points " + points);

      //console.log(curs + " is the display location");
      for (
        let b = 0;
        b < display && b + curs - 2 < this.state.mails.length;
        b++
      ) {
        if (b + curs - 2 >= 0) {
          starts.push(b + curs - 2);
        }
        //starts.push(b + curs);
      }
    } else {
      for (let b = 0; b < display && b < this.state.mails.length; b++) {
        starts.push(b);
      }
    }

    let hold = (
      <>
        <div
          onLoad={() => {
            console.log("AAAAAA");
          }}
          key={this.state.mails.length}
          className="Info__"
          ref={this.state.ref}
          onScroll={(prob) => {
            this.setState({ points: prob.target.scrollTop });
          }}
        >
          <div
            className={`Teps ${this.state.size == 80 ? "Smaller" : ""}`}
            key={this.state.mails.length}
            style={{ height: (this.state.mails.length || 1) * this.state.size }}
          >
            {this.state.data_load == true ? (
              <>
                {starts.map((res, info) => {
                  return (
                    <div
                      key={`${res * this.state.size}`}
                      style={{
                        top: res * this.state.size,
                        position: "absolute",
                        height: `${this.state.size}px`,
                      }}
                      onClick={() => {
                        console.log(this.state.mails[res]);
                        console.log("is the onclick mail");
                        if (this.state.mails[res].is_draft) {
                          Setting.draft_listener(this.state.mails[res].mail_id);
                        } else {
                          Navigate.move_to(
                            "Type",
                            `${this.state.mails[res].mail_id}`
                          );
                          if (this.state.mails[res].status == 1) {
                            Setting.Update_mail(
                              this.state.mails[res].mail_id,
                              2
                            );
                          }
                        }
                      }}
                    >
                      <div className={``} key={this.state.mails[res].mail_id}>
                        <div
                          className={`Mails ${this.mail_style(
                            this.state.mails[res].status
                          )} `}
                          key={res}
                        >
                          <div className={`Content`}>
                            <div className="BottomLine" />

                            <div className="From Text_Words ">
                              From :{this.state.mails[res].from || "Not Set"}
                            </div>

                            <div className="Title Text_Words">
                              {`${this.state.mails[res].topic || "No Topic"}`}
                              <div className="Small Text_Words">
                                {this.state.mails[res].content != "" ? (
                                  `-${
                                    this.state.mails[res].content ||
                                    "No Context"
                                  }`
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>

                            <div className="Date">
                              {DateFormat(this.state.mails[res].date) ||
                                "12:12:12 12:12 AM"}
                            </div>
                            <div className="has_been">One day ago</div>
                            <div className="FunRuns">
                              {this.state.mails[res].is_draft == false ? (
                                <>
                                  {typs.map((ress, val) => {
                                    return (
                                      <div
                                        key={val}
                                        style={{
                                          right: `${val * 4}%`,
                                        }}
                                        className="Elements"
                                        onClick={(temp) => {
                                          temp.stopPropagation();
                                          Setting.Update_mail(
                                            this.state.mails[res].mail_id,
                                            type_do(ress)
                                          );
                                        }}
                                      >
                                        {ress}
                                        {/**
                                          {return_icon(ress)}
                                        <img className="ICON" src="/PAST.svg" />
                                         */}
                                      </div>
                                    );
                                  })}
                                </>
                              ) : (
                                <>
                                  {for_draft.map((ress, val) => {
                                    return (
                                      <div
                                        style={{ right: `${val * 4}%` }}
                                        key={`${val} ${ress}`}
                                        className="Elements"
                                        onClick={(temp) => {
                                          temp.stopPropagation();
                                          Setting.Update_mail(
                                            this.state.mails[res].mail_id,
                                            type_do(ress)
                                          );
                                        }}
                                      >
                                        {ress}
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div>Info not found a</div>
            )}
          </div>
        </div>
      </>
    );

    return [hold, "Teps__", {}, {}];
  }
}

export default Teps;
