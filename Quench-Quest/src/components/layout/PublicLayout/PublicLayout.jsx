import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AppFooter from "./Footer";


const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default PublicLayout;
