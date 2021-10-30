import { Route, BrowserRouter } from "react-router-dom";
import Game from "./pages/Game";
import MenuScreen from "./pages/MenuScreen";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={MenuScreen} />
      <Route path="/game" exact component={Game} />
    </BrowserRouter>
  );
}

export default App;
