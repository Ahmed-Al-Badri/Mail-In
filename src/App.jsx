import Base from "./Base/Base";
import Navigate from "./Format/Navigation/Navigation";
import Setting from "./Settings/Settings";
import Access from "./Access";
import "./Style/Style.css";
import "./FontFamily/style.css";
import Balls from "./Balls/Balls";
Navigate.move_to(window.location.pathname);
let cur = "";
function App() {
  return (
    <>
      <Balls />
      <Access />
    </>
  );
}

export default App;
