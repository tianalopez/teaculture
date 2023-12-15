import { useState, useEffect,forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useUI } from "./UIContext";

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const AlertBar = () => {
  const { alert, handleNewAlert, alertType, handleAlertType } = useUI()
  const [open, setOpen] = useState(Boolean(alert));

  useEffect(() => {
    setOpen(Boolean(alert))
  },[alert])

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    handleNewAlert(null);
    handleAlertType("");
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alertType} sx={{ width: "100%" }}>
        {alert}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
