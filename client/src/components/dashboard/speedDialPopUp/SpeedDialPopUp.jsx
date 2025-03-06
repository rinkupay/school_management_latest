import React from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { styled } from '@mui/system';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin, logout } from '../../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const CustomSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'fixed',
  top: 4,
  right: 15,
  '& .MuiSpeedDial-fab': {
    backgroundColor: '#3f51b5',
    color: '#fff',
    width: 35,
    height: 35,
    minHeight: 'unset',
    fontSize: '16px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  [theme.breakpoints.down('sm')]: {
    top: 8,
    right: 8,
    '& .MuiSpeedDial-fab': {
      width: 32,
      height: 32,
      fontSize: '14px',
    },
  },
}));

const CustomSpeedDialAction = styled(SpeedDialAction)(({ theme }) => ({
  '& .MuiSpeedDialAction-fab': {
    backgroundColor: '#f50057',
    color: '#fff',
    width: 36,
    height: 36,
    minHeight: 'unset',
    '& .MuiSvgIcon-root': {
      fontSize: 18,
    },
    '&:hover': {
      backgroundColor: '#c51162',
    },
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiSpeedDialAction-fab': {
      width: 28,
      height: 28,
      '& .MuiSvgIcon-root': {
        fontSize: 14,
      },
    },
  },
}));

export default function SpeedDialPopUp() {
  const { adminDetails } = useSelector((state) => state.user);
  const data = adminDetails?.user;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAdmin());
    dispatch(logout());
  };

  const actions = [
    { icon: <AccountCircleIcon />, name: 'Profile', onClick: () => navigate(`/profile/${data?._id}`) },
    { icon: <DashboardCustomizeIcon />, name: 'Dashboard', onClick: () => navigate('/dashboard') },
    { icon: <LogoutIcon />, name: 'Logout', onClick: handleLogout },
  ];

  return (
    <CustomSpeedDial
      ariaLabel="SpeedDial login/logout example"
      icon={data?.userName?.charAt(0).toUpperCase()}
      direction="down"
    >
      {actions.map((action) => (
        <CustomSpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </CustomSpeedDial>
  );
}
