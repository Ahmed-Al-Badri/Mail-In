import { BaseShow } from "../Format/Format";
import { InnerShow } from "../Format/Format";
import Teps from "./Teps/Teps";
import "./Style/body.css";
import Navigate from "../Format/Navigation/Navigation";
import Mail from "./Mail/Mail";
class Head extends InnerShow {
  constructor(probs) {
    super(probs);
  }

  do_render() {
    let hold = <>The head</>;

    return [hold, "Head", {}];
  }
}
const Bars = ["Mail", "Inbox", "Spam", "Deleted"];

class Side extends BaseShow {
  constructor(probs) {
    super(probs);
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
              <div className="Small">
                <div className="BarName BottomLine">{type}</div>
              </div>
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
      </>
    );

    return [hold, "Body", {}];
  }
}

class Base extends BaseShow {
  constructor(probs) {
    super(probs);
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
