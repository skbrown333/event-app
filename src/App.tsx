import React, {
  useEffect,
  useContext,
  useState,
  FunctionComponent,
} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

/* Components */
import { Header } from "./components/Header/Header";
import { Map } from "./components/Map/Map";
import { Signup } from "./components/Signup/Signup";

/* Store */
import { Firebase, FirebaseContext } from "./firebase";
import { Context } from "./store/Store";
import { updateUser } from "./store/actions";

/* Styles */
import "./App.scss";
import { CreateEvent } from "./components/CreateEvent/CreateEvent";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

const firebaseInstance = new Firebase();

export const App: FunctionComponent = () => {
  const dispatch = useContext(Context)[1];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const user = await firebaseInstance.getCurrentUser();
        dispatch(updateUser(user));
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  return (
    <FirebaseContext.Provider value={firebaseInstance}>
      {!isLoading && (
        <div id="ea-app">
          <Router>
            <Route path="/">
              <Header />
            </Route>
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <ProtectedRoute
                path="/event/create"
                component={CreateEvent}
              ></ProtectedRoute>
              <Route path="/">
                <Map />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </FirebaseContext.Provider>
  );
};

export const Logout: FunctionComponent = () => {
  const dispatch = useContext(Context)[1];
  useEffect(() => {
    async function init() {
      await firebaseInstance.signOut();
      dispatch(updateUser(null));
    }
    init();
  }, []);

  return <Redirect to="/" />;
};
