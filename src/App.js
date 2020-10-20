import React, {Suspense, lazy, Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';
import './App.css';
const SigninScreen = lazy(() => import('./Screens/SigninScreen'));
const ClockPoint = lazy(() => import('./Screens/ClockPoint'));

function LoadMessage(props) {
  return (
    <div className="loader-container">
      <div className="loader-container-inner">
          <h6 className="mt-5">
            Loading {props.name} Screen
            <small>You are almost there...</small>
          </h6>
      </div>
    </div>
  )
}

function App() {
  return (
    <Fragment>
      {/* Home Screen */}
      <Suspense fallback={
        <LoadMessage name={"Home"}></LoadMessage>
      }>
        <Route path="/clockpoint" component={ClockPoint} />
      </Suspense>

      {/* Signin Screen */}
      <Suspense fallback={
        <LoadMessage name={"Signin"}></LoadMessage>
      }>
          <Route path="/signin" component={SigninScreen} />
      </Suspense>

      <Route exact path="/" render={() => (
        <Redirect to="/clockpoint"/>
        )}/>
    </Fragment>
  );
}

export default App;
