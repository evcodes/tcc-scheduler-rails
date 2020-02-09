import React from "react";

const Dashboard = props => {
  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Status: {props.isLoggedIn}</h1>
    </div>
  );
};

export default Dashboard;
