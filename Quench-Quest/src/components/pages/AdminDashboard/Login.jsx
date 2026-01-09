// src/Pages/Login.jsx
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  Card,
  message,
  Row,
  Col,
  theme,
} from "antd";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

/* ---------------- LEFT SIDE BRAND / TAGLINE ---------------- */

const AnimatedTypingWithSlogan = () => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        padding: 20,
        textAlign: "center",
        fontFamily: token.fontFamily,
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
          fontWeight: 900,
          color: token.colorPrimary,
          whiteSpace: "nowrap",
          overflow: "hidden",
          borderRight: `0.15em solid ${token.colorPrimary}`,
          width: "100%",
          maxWidth: "22ch",
          animation: "typing 3s steps(22), blink 0.75s step-end infinite",
          margin: 0,
        }}
      >
        Quench Quest Foundation
      </h1>

      <motion.p
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 1.2 }}
        style={{
          fontSize: "clamp(0.9rem, 3vw, 1rem)",
          fontWeight: 600,
          fontStyle: "italic",
          color: token.colorTextSecondary,
          margin: 0,
        }}
      >
        Empowering Lives. Building Stronger Communities.
      </motion.p>

      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 22ch }
        }
        @keyframes blink {
          50% { border-color: transparent }
        }
      `}</style>
    </div>
  );
};

/* ---------------- LOGIN PAGE ---------------- */

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Login Values:", values);
      message.success("Login submitted successfully!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: token.colorBgLayout,
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: token.fontFamily,
      }}
    >
      <Row
        gutter={[24, 40]}
        style={{ width: "100%", maxWidth: 1200 }}
        align="middle"
        justify="center"
      >
        {/* LEFT SECTION */}
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AnimatedTypingWithSlogan />
        </Col>

        {/* RIGHT LOGIN CARD */}
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ width: "100%" }}
          >
            <Card
              bordered={false}
              style={{
                borderRadius: token.borderRadius,
                boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
                width: "100%",
                maxWidth: 400,
                margin: "0 auto",
              }}
            >
              <Title
                level={2}
                style={{
                  textAlign: "center",
                  color: token.colorPrimary,
                  marginBottom: 24,
                }}
              >
                Admin Login
              </Title>

              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Enter a valid email address" },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                {/* Forgot Password */}
                <Form.Item style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      float: "right",
                      cursor: "pointer",
                      color: token.colorPrimary,
                      fontWeight: 500,
                    }}
                    onClick={() =>
                      message.info("Forgot password flow goes here")
                    }
                  >
                    Forgot password?
                  </Text>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
