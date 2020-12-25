import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { loginAsync } from "../../actions/index";
import queryString from "query-string";
import { useStyles } from "./styles";

const Login = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const params = queryString.parse(props.location.search);
  const lastPath = params.r;

  useEffect(() => {
    let data = localStorage.getItem("remember");
    if (data) {
      data = JSON.parse(data);
      setEmail(data.email);
      setPassword(data.password);
    }
    if (props.userAuth) {
      props.history.push("/app");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeRemember = (event) => {
    setRemember(event.target.checked);
  };

  return (
    <div className={classes.rootContainer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              type="email"
              label={
                email !== "" ? "Email Address" : "Empty Email is not Allow"
              }
              autoComplete="email"
              autoFocus
              onChange={(event) => setEmail(event.target.value)}
              value={email !== null ? email : ""}
              error={email === ""}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              label={
                password !== "" ? "Password" : "Empty Password is not Allow"
              }
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              value={password !== null ? password : ""}
              error={password === ""}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={remember}
                  onChange={handleChangeRemember}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                if (email && password) {
                  setLoading(true);
                  props.loginAsync({
                    email,
                    password,
                    remember,
                    lastPath,
                    setLoading,
                  });
                } else {
                  if (!email) {
                    setEmail("");
                  }
                  if (!password) {
                    setPassword("");
                  }
                }
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userAuth: state.auth.userAuth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAsync: ({ email, password, remember, lastPath, setLoading }) =>
      dispatch(loginAsync({ email, password, remember, lastPath, setLoading })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
