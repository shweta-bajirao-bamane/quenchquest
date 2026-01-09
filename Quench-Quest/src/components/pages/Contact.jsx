import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Divider,
  ConfigProvider,
  Collapse,
  message,
} from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  HeartFilled,
  TeamOutlined,
  SafetyOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import antdTheme from "../../theme/antdTheme";
import { sendContactMessage, resetContactState } from "../../slices/contactSlice";
import { fetchContactHeader } from "../../slices/contactHeaderSlice";
import { fetchContactCards } from "../../slices/contactCardSlice";
import { fetchContactDetail } from "../../slices/contactDetailSlice";
import { fetchFAQs } from "../../slices/contactFAQSlice";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const { colorPrimary, colorTextSecondary } = antdTheme.token;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // icon mapper (based on backend value) - FIXED
const iconMap = {
  volunteer: <TeamOutlined style={{ fontSize: 36, color: colorPrimary }} />,
  support: <HeartFilled style={{ fontSize: 36, color: colorPrimary }} />,
  assistance: <SafetyOutlined style={{ fontSize: 36, color: colorPrimary }} />,
};

  
  // Get contact state
  const { loading, success, error } = useSelector((state) => state.contact);
  
  // Get contact header state
  const contactHeaderState = useSelector((state) => state.contactHeader || {});
  const contactHeader = contactHeaderState.header || null;
  const contactHeaderLoading = contactHeaderState.loading || false;
  
  // Get contact cards state - FIXED: Use only one selector
  const contactCardsState = useSelector((state) => state.contactCards || {});
  const { cards = [], status = "idle" } = contactCardsState;
  
  // Get contact detail state
  const contactDetailState = useSelector((state) => state.contactDetail || {});
  const contactDetail = contactDetailState.cards || null;
  const contactDetailLoading = contactDetailState.loading || false;
  
  // Get FAQ state
  const faqState = useSelector((state) => state.faq || {});
  const faqs = faqState.faqs || [];
  const faqLoading = faqState.loading || false;

  const onFinish = (values) => {
    dispatch(sendContactMessage(values));
  };

  React.useEffect(() => {
    dispatch(fetchContactHeader());
    dispatch(fetchContactCards());
    dispatch(fetchContactDetail());
    dispatch(fetchFAQs());
  }, [dispatch]);

  React.useEffect(() => {
    if (success) {
      message.success("Message sent successfully!");
      form.resetFields();
      dispatch(resetContactState());
    }
    
    if (error) {
      message.error(error);
    }
  }, [success, error, dispatch, form]);

  // Motion variants for sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Format address with line breaks
  const formatAddress = (text, wordsPerLine = 6) => {
    if (!text) return "";
    const words = text.split(" ");
    let result = "";
    for (let i = 0; i < words.length; i++) {
      result += words[i] + " ";
      if ((i + 1) % wordsPerLine === 0) result += "\n";
    }
    return result.trim();
  };

  // Render text with first word in different color
  const renderFirstWordColoredText = (
    text,
    firstColor = "#000",
    restColor = "#1890ff"
  ) => {
    if (!text) return null;

    const words = text.trim().split(" ");
    const firstWord = words[0];
    const remainingText = words.slice(1).join(" ");

    return (
      <>
        <span style={{ color: firstColor }}>{firstWord}</span>
        {remainingText && (
          <>
            {" "}
            <span style={{ color: restColor }}>{remainingText}</span>
          </>
        )}
      </>
    );
  };

  // Log data for debugging
  React.useEffect(() => {
    console.log("Contact Cards State:", contactCardsState);
    console.log("Cards:", cards);
    console.log("Status:", status);
  }, [contactCardsState, cards, status]);

  return (
    <ConfigProvider theme={antdTheme}>
      <Layout>
        <Content style={{ background: "#ffffff" }}>

          {/* HERO SECTION */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            style={{
              padding: "90px 20px",
              background: "#f5f8fc",
              textAlign: "center",
            }}
          >
            <Title level={2}>
              {renderFirstWordColoredText(
                contactHeader?.section,
                "#000",
                antdTheme.token.colorPrimary
              )}
            </Title>

            <Divider plain>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  color: colorPrimary,
                  fontSize: 22,
                }}
              >
                <span style={{ width: 40, height: 2, background: colorPrimary }} />
                <HeartFilled />
                <span style={{ width: 40, height: 2, background: colorPrimary }} />
              </span>
            </Divider>

            <Paragraph
              style={{
                maxWidth: 720,
                margin: "0 auto",
                fontSize: 16,
                color: colorTextSecondary,
                lineHeight: 1.8,
              }}
            >
              {contactHeaderLoading
                ? "Loading description..."
                : contactHeader?.description || "Connecting communities for a better tomorrow."}
            </Paragraph>
          </motion.div>

          {/* Purpose Cards Section */}
          {status === "loading" ? (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <Paragraph>Loading contact cards...</Paragraph>
            </div>
          ) : (
            <motion.div
              style={{ padding: "60px 20px", background: "#fff" }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Row gutter={[24, 24]} justify="center">
                {cards.length === 0 ? (
                  <Col span={24} style={{ textAlign: "center" }}>
                    <Paragraph>No contact cards available.</Paragraph>
                  </Col>
                ) : (
                  cards.map((card) => (
                    <Col xs={24} sm={24} md={8} key={card.id}>
                      <motion.div variants={cardVariants}>
                        <Card
                          hoverable
                          style={{
                            textAlign: "center",
                            borderRadius: "16px",
                            height: "100%",
                            minHeight: "300px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                            
                          }}
                          bodyStyle={{ 
                            padding: "32px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                            
                          }}
                        >
                          <div
                            style={{
                              width: "66px",
                              height: "66px",
                              borderRadius: "50%",
                              backgroundColor: `${colorPrimary}15`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: "24px",
                            }}
                          >
                            {/* FIXED: Use icon_key from backend */}
                            {iconMap[card.icon_key] || <QuestionOutlined style={{ fontSize: 36, color: colorPrimary }} />}
                          </div>

                          <Title level={4} style={{ marginBottom: "16px", textAlign: "center" }}>
                            {card.title || "No Title"}
                          </Title>
                          <Text type="secondary" style={{ 
                            textAlign: "center",
                            color: colorTextSecondary,
                            fontSize: "16px",
                            lineHeight: "1.6"
                          }}>
                            {card.description || "No description available"}
                          </Text>
                        </Card>
                      </motion.div>
                    </Col>
                  ))
                )}
              </Row>
            </motion.div>
          )}

          {/* CONTACT DETAILS + FORM SECTION */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            style={{ padding: "80px 20px", background: "#f9fbfa" }}
          >
            <Row gutter={[40, 40]} justify="center" style={{ maxWidth: 1200, margin: "0 auto" }}>
              
              {/* Contact Info */}
              <Col xs={24} md={10}>
                <motion.div variants={fadeInUp}>
                  <div
                    style={{
                      background: "#ffffff",
                      padding: "57px 40px",
                      borderRadius: antdTheme.token.borderRadius + 4,
                      height: "100%",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                    }}
                  >
                    <Title
                      level={2}
                      style={{
                        fontWeight: 700,
                        letterSpacing: 1,
                        color: antdTheme.token.colorTextSecondary,
                        marginBottom: 24,
                      }}
                    >
                      CONTACT US
                    </Title>

                    <Divider
                      style={{
                        margin: "16px 0 36px",
                        borderColor: antdTheme.token.colorPrimary,
                        opacity: 0.3,
                      }}
                    />

                    <Paragraph
                      style={{
                        fontSize: 17,
                        lineHeight: 1.9,
                        color: antdTheme.token.colorTextSecondary,
                        marginBottom: 45,
                      }}
                    >
                      {contactDetailLoading 
                        ? "Loading contact details..." 
                        : (contactDetail?.description || "Get in touch with us for more information.")}
                    </Paragraph>

                    {/* Address */}
                    <div style={{ display: "flex", gap: 18, marginBottom: 28 }}>
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: "50%",
                          background: `${antdTheme.token.colorPrimary}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <EnvironmentOutlined
                          style={{ fontSize: 22, color: antdTheme.token.colorPrimary }}
                        />
                      </div>
                      <Paragraph
                        style={{
                          fontSize: 16,
                          color: antdTheme.token.colorTextSecondary,
                          margin: 0,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {formatAddress(contactDetail?.address )}
                      </Paragraph>
                    </div>

                    {/* Phone */}
                    <div style={{ display: "flex", gap: 18, marginBottom: 28 }}>
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: "50%",
                          background: `${antdTheme.token.colorPrimary}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <PhoneOutlined
                          style={{ fontSize: 22, color: antdTheme.token.colorPrimary }}
                        />
                      </div>
                      <Paragraph
                        style={{
                          fontSize: 16,
                          color: antdTheme.token.colorTextSecondary,
                          margin: 0,
                        }}
                      >
                        {contactDetail?.phone }
                      </Paragraph>
                    </div>

                    {/* Email */}
                    <div style={{ display: "flex", gap: 18 }}>
                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: "50%",
                          background: `${antdTheme.token.colorPrimary}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <MailOutlined
                          style={{ fontSize: 22, color: antdTheme.token.colorPrimary }}
                        />
                      </div>
                      <Paragraph
                        style={{
                          fontSize: 16,
                          color: antdTheme.token.colorTextSecondary,
                          margin: 0,
                        }}
                      >
                        {contactDetail?.email }
                      </Paragraph>
                    </div>
                  </div>
                </motion.div>
              </Col>

              {/* Contact Form */}
              <Col xs={24} md={10}>
                <motion.div variants={fadeInUp}>
                  <Card
                    style={{
                      borderRadius: antdTheme.token.borderRadius + 4,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                      padding: "24px",
                    }}
                  >
                    <Title
                      level={4}
                      style={{
                        marginBottom: 0,
                        color: antdTheme.token.colorText,
                      }}
                    >
                      Send a Message
                    </Title>

                    <Form layout="vertical" onFinish={onFinish} form={form}>
                      <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter your name" }]}
                      >
                        <Input  />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Please enter your email" },
                          { type: "email", message: "Please enter a valid email" }
                        ]}
                      >
                        <Input  />
                      </Form.Item>

                      <Form.Item label="Subject" name="subject">
                        <Input  />
                      </Form.Item>

                      <Form.Item
                        label="Message"
                        name="message"
                        rules={[{ required: true, message: "Please enter your message" }]}
                      >
                        <TextArea rows={4} placeholder="Enter your message..." />
                      </Form.Item>

                      <Form.Item>
                        <Button 
                          type="primary" 
                          htmlType="submit" 
                          block 
                          loading={loading}
                          style={{ height: "45px" }}
                        >
                          Submit Message
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                </motion.div>
              </Col>
            </Row>
          </motion.div>

          {/* MAP SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.7 } }}
            viewport={{ once: true, amount: 0.3 }}
            style={{ padding: "60px 20px", background: "#ffffff" }}
          >
            <Row justify="center">
              <Col xs={24} md={20}>
                <Card style={{ borderRadius: 20, overflow: "hidden" }}>
                  <iframe
                    title="NGO Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15127.87890863298!2d73.95966658715821!3d18.575403500000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c39cb89619e3%3A0x9103595adc5a6c0a!2sSamindra%20Devi%20Market!5e0!3m2!1sen!2sin!4v1767094098880!5m2!1sen!2sin"
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    loading="lazy"
                  ></iframe>
                </Card>
              </Col>
            </Row>
          </motion.div>

          {/* FAQ SECTION */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            style={{ padding: "80px 20px", background: "#f5f8fc" }}
          >
            <Row justify="center">
              <Col xs={24} md={16}>
                <Title level={2} style={{ textAlign: "center", marginBottom: 16 }}>
                  {faqs && faqs.length > 0
                    ? renderFirstWordColoredText(faqs[0].section, "#000", colorPrimary)
                    : ""}
                </Title>

                <Paragraph style={{ textAlign: "center", marginBottom: 40, color: colorTextSecondary }}>
                  {faqs && faqs.length > 0 ? faqs[0].description : ""}
                </Paragraph>

                <Collapse
                  bordered={false}
                  defaultActiveKey={[]}
                  expandIconPosition="end"
                  style={{ background: "transparent" }}
                  items={
                    faqLoading
                      ? [{ key: 'loading', label: 'Loading FAQs...', children: 'Please wait...' }]
                      : faqs.length === 0
                      ? [{ 
                          key: 'no-faqs', 
                          label: 'No FAQs Available', 
                          children: 'Check back later for frequently asked questions.' 
                        }]
                      : faqs.map((faq, index) => ({
                          key: faq.id || index,
                          label: faq.question || `Question ${index + 1}`,
                          children: (
                            <Paragraph style={{ margin: 0, color: colorTextSecondary }}>
                              {faq.answer || "No answer provided."}
                            </Paragraph>
                          ),
                          style: {
                            borderRadius: 8,
                            marginBottom: 16,
                            background: "#ffffff",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                            fontWeight: 500,
                          }
                        }))
                  }
                />
              </Col>
            </Row>
          </motion.div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default Contact;