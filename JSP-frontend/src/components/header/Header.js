import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAsync } from "../../actions/index";
import { useAdminStyles } from "./Styles";

const AdminManu = (props) => {
  const classes = useAdminStyles();

  const menuId = "primary-search-account-menu";

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/app">
            <Typography variant="h6" className={classes.title}>
              Demo Project
            </Typography>
          </Link>
          <IconButton
            className={classes.logOut}
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={props.logoutAsync}
            color="inherit"
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutAsync: () => dispatch(logoutAsync()),
  };
};

export default connect(null, mapDispatchToProps)(AdminManu);
