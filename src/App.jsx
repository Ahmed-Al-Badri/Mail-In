import Base from "./Base/Base";
import Navigate from "./Format/Navigation/Navigation";
import "./Style/Style.css";
Navigate.move_to(window.location.pathname);
let cur = "";
function App() {
  return (
    <>
      <Base />
    </>
  );
}

export default App;
