import { Layout, Menu, Button, Drawer, Grid } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.jpg";

const { Header } = Layout;
const { useBreakpoint } = Grid;

const menuItems = [
  { key: "home", label: <Link to="/">Home</Link> },
  { key: "about", label: <Link to="/about">About</Link> },
  { key: "programs", label: <Link to="/programs">Programs</Link> },
  { key: "projects", label: <Link to="/projects">Projects & Impact</Link> },
  { key: "involved", label: <Link to="/get-involved">Get Involved</Link> },
  { key: "contact", label: <Link to="/contact">Contact</Link> },
];

const routeToKeyMap = {
  "/": "home",
  "/about": "about",
  "/programs": "programs",
  "/projects": "projects",
  "/get-involved": "involved",
  "/contact": "contact",
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const [open, setOpen] = useState(false);

  const selectedKey = routeToKeyMap[location.pathname] || "home";

  return (
    <>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          padding: 0,
          height: 70,
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: "100%",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img src={logo} alt="NGO Logo" style={{ height: 42 }} />
          </Link>

          {/* Desktop Menu */}
          {!isMobile && (
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              items={menuItems}
              style={{
                flex: 1,
                justifyContent: "center",
                borderBottom: "none",
                height: "100%",
                lineHeight: "70px",
              }}
            />
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <Button type="primary" onClick={() => navigate("/get-involved")}>
              Volunteer With Us
            </Button>
          )}

          {/* Mobile Hamburger */}
          {isMobile && (
            <Button
              type="text"
              icon={
                open ? (
                  <CloseOutlined style={{ fontSize: 22 }} />
                ) : (
                  <MenuOutlined style={{ fontSize: 22 }} />
                )
              }
              onClick={() => setOpen(!open)}
              style={{ marginLeft: "auto" }}
            />
          )}
        </div>
      </Header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          selectedKeys={[selectedKey]}
          onClick={() => setOpen(false)}
        />
       <Button
  type="primary"
  block
  style={{ marginTop: 20 }}
  onClick={() => {
    setOpen(false);              // close drawer
    navigate("/get-involved");   // navigate
  }}
>
  Volunteer With Us
</Button>

      </Drawer>
    </>
  );
};

export default Navbar;
