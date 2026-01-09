import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Image,
  Input,
  Button,
  Form,
  Checkbox,
  Space,
  Divider,
  Select,
  message ,
} from "antd";
import {
  LockOutlined,
  CreditCardOutlined,
  BankOutlined,
  GoogleOutlined,
  HeartFilled,
} from "@ant-design/icons";
import antdTheme from "../../theme/antdTheme";

import eduImg from "../../assets/story6.png";
import skillImg from "../../assets/story5.png";
import childImg from "../../assets/story7.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchCorporatePartnership } from "../../slices/corporatePartnershipSlice";
import { fetchUpcomingEvents } from "../../slices/upcomingEventsSlice";


const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const GetInvolved = () => {
  const { colorPrimary, colorTextSecondary, borderRadius } = antdTheme.token;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.corporatePartnership);
  const { events, status: eventsStatus } = useSelector((state) => state.upcomingEvents);


  // Donation state
  const [amount, setAmount] = useState(100);
  const [frequency, setFrequency] = useState("One-time");
  const [paymentMode, setPaymentMode] = useState("Card");

  // Responsive helper (mobile breakpoint at 576px)
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 576px)").matches : false
  );

  // Compute responsive heights for event cover images (mirrors previous CSS breakpoints)
  const computeEventImageHeight = (width) => {
    if (width >= 992) return 320;
    if (width >= 768) return 260;
    if (width >= 576) return 200;
    return 160;
  };

  const [eventImgHeight, setEventImgHeight] = useState(
    typeof window !== "undefined" ? computeEventImageHeight(window.innerWidth) : 320
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 576px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      setEventImgHeight(computeEventImageHeight(window.innerWidth));
    };

    // Set initial height
    setEventImgHeight(computeEventImageHeight(typeof window !== "undefined" ? window.innerWidth : 992));

    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);

    // Also listen for resize to catch other breakpoints
    const resizeHandler = () => setEventImgHeight(computeEventImageHeight(window.innerWidth));
    window.addEventListener("resize", resizeHandler);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // Animation state + helper for sections
  const [visibleSections, setVisibleSections] = useState({});

  const sectionBaseStyle = {
    opacity: 0,
    transform: "translateY(24px)",
    transition: "opacity 600ms cubic-bezier(.2,.9,.2,1), transform 600ms cubic-bezier(.2,.9,.2,1)",
  };

  const sectionVisibleStyle = {
    opacity: 1,
    transform: "translateY(0)",
  };

  const getSectionStyle = (id, extra = {}) => {
    // Special animation for Volunteer: slide in from left
    if (id === "volunteer") {
      const base = {
        opacity: 0,
        transform: "translateX(-24px)",
        transition:
          "opacity 700ms cubic-bezier(.2,.9,.2,1), transform 700ms cubic-bezier(.2,.9,.2,1)",
      };
      const visible = {
        opacity: 1,
        transform: "translateX(0)",
      };
      return {
        ...extra,
        ...base,
        ...(visibleSections[id] ? visible : {}),
      };
    }

    // Default animation (fade up)
    return {
      ...extra,
      ...sectionBaseStyle,
      ...(visibleSections[id] ? sectionVisibleStyle : {}),
    };
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) setVisibleSections((s) => ({ ...s, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const donationAmounts = [25, 50, 100, 250];

  const handleDonate = () => {
    console.log("Donate:", {
      amount,
      frequency,
      paymentMode,
    });
  };

  const handleVolunteerSubmit = (values) => {
    console.log("Volunteer Application:", values);
    // Static success message
  message.success("Thank you for volunteering! We will contact you soon.");

  // Clear form fields
  form.resetFields();
  };

useEffect(() => {
  dispatch(fetchCorporatePartnership());
}, [dispatch]);

useEffect(() => {
  dispatch(fetchUpcomingEvents());
}, [dispatch]);

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

  return (
    <Layout>
      <Content style={{ padding: "0px 20px", backgroundColor: "#ffffff" }}>
        {/* ================= Donation Section ================= */}
        {/* <Row data-section="donation" justify="center" style={getSectionStyle("donation", { marginBottom: 30, marginLeft: -20, marginRight: -20 })}>
          <Col xs={24} md={24}>
            <Card
              style={{
                borderRadius: borderRadius + 4,
                padding: isMobile ? "24px 0" : "40px 0",
                textAlign: "center", backgroundColor: "#f5f8fc",
              }}
            >
              <Title level={2}>Make a Donation</Title>
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
                  <span
                    style={{
                      width: 40,
                      height: 2,
                      background: colorPrimary
                    }}
                  />
                  <HeartFilled />
                  <span
                    style={{
                      width: 40,
                      height: 2,
                      background: colorPrimary
                    }}
                  />
                </span>
              </Divider>
              <Paragraph
                style={{
                  color: colorTextSecondary,
                  fontSize: 16,
                  marginBottom: 30,
                }} >
                Your generous contributions enable us to continue our vital work, transforming lives and building stronger communities. <br></br>Every amount makes a significant impact.
              </Paragraph>
              <Space size="middle"
                style={{
                  marginBottom: 10
                }}
                direction={isMobile ? "vertical" : "horizontal"}
                align={isMobile ? "stretch" : undefined}>
                {donationAmounts.map((amt) =>
                  (<Button key={amt} type={amount === amt ? "primary" : "default"} 
                  onClick={() => setAmount(amt)} block={isMobile} > ₹{amt} </Button>))} 
                  <Input placeholder="Other amount" style={{ width: isMobile ? "100%" : 140 , padding: "8px"}}
                   type="number" onChange={(e) => setAmount(Number(e.target.value))} /> 
                   </Space> <br /> <br /> 
      
                    <Space size="middle" style={{ marginBottom: 20 }} direction={isMobile ? "vertical" : "horizontal"}>
                       <Button type={frequency === "One-time" ? "primary" : "default"} 
                       onClick={() => setFrequency("One-time")} block={isMobile} > One-time </Button> 
                       <Button type={frequency === "Monthly" ? "primary" : "default"} 
                       onClick={() => setFrequency("Monthly")} block={isMobile} > Monthly </Button>
                        </Space> <Divider /> 
                   
                         <Title level={5}>Select Payment Method</Title> 
                         <Select value={paymentMode} 
                         onChange={(value) => setPaymentMode(value)}
                          style={{ width: isMobile ? "100%" : 300, marginTop: 10 }} 
                          size="large" > 
                          <Option value="Card"> 
                            <CreditCardOutlined /> 
                            Credit / Debit Card </Option>
                             <Option value="UPI"> <GoogleOutlined /> UPI (Google Pay, PhonePe, Paytm) </Option> <Option value="NetBanking"> <BankOutlined /> Net Banking </Option> </Select>
                              <Paragraph style={{ marginTop: 20, color: colorTextSecondary, fontSize: 14, display: "flex", justifyContent: "center", alignItems: "center", gap: 6, }} > <
                                LockOutlined style={{ color: colorPrimary }} /> Secure payment via trusted payment gateways </Paragraph> 
                                <Button type="primary" size="large" style={{ borderRadius: 8, marginTop: 10, width: isMobile ? "100%" : undefined }} 
                                block={isMobile} onClick={handleDonate} > Donate ₹{amount} </Button> </Card> </Col>
                                 </Row> */}


<br></br>
        {/* ================= Volunteer Section ================= */}
        <Row data-section="volunteer" justify="center" gutter={[16, 16]} style={getSectionStyle("volunteer", { marginBottom: 60 })}>
          <Col xs={24} sm={22} md={20} lg={16}>
            <Card
              style={{
                borderRadius: borderRadius + 4,
                padding: "30px 20px",
                boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
                border: "none",
              }}
            >
              <Title level={2}>Become a Volunteer</Title>
              <Paragraph style={{ color: colorTextSecondary, fontSize: 16, marginBottom: 30 }}>
                Lend your time and talents to make a direct impact on the lives of those we serve.
                Join our dedicated team of volunteers!
              </Paragraph>

              <Form  form={form} layout="vertical" onFinish={handleVolunteerSubmit}>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[{ required: true, type: "email" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item label="Phone Number" name="phone">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Preferred Location (Optional)"
                      name="location"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Skills & Experience"
                  name="skills"
                  rules={[{ required: true }]}
                >
                  <TextArea
                    rows={4}
                    placeholder="Tell us about your skills, interests, and previous volunteer experience..."
                  />
                </Form.Item>

                <Form.Item label="Availability" name="availability">
                  <Checkbox.Group>
                    <Row gutter={[16, 16]}>
                      <Col>
                        <Checkbox value="Weekdays">Weekdays</Checkbox>
                      </Col>
                      <Col>
                        <Checkbox value="Weekends">Weekends</Checkbox>
                      </Col>
                      <Col>
                        <Checkbox value="Evenings">Evenings</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" size="large" htmlType="submit" style={{ borderRadius: 8 }}>
                    Submit Application
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* ================= Corporate Partnerships Section ================= */}
        <Row data-section="corporate" justify="center" gutter={[16, 16]} style={getSectionStyle("corporate", { marginBottom: 60, marginLeft: -20, marginRight: -20 })}>
          <Col xs={24} md={24}>
            <Card
              style={{
                borderRadius: borderRadius + 4,
                padding: isMobile ? "24px 0" : "40px 0",
                textAlign: "center",
                backgroundColor: "#f5f8fc",
                boxShadow: "0 12px 36px rgba(16,24,40,0.08)",
                border: "none",
              }}
            >
              <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 20px" }}>
          <Title level={2} style={{ textAlign: "center" }}>
  {data && data[0]?.section
    ? renderFirstWordColoredText(
        data[0].section,
        "#000",
        antdTheme.token.colorPrimary
      )
    : ""}
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
    maxWidth: 800,
    margin: "0 auto 40px",
    color: colorTextSecondary,
    fontSize: 16,
    textAlign: "center",
  }}
>
  {data && data[0]?.phara }
</Paragraph>

               <Row gutter={[24, 24]} style={{ textAlign: "left" }}>
  {/* ================= Why Partner With Us ================= */}
  <Col xs={24} md={12}>
    <Title level={4}>
      {data && data[0]?.title ? renderFirstWordColoredText(
        data[0].title,
        "#000",
        antdTheme.token.colorPrimary
      ) : "Why Partner With Us?"}
    </Title>
    <ul style={{ color: colorTextSecondary, lineHeight: 2 }}>
      {data && data[0]?.description
        ? data[0].description.split(",").map((item, idx) => (
            <li key={idx}>{item.trim()}</li>
          ))
        : (
            <>
              
            </>
          )}
    </ul>
  </Col>

  {/* ================= Partnership Opportunities ================= */}
  <Col xs={24} md={12}>
    <Title level={4}>
      {data && data[1]?.title ? renderFirstWordColoredText(
        data[1].title,
        "#000",
        antdTheme.token.colorPrimary
      ) : "Partnership Opportunities"}
    </Title>
    <ul style={{ color: colorTextSecondary, lineHeight: 2 }}>
      {data && data[1]?.description
        ? data[1].description.split(",").map((item, idx) => (
            <li key={idx}>{item.trim()}</li>
          ))
        : (
            <>
             
            </>
          )}
    </ul>
  </Col>
</Row>


                <Button type="primary" size="large" onClick={() => navigate('/contact')} style={{ marginTop: 20 }}>Know More</Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* ================= Upcoming Fundraising Events ================= */}
        <Row data-section="upcoming" justify="center" gutter={[32, 32]} style={getSectionStyle("upcoming", { marginBottom: 80 })}>
          <Col xs={24} sm={22} md={20}>
            <Title level={2} style={{ textAlign: "center" }}>
  {eventsStatus === "loading"
    ? "Loading section..."
    : events.length > 0
    ? renderFirstWordColoredText(
        events[0].section,
        "#000", // default color for the rest
        antdTheme.token.colorPrimary // color for the first word
      )
    : "No section available."}
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
    maxWidth: 850,
    margin: "0 auto 40px",
    color: colorTextSecondary,
    fontSize: 16,
    textAlign: "center",
  }}
