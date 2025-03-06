import React from "react";
import "./Dashboard.css";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const Dashboard = () => {
 

  let totalAmount = 50011;
  let totalExpenses = 4542

  const remainingBalance = totalAmount - totalExpenses;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-right">
        <h2 className="dashboard-heading">DASHBOARD</h2>
        <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card sx={{ bgcolor: "#4caf50", color: "white", p: 2 }}>
          <CardContent>
            <Typography variant="h6">Total Amount</Typography>
            <Typography variant="h4">₹{totalAmount.toLocaleString()}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card sx={{ bgcolor: "#f44336", color: "white", p: 2 }}>
          <CardContent>
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h4">₹{totalExpenses.toLocaleString()}</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card sx={{ bgcolor: "#2196f3", color: "white", p: 2 }}>
          <CardContent>
            <Typography variant="h6">Remaining Balance</Typography>
            <Typography variant="h4">₹{remainingBalance.toLocaleString()}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  
      </div>
    </div>
  );
};

export default Dashboard;
