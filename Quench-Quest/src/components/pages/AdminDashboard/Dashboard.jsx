import React from "react";
import { Row, Col, Card, Typography, Table, Tag } from "antd";
import {
  BookOutlined,
  ProjectOutlined,
  MailOutlined,
  TeamOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const Dashboard = () => {
  const stats = [
    { title: "Total Programs", value: 8, icon: <BookOutlined /> },
    { title: "Total Projects", value: 14, icon: <ProjectOutlined /> },
    { title: "Contact Requests", value: 36, icon: <MailOutlined /> },
    { title: "Active Volunteers", value: 52, icon: <TeamOutlined /> },
    { title: "Total Donations", value: "₹1,25,000", icon: <DollarOutlined /> },
  ];

  const recentContacts = [
    { key: "1", name: "Amit Patil", email: "amit@gmail.com", subject: "Volunteer Request", status: "New" },
    { key: "2", name: "Sneha Kulkarni", email: "sneha@gmail.com", subject: "Donation Query", status: "Read" },
    { key: "3", name: "Rahul Desai", email: "rahul@gmail.com", subject: "Training Support", status: "Resolved" },
  ];

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Subject", dataIndex: "subject" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color = "green";
        if (status === "New") color = "red";
        if (status === "Read") color = "orange";
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  return (
    <div>
      <Title level={3}>Dashboard </Title>

      {/* ================= STAT CARDS ================= */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {stats.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={4}>
            <Card
              bordered={false}
              hoverable
              bodyStyle={{
                height: 210,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
              style={{
                borderRadius: 16,
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
                transition: "all 0.3s ease",
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(46,125,111,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  color: "#2E7D6F",
                }}
              >
                {item.icon}
              </div>

              {/* TITLE */}
              <Text
                style={{
                  marginTop: 14,
                  fontSize: 14,
                  color: "#555",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>

              {/* COUNT */}
              <Title
                level={3}
                style={{
                  marginTop: 8,
                  marginBottom: 0,
                  color: "#001f3f",
                }}
              >
                {item.value}
              </Title>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ================= TABLE ================= */}
      <Row gutter={[16, 16]} style={{ marginTop: 40 }}>
        <Col xs={24}>
          <Card
            title="Recent Contact Requests"
            bordered={false}
            style={{
              borderRadius: 16,
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.08)",
            }}
          >
            <Table
              columns={columns}
              dataSource={recentContacts}
              pagination={false}
              scroll={{ x: "max-content" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
