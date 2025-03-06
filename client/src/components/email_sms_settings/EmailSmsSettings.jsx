import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmailSmsSettings, updateEmailSmsSettings } from "../../features/smsEmailSettingsSlice";
import { Switch, FormControlLabel, Card, CardContent, Typography, Button } from "@mui/material";
import Loader from "../loader/Loader";

const EmailSmsSettings = () => {
  const dispatch = useDispatch();
  const { emailNotifications, smsNotifications, loading } = useSelector((state) => state.emailSmsSetting);
  const [isEmail,setIsEmail] = useState(false);
  const [isSms,setIsSms] = useState(false);

  useEffect(() => {
    dispatch(fetchEmailSmsSettings());
  }, [dispatch]);


  const handleEmail = () => {
    const data = {
      emailNotifications: !isEmail, // Send updated value
      smsNotifications: isSms // Keep the current SMS state
    };
    setIsEmail(!isEmail);
    dispatch(updateEmailSmsSettings(data));
  };
  
  const handleSms = () => {
    const data = {
      emailNotifications: isEmail, // Keep the current Email state
      smsNotifications: !isSms // Send updated value
    };
    setIsSms(!isSms);
    dispatch(updateEmailSmsSettings(data));
  };
  



// SET INCOMMING VALUE FORM REDUX
useEffect(() => {
  if (emailNotifications !== undefined) {
      setIsEmail(emailNotifications);
  }
  if (smsNotifications !== undefined) {
      setIsSms(smsNotifications);
  }
}, [emailNotifications, smsNotifications]);


  return (
    <div className="dashboard-wrapper">
      {loading && <Loader />}
      <div className="dashboard-right">
        <h2 className="dashboard-heading">NOTIFICATIONS</h2>

        <Fragment>
          <Card sx={{ maxWidth: 400, margin: "20px auto", padding: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Global Notification Settings
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={isEmail}
                    onChange={handleEmail}
                    disabled={loading} // Disable when loading
                  />
                }
                label="Enable Email Notifications"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={isSms}
                    onChange={handleSms}
                    disabled={loading} // Disable when loading
                  />
                }
                label="Enable SMS Notifications"
              />
           
            </CardContent>
          </Card>
        </Fragment>
      </div>
    </div>
  );
};

export default EmailSmsSettings;
