import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../Actions/userActions';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  }
  return (
  <div className="container">
    <div className="row py-5 mt-4">
        <div className="col-md-6 pr-lg-5 mb-5 mb-md-0">
            <h1>This is a test to</h1>
            <h2> <a href="https://www.oowlish.com/" className="text-dark"><img className="" src="/header-logo-light.png" alt="logo" width="70"></img>wlish</a></h2>
            <p className="font-italic text-muted mt-3">The task is to build a web app to control the working hours for a company's employees. The app will be used by each employee to manage and keep account of:</p>
            <p className="font-italic text-muted ">Worked hours, Arriving and Exiting hours, and Lunch breaks.</p>
            <h4 className="mt-3">Tech Stack</h4>
            <ul className="font-italic text-muted">
              <li>NodeJS</li>
              <li>ReactJS</li> 
              <li>Redux</li>
              <li>Bootstrap</li>
              <li>Rest API Connection with Axios</li>
              <li>Authentication with JSON Web Token</li>
            </ul>
            <h4 className="mt-3">GitHub Repositories</h4>
            <p className="font-italic text-muted">The resolution consists in two repositiories, one for FrontEnd and another for BackEnd and Database</p>
            <ul className="font-italic text-muted">
              <li><a href="https://github.com/rennanrr/app-working-hours" className="text-info">ReactJS Web Application</a></li>
              <li><a href="https://github.com/rennanrr/api-working-hours" className="text-info">NodeJS Rest API with Express, Sequelize and PostgreSQL DB</a></li>
            </ul>
        </div>
        <div className="col-md-6 pr-lg-5 mb-5 mb-md-0">
            <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="col mb-4">
                    <h3>Signin to access Clock Point</h3>
                    </div>
                    <div className="input-group col-lg-12 mb-4">
                        <input required id="email" type="email" name="email" placeholder="Email Address" className="form-control bg-white border-md" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="input-group col-lg-12 mb-4">
                        <input required id="password" type="password" name="password" placeholder="Password" className="form-control bg-white border-md" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="form-group col-lg-12 mx-auto">
                      <button type="submit" className="btn btn-primary btn-block py-2">Signin</button>
                    </div>
                    <div className="col text-danger text-center">
                      <label>
                        { loading && 'Loading' }
                        { error && error }
                      </label>
                    </div>
                </div>
                    <hr className="mb-4"></hr>
                    <div className="form-group col-lg-12 mx-auto">
                      <p className="font-italic text-muted">Developed By&nbsp;
                        <a href="https://github.com/rennanrr/" className="text-muted"><u>Rennan Ribas</u></a>,
                        Computer Engineer and Senior Developer
                      </p>
                    </div>
            </form>
        </div>
    </div>
</div>
  );
}
export default SigninScreen;