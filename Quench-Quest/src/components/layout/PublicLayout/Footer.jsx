// Footer.js
import React from "react";
import { Layout, Row, Col, Typography, Space, Divider } from "antd";
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    YoutubeOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
} from "@ant-design/icons";

import logo from "../../../assets/logo.jpg";

const { Footer } = Layout;
const { Text, Title } = Typography;

const AppFooter = () => {
    const accentColor = "#2E7D6F";
    const textMuted = "#9CA3AF";

    const titleStyle = {
        color: "#ffffff",
        borderBottom: `2px solid ${accentColor}`,
        display: "inline-block",
        paddingBottom: 6,
        marginBottom: 20,
        fontWeight: 600,
    };

    return (
        <Footer
            style={{
                backgroundColor: "#0F1115",
                color: "#ffffff",
                padding: "80px 20px 40px",
            }}
        >
            <Row
                gutter={[32, 40]}
                justify="space-between"
                style={{ maxWidth: 1200, margin: "0 auto" }}
            >
                {/* ABOUT */}
                <Col xs={24} sm={12} md={6}>
                    <Space direction="vertical" size={16}>
                        {/* Logo */}
                        <img
                            src={logo}
                            alt="QuenchQuest"
                            style={{
                                height: 44,
                                background: "#ffffff",
                                padding: "6px 10px",
                                borderRadius: 6,
                            }}
                        />

                        <Text style={{ color: textMuted, lineHeight: 1.7 }}>
                            Dedicated to social welfare, health assistance, and empowerment
                            for underprivileged children, women, and economically weaker
                            communities.
                        </Text>
                    </Space>
                </Col>

                {/* QUICK LINKS */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={5} style={titleStyle}>
                        Quick Links
                    </Title><br></br>

                    <Space direction="vertical" size={10}>
                        {[
                            "Home",
                            "About",
                            "Programs",
                            "Projects & Impact",
                            "Get Involved",
                            "Contact",
                        ].map((item, index) => (
                            <Text
                                key={index}
                                style={{
                                    color: textMuted,
                                    cursor: "pointer",
                                    transition: "color 0.3s",
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = accentColor)
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = textMuted)
                                }
                            >
                                {item}
                            </Text>
                        ))}
                    </Space>
                </Col>

                {/* CONTACT */}
                <Col xs={24} sm={12} md={6}>
                    <Title level={5} style={titleStyle}>
                        Contact Us
                    </Title>

                    <Space direction="vertical" size={12}>
                        <Text style={{ color: textMuted }}>
                            <EnvironmentOutlined style={{ color: accentColor }} /> Vrindavan Society, Baif Rd, near Samindra Devi Market, Wagholi, Pune, Maharashtra 412207
                        </Text>
                        <Text style={{ color: textMuted }}>
                            <PhoneOutlined style={{ color: accentColor }} /> +91 9765083269
                        </Text>
                        <Text style={{ color: textMuted }}>
                            <MailOutlined style={{ color: accentColor }} /> thequenchquestteam@gmail.com
                        </Text>
                    </Space>
                </Col>

                {/* SOCIAL */}
                {/* Follow Us */}
                <Col
                    xs={{ span: 24, order: 4 }}
                    sm={{ span: 12, order: 0 }}
                    md={{ span: 6, order: 0 }}
                >
                    <Title level={5} style={titleStyle}>Follow Us</Title><br></br><br></br>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
                        <Space size="middle">
                            {[
                                { icon: <FacebookOutlined />, url: 'https://www.facebook.com/TheQQuest' },
                                { icon: <InstagramOutlined />, url: 'https://www.instagram.com/the.quenchquest' },
                                { icon: <LinkedinOutlined />, url: 'https://www.linkedin.com/company/the-quenchquest' },
                                { icon: <YoutubeOutlined />, url: 'https://www.youtube.com/@thequenchquest' },
                            ].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontSize: '28px',
                                        color: '#cbd5e1',
                                        transition: 'color 0.3s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                                    onMouseLeave={e => (e.currentTarget.style.color = '#cbd5e1')}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </Space>
                    </div>
                </Col>

            </Row>

            <Divider style={{ borderColor: "#1F2937", margin: "50px 0 30px" }} />

            {/* COPYRIGHT */}
            <Row justify="center">
                <Text style={{ color: "#6B7280", fontSize: 14 }}>
                    © {new Date().getFullYear()} Quench Quest Social Foundation. All rights
                    reserved.
                </Text>
            </Row>
        </Footer>
    );
};

export default AppFooter;
