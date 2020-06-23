import React from "react";
import { Store } from "./store/Store";
import { Firebase, FirebaseContext } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Components */
import { Header } from "./components/Header/Header";
import { Map } from "./components/Map/Map";
import { Signup } from "./components/Signup/Signup";

/* Styles */
import "./App.scss";
import { CreateEvent } from "./components/CreateEvent/CreateEvent";

const firebaseInstance = new Firebase();

function App() {
  return (
    <FirebaseContext.Provider value={firebaseInstance}>
      <Store>
        <div id="ea-app">
          <Router>
            <Route path="/">
              <Header />
            </Route>
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/event/create">
                <CreateEvent />
              </Route>
              <Route path="/">
                <Map />
              </Route>
            </Switch>
          </Router>
        </div>
      </Store>
    </FirebaseContext.Provider>
  );
}

export default App;
