import React, { useState, useEffect } from 'react';
import { logout } from '../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

function ClockPoint(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push('/signin');
  }
  const submitHandler = (e) => {
    e.preventDefault();
  }
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
    }
    else
      props.history.push('/signin');
    return () => {

    };
  }, [userInfo])

  return <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>Working Hours</h2>
            </li>
            <li>
              <label htmlFor="name">
                Name: {name}
              </label>
            </li>
            <li>
              <label htmlFor="email">
                E-mail: {email}
              </label>
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
  </div>

}

export default ClockPoint; 