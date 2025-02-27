import Base from "./Base/Base";
import Navigate from "./Format/Navigation/Navigation";
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
