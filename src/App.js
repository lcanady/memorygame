import { Route, HashRouter } from "react-router-dom";
import Game from "./pages/Game";
import MenuScreen from "./pages/MenuScreen";

function App() {
  return (
    <HashRouter basename="/">
      <Route path={`/`} exact component={MenuScreen} />
      <Route path={`/game`} exact component={Game} />
    </HashRouter>
  );
}

export default App;
