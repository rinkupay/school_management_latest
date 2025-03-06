import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { updateStudentNotification } from '../../features/registerStudentSlice';
import { useDispatch, useSelector } from 'react-redux';

const SmsEmailToggle = () => {
  const { student } = useSelector((state) => state.studentDetails);
  const id = student?.student?._id;
  const data = student?.student;


  const dispatch = useDispatch();
  const [isEmail, setIsEmail] = useState(false);
  const [isSms, setIsSms] = useState(false);

  // Handle Email Toggle
  const handleEmail = () => {
    const updatedEmail = !isEmail;
    setIsEmail(updatedEmail);

    const formData = { isEmail: updatedEmail, isSms };
   

    dispatch(updateStudentNotification({ id, formData }));
  };

  // Handle SMS Toggle
  const handleSms = () => {
    const updatedSms = !isSms;
    setIsSms(updatedSms);

    const formData = { isEmail, isSms: updatedSms };


    dispatch(updateStudentNotification({ id, formData }));
  };

  // Fetch Email & SMS Preferences
  useEffect(() => {
    if (data) {
      setIsEmail(data.notificationInfo.isEmail || false);
      setIsSms(data.notificationInfo.isSms || false);
    }
  }, [data]);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <FormGroup row>
        <FormControlLabel
          control={<Switch checked={isEmail} onChange={handleEmail} />}
          label="EMAIL"
        />
        <FormControlLabel
          control={<Switch checked={isSms} onChange={handleSms} />}
          label="SMS"
        />
      </FormGroup>
    </div>
  );
};

export default SmsEmailToggle;
