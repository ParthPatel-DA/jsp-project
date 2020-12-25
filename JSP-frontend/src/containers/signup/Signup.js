import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { signupAsync } from "../../actions/index";
import { useStyles } from "./styles";

const Signup = (props) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (props.userAuth) {
      props.history.push("/app");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.rootContainer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              type="name"
              label={name !== "" ? "Name" : "Empty name is not Allow"}
              autoComplete="name"
              autoFocus
              onChange={(event) => setName(event.target.value)}
              value={name !== null ? name : ""}
              error={name === ""}
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                if (name && email && password) {
                  setLoading(true);
                  props.signupAsync({
                    name,
                    email,
                    password,
                    setLoading,
                  });
                } else {
                  if (!name) {
                    setName("");
                  }
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
                "Sign Up"
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
    signupAsync: ({ name, email, password, remember, setLoading }) =>
      dispatch(signupAsync({ name, email, password, remember, setLoading })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
