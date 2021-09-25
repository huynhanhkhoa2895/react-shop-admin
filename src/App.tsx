import React,{useEffect, useState} from 'react';
import './assets/common.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Loading from './common/Loading';
import { useSelector } from 'react-redux';
import { selectorUser } from './redux/selector';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from 'common/Layout';
const Login = React.lazy(() => import("module/Verify/Login"))
function App() {
  const [user,setUser] = useState<any>(JSON.parse((localStorage.getItem("user") as any)))
  const _user = useSelector(selectorUser())
  useEffect(() => {
    if(localStorage.getItem("user") == null) setUser(null)
    else if(_user != null) setUser(_user)        
  },[_user])
  return (
    <>
      <Router>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/login" render={props => user == null ? <Login {...props} /> : <Redirect to={{ pathname: "/" }} />} />
            {/* <Route exact path="/" render={props => user == null ? <Redirect to={{ pathname: "/login" }} /> : <Layout {...props} />} /> */}
            <Route path="/" render={props => user == null ? <Redirect to={{ pathname: "/login" }} /> : <Layout {...props} />} />

          </Switch>
        </React.Suspense>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
