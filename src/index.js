import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppContainer from '@/containers/AppContainer';
import SignInContainer from '@/containers/SignIn';
import reportWebVitals from '@/reportWebVitals';
import store from '@/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/sign-in" component={SignInContainer} />
        <Route path="/" component={AppContainer} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
