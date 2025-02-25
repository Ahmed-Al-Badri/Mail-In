import { BaseShow } from "../../Format/Format";
import React from "react";

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
    let display = Math.floor(screen / 50) + 2;
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

      let curs = points / 50;
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
                  key={`${res * 50}`}
                  style={{
                    top: res * 50,
                    position: "absolute",
                    height: "50px",
                    width: 400,
                  }}
                >
                  <div key={res}> {this.data[res] + " for " + this.href} </div>
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
      { height: (this.data.length || 1) * 50, position: "relative" },
    ];
  }
}

export default Teps;
