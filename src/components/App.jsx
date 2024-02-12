import { Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AuthProvider>
  );
}

export default App;
