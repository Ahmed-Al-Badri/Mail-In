import { Component } from "react";
import Settings_ from "./Flex/Flex";
import { Settings } from "./Flex/Flex";
import { get_class_css, get_flex_direction } from "./Flex/Flex";
import Navigate from "./Navigation/Navigation";

class Format extends Component {
  constructor(probs, hold = "main") {
    super(probs);
    this.type = hold;
    this.key = undefined;
    this.nav = undefined;
    this.state = {
      style: {
        display: "flex",
        flexDirection: get_flex_direction(this.type),
      },
      Classname: get_class_css(this.type),
      active: probs.hrefs != undefined ? false : true,
    };
    this.props = probs;
    this.href = probs.hrefs;
    if (probs.hrefs) {
      this.href += "/" + probs.href;
    } else {
      this.href = probs.href;
    }
    this.Sharp = probs.Sharp || false;
    //console.log("is the given " + probs.Sharp);
    this.active = false;
    if (this.href != undefined) {
      this.state.active = this.onpath(
        window.location.pathname.replace("/", ""),
        true
      );
    }
    if (this.href == undefined && this.Sharp) {
      this.href = "";
    }
  }

  componentDidMount() {
    ////console.log(this.type);
    ////console.log(this.href + " is the href");
    this.key = Settings_.append(this.type, () => {
      let hold = { ...this.state.style };
      hold.flexDirection = get_flex_direction(this.type);
      this.setState({
        style: hold,
        Classname: get_class_css(this.type),
      });
    });
    if (this.href != undefined || this.Sharp == true) {
      this.nav = Navigate.append((probs) => {
        ////console.log(probs + " is the amount");
        this.onpath(probs);
      });
    }
    this.do_mount();
  }

  onpath(probs, ig) {
    //console.log("the wanted is " + this.href + " and the aviable is " + probs);
    let hold = false;
    ////console.log(probs + " is the probs");
    ////console.log(this.href + " is the cur");
    //console.log("probs");
    if (this.Sharp) {
      //console.log(
      //  "the wanted is probs :" +
      //    probs +
      //    ": and the given is:" +
      //    this.href +
      //    ":"
      //);
    }
    if (this.Sharp == true && probs == this.href) {
      hold = true;
    }
    if (this.Sharp == false) {
      if (probs.length >= this.href.length) {
        ////console.log("enter the sum");
        if (probs.length == this.href.length) {
          ////console.log("Enter the system");
          if (probs == this.href) {
            hold = true;
          }
        } else {
          hold = true;
          for (let b = this.href.length - 1; b >= 0 && hold == true; b--) {
            if (this.href[b] != probs[b]) {
              hold = false;
            }
          }
          if (hold == true) {
            if (
              probs[this.href.length] == "/" ||
              probs[this.href.length] == undefined
            ) {
              hold = true;
            } else {
              hold = false;
            }
          }
          ////console.log("the hold is " + hold);
        }
      }
    }
    if (ig == undefined) {
      if (hold == true && this.state.active == false) {
        this.setState({ active: true }, () => {
          this.onMount_two();
        });
      } else {
        if (hold == false && this.state.active == true) {
          this.setState({ active: false }, () => {
            this.offMount_two();
          });
        }
      }
    } else {
      return hold;
    }
  }

  onMount_two() {}

  offMount_two() {}

  componentWillUnmount() {
    if (this.key != undefined) {
      Settings_.depend(this.type, this.key);
    }
    if (this.nav != undefined) {
      Navigate.remove(this.nav);
    }
    this.will_un();
  }

  will_un() {}

  do_mount() {}

  do_render() {
    return [<>AA</>, "classname", { onClick: () => {} }];
  }

  render() {
    let hold;
    if (this.state.active) {
      hold = this.do_render();
    }
    return (
      <>
        {this.state.active == true ? (
          <div
            className={`${this.state.Classname} ${hold[1] || ""} ${
              this.active == false ? "" : "active"
            }`}
            style={{ ...this.state.style, ...(hold[3] || {}) }}
            {...(hold[2] || {})}
            key={`${JSON.stringify(this.state.Classname)} ${
              this.state.active
            } ${window.location.pathname}`}
          >
            {hold[0] || <>Empty</>}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

class BaseShow extends Format {
  constructor(probs) {
    super(probs, "base");
  }
}

class InnerShow extends Format {
  constructor(probs) {
    super(probs, "inner");
  }
}

export default Format;
export { BaseShow, InnerShow };
