import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ConfirmDialog = ({ open, onClose, onConfirm, message , actionMessage }) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{actionMessage}</DialogTitle>
        <DialogContent>
          <p>{message}</p>
        </DialogContent>
        <DialogActions>
          <Button  sx={{color:"black",":hover":{color:"white",backgroundColor:"blue"}}} onClick={onClose}>Cancel</Button>
          <Button sx={{color:"black",":hover":{color:"white",backgroundColor:"blue"}}} onClick={onConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
