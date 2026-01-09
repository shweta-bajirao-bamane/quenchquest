import React, { useState } from "react";
import {
  Layout,
  Menu,
  Drawer,
  Button,
  Grid,
  Breadcrumb,
  Avatar,
  Typography,
} from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  MenuOutlined,
  LogoutOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;
const { Text } = Typography;

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const username = localStorage.getItem("username") || "Admin";

  /* ===================== BREADCRUMB ===================== */
  const breadcrumbNameMap = {
    "/admin/dashboard": "Dashboard",
    "/admin/homesectionlist": "Home Page Sections",
    "/admin/aboutsectionlist": "About Page Sections",
    "/admin/programsectionlist": "Program Page Sections",
    "/admin/projectsectionlist": "Project & Impact List",
  };



  // Build breadcrumb items
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: breadcrumbNameMap[url] || url,
    };
  });
  const breadcrumbItems = [
    { key: "/admin/dashboard", title: ".." },
    ...extraBreadcrumbItems.slice(1),
  ];


  /* ===================== MENU ITEMS ===================== */
  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "content",
      icon: <FileTextOutlined />,
      label: "Content Management",
      children: [
        {
          key: "/admin/homesectionlist",
          label: "Home Page Section List",
          onClick: () => navigate("/admin/homesectionlist"),
        },
        {
          key: "/admin/aboutsectionlist",
          label: "About Page Section List",
          onClick: () => navigate("/admin/aboutsectionlist"),
        },
        {
          key: "/admin/programssectionlist",
          label: "Programs List",
          onClick: () => navigate("/admin/programsectionlist"),
        },
        {
          key: "/admin/projectsectionlist",
          label: "Project & Impact List",
          onClick: () => navigate("/admin/projectsectionlist"),
        },
      ],
    }

  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("username");
    navigate("/admin", { replace: true });
  };

  const MenuContent = (
    <Menu
      mode="inline"
      theme="dark"
      items={menuItems}
      selectedKeys={[location.pathname]}
      defaultOpenKeys={["content"]}
      style={{
        backgroundColor: "transparent",
        border: "none",
        flex: 1,
      }}
    />
  );

  const LogoutButton = (
    <div style={{ padding: 16 }}>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{
          width: "100%",
          background: "#2E7D6F",
          borderColor: "#2E7D6F",
        }}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* ===================== SIDEBAR (DESKTOP) ===================== */}
      {!screens.xs && (
        <Sider
          width={220}
          style={{
            backgroundColor: "#001f3f",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2
            style={{
              color: "#fff",
              textAlign: "center",
              padding: "16px",
              margin: 0,
            }}
          >
            Admin Panel
          </h2>

          <div style={{ flex: 1, padding: "0 12px" }}>{MenuContent}</div>

          {LogoutButton}
        </Sider>
      )}

      {/* ===================== SIDEBAR (MOBILE) ===================== */}
      {screens.xs && (
        <Drawer
          title="Admin Panel"
          placement="left"
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          bodyStyle={{
            padding: 0,
            backgroundColor: "#001f3f",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
          headerStyle={{ backgroundColor: "#b4dbc9ff", color: "#fff" }}
        >
          <div style={{ flex: 1 }}>{MenuContent}</div>
          {LogoutButton}
        </Drawer>
      )}

      {/* ===================== MAIN LAYOUT ===================== */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Breadcrumb items={breadcrumbItems} />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Text strong>{username}</Text>
            <Avatar icon={<UserOutlined />} />
            {screens.xs && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
              />
            )}
          </div>
        </Header>

        <Content
          style={{
            margin: 16,
            padding: 16,
            background: "#f0f2f5",
            minHeight: "calc(100vh - 64px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
