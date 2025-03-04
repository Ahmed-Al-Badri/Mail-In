import { BaseShow } from "../../Format/Format";
import React from "react";
import Navigate from "../../Format/Navigation/Navigation";
const typs = ["Read", "Unread", "Spam", "Delete"];
class Teps extends BaseShow {
  constructor(probs) {
    super(probs);
    this.data = [];
    this.state = {
      ...this.state,
      data_load: false,
      ref: React.createRef(),
      point: 0,
    };
  }

  do_mount() {
    this.dataset();
    window.addEventListener("scroll", () => {
      this.setState({ points: window.scrollY });
    });
  }

  async dataset() {
    let data = [];
    for (let a = 100; a > 0; a--) {
      data.push(`${a} is the current amount`);
    }
    this.data = data;
    this.setState({ data_load: true });
  }

  do_render() {
    let starts = [];
    let widths = 300;
    let screen = window.outerHeight;
    let display = Math.floor(screen / 35) + 2;
    if (this.state.ref.current) {
      let windows = window.scrollY;
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

      let curs = points / 35;
      curs = Math.floor(curs);
      //console.log("the points " + points);

      //console.log(curs + " is the display location");
      for (let b = 0; b < display && b + curs < this.data.length; b++) {
        starts.push(b + curs);
      }
    } else {
      for (let b = 0; b < display && b < this.data.length; b++) {
        starts.push(b);
      }
    }

    let hold = (
      <>
        {this.state.data_load == true ? (
          <>
            {starts.map((res, info) => {
              return (
                <div
                  key={`${res * 35}`}
                  style={{
                    top: res * 35,
                    position: "absolute",
                    height: "35px",
                  }}
                  onClick={() => {
                    Navigate.move_to("Type", `${100 - info}${this.href || ""}`);
                  }}
                >
                  <div>
                    <div className={`Mails`} key={res}>
                      <div className="Content">
                        <div className="BottomLine" />
                        <div className="Title Text_Words">
                          {`${this.data[res]} for ${this.href}`}
                          <div className="Small Text_Words">
                            {" "}
                            - Small notes
                            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                          </div>
                        </div>

                        <div className="From">This is from</div>
                        <div className="Date">12:12:12 12:12 AM</div>
                        <div className="has_been">One day ago</div>
                        <div className="FunRuns">
                          {typs.map((res, val) => {
                            return (
                              <div
                                key={val}
                                style={{
                                  right: `${1 + val * 4}%`,
                                }}
                                className="Elements"
                              >
                                <div>{res}</div>
                              </div>
                            );
                          })}
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
      </>
    );

    return [
      hold,
      "Teps",
      { ref: this.state.ref },
      { height: (this.data.length || 1) * 35, position: "relative" },
    ];
  }
}

export default Teps;