>
  {eventsStatus === "loading"
    ? "Loading description..."
    : events.length > 0
    ? events[0].description
    : "No description available."}
</Paragraph>


            <Row gutter={[16, 24]}>
             {eventsStatus === "loading" ? (
  <p>Loading events...</p>
) : events.length > 0 ? (
  events.map((event) => (
    <Col xs={24} sm={12} md={8} key={event.id}>
      <Card
        hoverable
        style={{
          borderRadius: 16,
          height: "100%",
          boxShadow: "0 12px 36px rgba(16,24,40,0.10)",
          padding: 0,
          overflow: "hidden",
        }}
        bodyStyle={{ padding: "18px" }}
        cover={
          <Image
            src={event.image_url || event.image}
            alt={event.title}
            fallback={event.image_url || event.image}
            preview={false}
            style={{
              width: "100%",
              height: eventImgHeight,
              objectFit: "cover",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />
        }
      >
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div>
            <div
              style={{
                background: "#F2F4F7",
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 13,
                display: "inline-block",
                marginBottom: 12,
              }}
            >
              {event.tag}
            </div>
            <Title level={4}>{event.title}</Title>
            <Paragraph style={{ fontSize: 14, color: colorTextSecondary }}>
              {event.event_date} · {event.location}
            </Paragraph>
            <Paragraph style={{ fontSize: 15 }}>{event.sub_description}</Paragraph>
          </div>
        </div>
      </Card>
    </Col>
  ))
) : (
  <p>No upcoming events found.</p>
)}

            </Row>
          </Col>
        </Row>

      </Content>
    </Layout>

  );
};

export default GetInvolved;
