import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import ArtFeed from "./pages/ArtFeed";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/art" component={ArtFeed} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
