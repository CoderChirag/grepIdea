import React, { useState } from "react";
import modalContext from "./modals/modalContext";
import {Switch, Route, Redirect} from "react-router-dom";
import HomePage from "./homePage/HomePage";
import GrepIdea from "./grepIdea/GrepIdea";
import NotFound from './NotFound';
import InternalServerError from './InternalServerError';
import "./style.css";
import "./homePage/homepage.css";
import "./modals/modal.css"
import "./grepIdea/grepIdea.css";
import "./mediaQueries.css"

const App = () => {
  const modalState = useState({modalLink: ""});
  return (
    <modalContext.Provider value={modalState}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/topics/:topicName" component={GrepIdea} />
        <Route path="/500" component={InternalServerError} />
        <Route path="/400" component={NotFound} />
        <Route path="*">
          <Redirect to="/400" />
        </Route>
      </Switch>
    </modalContext.Provider>
  );
};

export default App;
