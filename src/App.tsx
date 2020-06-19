import React from "react";
import { Store } from "./store/Store";
import { Firebase, FirebaseContext } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Components */
import { Map } from "./components/Map/Map";
import { Signup } from "./components/Signup/Signup";

/* Styles */
import "./App.scss";

const firebaseInstance = new Firebase();

function App() {
  return (
    <FirebaseContext.Provider value={firebaseInstance}>
      <Store>
        <Router>
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Map />
            </Route>
          </Switch>
        </Router>
      </Store>
    </FirebaseContext.Provider>
  );
}

export default App;
