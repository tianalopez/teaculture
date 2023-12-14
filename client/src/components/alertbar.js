import { useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const AlertBar = ({ alert, handleNewAlert, alertType, handleAlertType }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    handleNewAlert(null);
    handleAlertType("");
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertType} sx={{ width: "100%" }}>
        {alert}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
