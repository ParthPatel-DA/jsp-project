import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

export const useAdminStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    marginLeft: 5,
    color: "#fff",
  },
  logOut: {
    marginLeft: "auto",
  },
}));
