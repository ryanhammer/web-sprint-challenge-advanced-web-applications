import React, { useEffect } from "react";
import { axiosWithAuth } from '../helpers/axiosWithAuth';
import { TextField, makeStyles, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  formItem: {
    marginBottom: '1.5rem'
  }
});

const Login = () => {

  const history = useHistory();
  const classes = useStyles();

  const initialLoginValues = {
    username: "",
    password: ""
  };

  const [credentials, setCredentials] = useState(initialLoginValues);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
 
  const login = e => {
    e.preventDefault();
    // Make a POST request with the username and password as the data body to retrieve a token from the api
    axiosWithAuth()
      .post('/api/login', credentials)
      .then( (res) => {
        // If the post request is store the token in localStorage (sessions, cookies)...add window in front to accommodate some older browsers
        window.localStorage.setItem('token', JSON.stringify(res.data.payload));
        // navigate to the BubblePage route
        history.push('/bubblepage');
      })
      .catch( (err) => {
        console.log(err);
        setError(err);
      })
  };

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });
  
  const [error, setError] = useState("");

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={login} >
          <Grid 
            container='true'
            alignContent="space-evenly"
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item className={classes.formItem}>
              <TextField
                data-testid="username"
                name="username"
                label="Username"
                type="text"
                value={credentials.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item className={classes.formItem}>
              <TextField
                data-testid="password"
                name="password"
                label="Password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </Grid>
            <Button 
              className={classes.formItem}
              variant='contained'
              color='primary'
              type='submit'
              >
              Login
            </Button>
          </Grid>
        </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.