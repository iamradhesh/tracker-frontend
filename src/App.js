import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Onboarding from './components/Onboarding/Onboarding';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import SuccessPage from './components/SuccessPage/SuccessPage';
import TrackingPage from './components/TrackingPage/TrackingPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'))
  
    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }
  
    // If the token exists, verify it with the auth server to see if it is valid
    fetch('http://localhost:3080/verify', {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
      },
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn('success' === r.message)
        setEmail(user.email || '')
      })
  }, [])

  return (
    <Router>
      <div className="flex justify-center w-[386px] h-[800px] mb-6 mt-5 ml-[35%] box-sizing:border-box rounded-sm overflow-auto -z-50">
        <Switch>
          <Route exact path="/" component={Onboarding} />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                setLoggedIn={setLoggedIn}
                setEmail={setEmail}
              />
            )}
            
          />
          <Route path="/register" component={Register} />
          <Route path="/success" component={SuccessPage} />
          <Route path="/tracking-page" component={TrackingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
