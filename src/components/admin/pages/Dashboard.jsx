import Context from "@/components/context/AuthContext";
import { useContext } from "react";

const Dashboard = () => {

  const {greeting} =  useContext(Context)

  return <div>this is dashboard page of shree <span>{greeting}</span></div>;
};

export default Dashboard;
