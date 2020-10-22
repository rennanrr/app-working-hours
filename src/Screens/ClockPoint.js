import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { logout } from '../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { listClockPoints, saveClockPoint } from '../Actions/clockPointActions';

function ClockPoint(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dailyMinutes, setDailyMinutes] = useState('');
  const [monthlyMinutes, setMonthlyMinutes] = useState('');
  const [date, setDate] = useState('');
  const [arrive, setArrive] = useState('');
  const [exit, setExit] = useState('');
  const [lunch_exit, setLunch_exit] = useState('');
  const [lunch_arrive, setLunch_arrive] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const clockList = useSelector(state => state.clockList);
  const { clockPoints, error: errorList, loading: loadingList } = clockList;

  const clockSave = useSelector(state => state.clockSave);
  const { error: errorSave, loading: loadingSave, success: successSave } = clockSave;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push('/signin');
  };
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(saveClockPoint(
      {
        arrive: moment(date).add(arrive).format(), 
        exit: moment(date).add(exit).format(),
        lunch_exit: moment(date).add(lunch_exit).format(),
        lunch_arrive: moment(date).add(lunch_arrive).format(),
      }
    ))
  };
  const toHours = (minutes) => {
    const hours = parseInt(minutes / 60);
    const min = minutes % 60;
    return (hours + 'h') + (min ? min + 'min' : '');
  };
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setDailyMinutes(userInfo.dailyMinutes);
      setMonthlyMinutes(userInfo.monthlyMinutes);
      dispatch(listClockPoints(userInfo.id));
      setDate(''); setArrive(''); setExit(''); setLunch_exit(''); setLunch_arrive('')
    }
    else
      props.history.push('/signin');
    return () => {

    };
  }, [successSave]);
  return (
    <div className="container">
        <div className="text-center">
          <h1>Clock Point</h1>
          <p>Please, fill data bellow</p>
        </div>
        <div className="row">
          <div className="col-md-6 order-md-1">
            <form onSubmit={handleSave}>
              <div className="row">
                <div className="form-group mx-3">
                  <label>Date</label>
                  <input required type="date" className="form-control" value={date} onChange={e => setDate(e.target.value)} placeholder="Date"></input>
                </div>
                <div className="form-group mx-3">
                  <label>Arrive</label>
                  <input required type="time" className="form-control" name="arrived" id="arrivedInput" value={arrive} onChange={(e) => setArrive(e.target.value)}></input>
                </div>
                <div className="form-group mx-3">
                  <label>Exit</label>
                  <input required type="time" className="form-control" name="exit" id="exitInput" value={exit} onChange={(e) => setExit(e.target.value)}></input>
                </div>
              </div>
              <div className="row">
                <div className="form-group mx-3">
                  <label>Lunch Start</label>
                  <input required type="time" className="form-control" name="arrived" id="arrivedInput" value={lunch_exit} onChange={(e) => setLunch_exit(e.target.value)}></input>
                </div>
                <div className="form-group mx-3">
                  <label>Lunch End</label>
                  <input required type="time" className="form-control" name="exit" id="exitInput" value={lunch_arrive} onChange={(e) => setLunch_arrive(e.target.value)}></input>
                </div>
              </div>
              <div className="row mt-2 justify-content-center">
                <div className="col-2 float-right">
                  <button type="submit" className="btn btn-info btn-lg">Save</button>
                </div>
                <div className="col text-center">
                  <label>
                    { loadingSave && 'Loading...' }
                  </label>
                  <label className="text-danger">
                    { errorSave && errorSave }
                  </label>
                </div>
              </div>
              <hr className="mb-4"></hr>
            </form>
          </div>
          <div className="col-2 order-md-2"></div>
            <div className="col-md-4 order-md-2 mb-4" >
              <h4 className="d-flex justify-content-end">
                  <span className="badge badge-dark badge-pill">Employee Data</span>
              </h4>
              <ul className="list-group mb-3">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">{ name } </h6>
                    <p className="text-muted">{ email } </p>
                    <p className="text-muted mb-1">Mensal hours: { toHours(monthlyMinutes) } </p>
                    <p className="text-muted mb-1">Daily hours: { toHours(dailyMinutes) } </p>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div className="col">
                  <button className="btn btn-danger btn-block" onClick={handleLogout}>Logout</button>
                  </div>
                </li>
              </ul>
            </div>
        </div>
      <div className="container-table">
        <div className="wrap-table">
          <div className="table  m-b-110">
            <div className="table-head">
              <table>
                <thead>
                  <tr className="row head">
                    <th className="cell column1">Day</th>
                    <th className="cell column2">Arrive</th>
                    <th className="cell column3">Lunch time</th>
                    <th className="cell column4">Exit</th>
                    <th className="cell column5">Amount</th>
                    <th className="cell column6">Extra</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="table-body js-pscroll">
              <div className="col text-center" hidden={!loadingList && !errorList}>
                <label>
                  { loadingList && 'Loading...' }
                </label>
                <label className="text-danger">
                  { errorList && errorList }
                </label>
              </div>
              <table>
                <tbody>
                {clockPoints.map((day) => {
                  const totalMinutes = moment.duration(moment(day.exit).diff(moment(day.arrive))).asMinutes() - moment.duration(moment(day.lunch_exit).diff(moment(day.lunch_arrive))).asMinutes();
                  const expectedHours = toHours(totalMinutes - userInfo.dailyMinutes);
                  const classExpectedHours = totalMinutes - userInfo.dailyMinutes >= 0 ? 'text-success' : 'text-danger';
                  return (
                    <tr key={day.id} className="row body">
                      <td className="cell column1">{ moment(day.arrive).format('MM/DD/YYYY') }</td>
                      <td className="cell column2">{ moment(day.arrive).format('h:mm a') }</td>
                      <td className="cell column3">{ moment(day.lunch_exit).format('h:mm a') } - { moment(day.lunch_arrive).format('h:mm a') }</td>
                      <td className="cell column4">{ moment(day.exit).format('h:mm a') }</td>
                      <td className={ 'cell column5 ' + classExpectedHours }>{ toHours(totalMinutes) }</td>
                      <td className={ 'cell column6 ' + classExpectedHours }>{ expectedHours }</td>
                    </tr>
                      )
                  })
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClockPoint; 