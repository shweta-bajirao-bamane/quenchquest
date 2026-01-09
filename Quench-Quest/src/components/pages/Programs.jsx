import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Typography, Row, Col, Card, Button, Tag, ConfigProvider, Divider } from "antd";
import {
    BookOutlined,
    HeartOutlined,
    ToolOutlined,
    SafetyOutlined,
    HeartFilled,
    RightOutlined,
    LeftOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";

import story1 from "../../assets/story1.png";
import story2 from "../../assets/story2.png";
import story3 from "../../assets/story3.png";

import antdTheme from "../../theme/antdTheme";
import { useDispatch, useSelector } from "react-redux";
import { fetchProgramIntro, updateProgramHeaderData } from "../../slices/programSlice";
import { fetchProgramCards, updateProgramCardData } from "../../slices/programCardsSlice";
import { fetchProgramSlider, updateProgramSliderData } from "../../slices/programSliderSlice";
import {fetchProgramMission,updateProgramMissionData} from "../../slices/programMissionSlice";




const { Content } = Layout;
const { Title, Paragraph } = Typography;

// const programsData = [
//     {
//         title: "Education & Child Welfare",
//         icon: <BookOutlined />,
//         description:
//             "Providing access to quality education, ensuring child protection, and fostering holistic development for children from underprivileged backgrounds.",
//         activities: [
//             "Running informal education and learning support centers",
//             "Distribution of school supplies and uniforms",
//             "Child protection awareness workshops",
//             "Nutritional support programs",
//         ],
//         beneficiaries: ["Children", "SC", "ST", "Urban Slum Families"],
//     },
//     {
//         title: "Women & Maternal Health",
//         icon: <HeartOutlined />,
//         description:
//             "Improving health outcomes for women and mothers through awareness, healthcare access, and reproductive health support.",
//         activities: [
//             "Health camps and regular medical check-ups",
//             "Maternal care and nutrition counseling",
//             "Hygiene and sanitation awareness",
//             "Distribution of sanitary products",
//         ],
//         beneficiaries: ["Women", "Expectant Mothers", "Rural Communities"],
//     },
//     {
//         title: "Livelihood & Skill Training",
//         icon: <ToolOutlined />,
//         description:
//             "Empowering economically weaker sections with vocational skills and livelihood opportunities to achieve financial independence.",
//         activities: [
//             "Vocational and skill development training",
//             "Entrepreneurship guidance programs",
//             "Job placement assistance",
//             "Financial literacy workshops",
//         ],
//         beneficiaries: ["Adults", "Unemployed Youth", "EWS", "OBCs"],
//     },
//     {
//         title: "Anti-Child Labour & Awareness",
//         icon: <SafetyOutlined />,
//         description:
//             "Working towards eradicating child labour and promoting awareness about children’s rights and social justice.",
//         activities: [
//             "Rescue and rehabilitation of child laborers",
//             "Community awareness drives",
//             "Advocacy for child rights",
//             "Human rights education workshops",
//         ],
//         beneficiaries: ["Children", "Parents", "Community Leaders"],
//     },
// ];

// const storiesData = [
//     {
//         title: "From Child Labour To Classroom Dreams",
//         description:
//             "Rescued from child labour, Raju was enrolled in our bridge education program. Today, he is back in school, dreaming of becoming a teacher and uplifting others like him.",
//         image: story2,
//     },
//     {
//         title: "Revathi’s Journey From A Small Village To Working For India’s Largest IT Company",
//         description:
//             "From a rural background, Revathi overcame challenges through our education and skill programs. Today, she works at a leading IT company, inspiring young girls to dream big.",
//         image: story1,
//     },
//     {
//         title: "Empowering Women Through Skills & Confidence",
//         description:
//             "Through our livelihood training programs, Meena gained vocational skills and financial independence, transforming her family’s future.",
//         image: story3,
//     },
// ];


const Programs = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
const programHeader = useSelector((state) => state.program.header);
const programCards = useSelector((state) => state.programCards.cards);
const programCardsStatus = useSelector((state) => state.programCards.status);
const sliders = useSelector((state) => state.programSlider.sliders);
const sliderStatus = useSelector((state) => state.programSlider.status);
const mission = useSelector((state) => state.programMission.mission);
const missionStatus = useSelector((state) => state.programMission.status);



 useEffect(() => {
    dispatch(fetchProgramIntro());
  }, [dispatch]);

  useEffect(() => {
  dispatch(fetchProgramCards());
}, [dispatch]);

useEffect(() => {
  dispatch(fetchProgramSlider());
}, [dispatch]);

useEffect(() => {
  dispatch(fetchProgramMission());
}, [dispatch]);


  const handleUpdate = () => {
    if (!programHeader?.id) return;

    const formData = new FormData();
    formData.append("title", "Updated Title");
    formData.append("description", "Updated description for the program header");

    dispatch(updateProgramHeaderData({ id: programHeader.id, data: formData }));
  };

const handleUpdateCard = (card) => {
  const formData = new FormData();
  formData.append("title", card.title + " Updated");
  formData.append("description", card.description + " Updated");
  dispatch(updateProgramCardData({ id: card.id, data: formData }));
};

const handleUpdateSlider = () => {
  if (!slider?.id) return;

  const formData = new FormData();
  formData.append("title", slider.title + " Updated");
  formData.append("description", slider.description + " Updated");
  // If image upload exists:
  // formData.append("image", selectedFile);

  dispatch(updateProgramSliderData({ id: slider.id, data: formData }));
};

const handleUpdateMission = () => {
  if (!mission?.id) return;

  const formData = new FormData();
  formData.append("section", mission.section + " Updated");
  formData.append("description", mission.description + " Updated");

  dispatch(updateProgramMissionData({ id: mission.id, data: formData }));
};


    const { colorPrimary, colorTextSecondary } = antdTheme.token;
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 576px)").matches;

    // Animation state + helpers
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

    const getSectionStyle = (id, extra = {}) => ({
        ...extra,
        ...sectionBaseStyle,
        ...(visibleSections[id] ? sectionVisibleStyle : {}),
    });

    // Per-card animation helper (direction cycles: up, left, right) with staggered delay
    const getCardStyle = (id, idx) => {
        const directions = ["up", "left", "right"];
        const dir = directions[idx % directions.length];
        const base = {
            opacity: 0,
            transform: dir === "up" ? "translateY(24px)" : dir === "left" ? "translateX(-24px)" : "translateX(24px)",
            transition: "opacity 600ms cubic-bezier(.2,.9,.2,1), transform 600ms cubic-bezier(.2,.9,.2,1)",
            transitionDelay: `${idx * 120}ms`,
        };
        const visible = {
            opacity: 1,
            transform: "translateX(0) translateY(0)",
        };
        return {
            ...base,
            ...(visibleSections[id] ? visible : {}),
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
const ArrowStyle = (colorPrimary) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 5,
  fontSize: 20,
  background: "#ffffff",
  color: colorPrimary,
  padding: 12,
  borderRadius: "50%",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
  cursor: "pointer",
});

const PrevArrow = ({ onClick, colorPrimary }) => (
  <div
    style={{ ...ArrowStyle(colorPrimary), left: 15 }}
    onClick={onClick}
  >
    <LeftOutlined />
  </div>
);

const NextArrow = ({ onClick, colorPrimary }) => (
  <div
    style={{ ...ArrowStyle(colorPrimary), right: 15 }}
    onClick={onClick}
  >
    <RightOutlined />
  </div>
);


    return (
        <ConfigProvider theme={antdTheme}>
            <Layout>
                <Content style={{ padding: "100px 20px", background: "#ffffff" }}>

                    {/* Header */}
                   <Row
  data-section="programs-header"
  justify="center"
  style={getSectionStyle("programs-header", {})}
>
  <Col xs={24} md={14} style={{ textAlign: "center" }}>
  <Title level={2}>
  {renderFirstWordColoredText(
    programHeader?.section ,
    "#000",          // first word → black
    colorPrimary     // remaining → primary
  )}
</Title>


    <Divider plain style={{ margin: "30px 0" }}>
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
        fontSize: 16,
        color: colorTextSecondary,
        maxWidth: 750,
        margin: "0 auto 60px",
        lineHeight: 1.7,
      }}
    >
      {programHeader?.description }  </Paragraph>
  </Col>
</Row>


    <Row
  data-section="program-cards"
  gutter={[40, 40]}
  justify="center"
  style={getSectionStyle("program-cards", { maxWidth: 1600, margin: "0 auto" })}
>
  {programCards.length === 0 ? (
    <Col span={24} style={{ textAlign: "center", marginTop: 50 }}>
      <Paragraph style={{ color: colorTextSecondary, fontSize: 16 }}>
        {programCardsStatus === "loading" ? "Loading program cards..." : "No program cards available."}
      </Paragraph>
    </Col>
  ) : (
    programCards.map((program, index) => (
      <Col xs={24} sm={24} md={12} lg={10} key={program.id}>
        <Card
          hoverable
          style={{
            height: "100%",
            borderRadius: antdTheme.token.borderRadius,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            maxWidth: 900,
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: 32, color: colorPrimary, marginBottom: 16 }}>
            {program.icon || <BookOutlined />}
          </div>

          <Title level={4}>{program.title || "Untitled Program"}</Title>
          <Paragraph style={{ color: colorTextSecondary }}>{program.description || "No description available."}</Paragraph>

          <Paragraph style={{ fontWeight: 600, marginBottom: 8 }}>
            {program.activities || "Key Activities:"}
          </Paragraph>
          <ul style={{ paddingLeft: 18, color: colorTextSecondary }}>
            {(program.activity_points ? program.activity_points.split(",") : []).map((item, idx) => (
              <li key={idx}>{item.trim()}</li>
            ))}
          </ul>

          <Paragraph style={{ fontWeight: 600, marginTop: 12 }}>
            {program.target || "Target Beneficiaries:"}
          </Paragraph>
          <div style={{ marginBottom: 20 }}>
            {(program.benefits ? program.benefits.split(",") : []).map((tag, idx) => (
              <Tag key={idx} style={{ marginBottom: 6 , marginRight: 8,  padding: "4px 10px",}}>
                {tag.trim()}
              </Tag>
            ))}
          </div>

          <Button type="primary"  onClick={() => navigate("/contact")} block>
         Know More 
          </Button>
        </Card>
      </Col>
    ))
  )}
</Row>

                </Content>


                {/* STORIES OF CHANGE SECTION */}
             <Content>
  <Row
    data-section="stories"
    justify="center"
    style={getSectionStyle("stories", { marginTop: 120 })}
  >
    <Col xs={24} md={20}>

      {/* ===== SECTION HEADER ===== */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Title level={2}>
          {renderFirstWordColoredText(
            "Stories Of Change",
            "#000",
            colorPrimary
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
      </div>

      {/* ===== SLIDER ===== */}
      <Carousel
        autoplay
        dots
        arrows
        prevArrow={<PrevArrow colorPrimary={colorPrimary} />}
        nextArrow={<NextArrow colorPrimary={colorPrimary} />}
        style={{ padding: "20px", position: "relative" }}
      >
        {sliderStatus === "loading" ? (
          <div style={{ textAlign: "center" }}>Loading stories...</div>
        ) : sliders.length === 0 ? (
          <div style={{ textAlign: "center" }}>No stories available.</div>
        ) : (
          sliders.map((story) => (
            <div key={story.id}>
              <Card
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                }}
              >
                <Row gutter={0} align="middle">
                  {/* ===== TEXT ===== */}
                  <Col
                    xs={24}
                    md={12}
                    style={{
                      padding: isMobile ? "24px" : "50px",
                      background: colorPrimary,
                      color: "#ffffff",
                      minHeight: isMobile ? 220 : 380,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Title level={4} style={{ color: "#ffffff" }}>
                      {story.title}
                    </Title>

                    <Paragraph
                      style={{
                        color: "rgba(255,255,255,0.9)",
                        fontSize: 16,
                        lineHeight: 1.7,
                      }}
                    >
                      {story.description}
                    </Paragraph>

                    <Button
                      onClick={() => navigate("/contact")}
                      style={{
                        marginTop: 20,
                        background: "#ffffff",
                        color: colorPrimary,
                        borderRadius: 30,
                        fontWeight: 600,
                        width: "fit-content",
                      }}
                    >
                      Know More
                    </Button>
                  </Col>

                  {/* ===== IMAGE ===== */}
                  <Col xs={24} md={12}>
                    <img
                      src={story.image_url || story.image}
                      alt={story.title}
                      style={{
                        width: "100%",
                        height: isMobile ? 220 : "100%",
                        objectFit: "cover",
                        minHeight: isMobile ? 220 : 380,
                        display: "block",
                      }}
                    />
                  </Col>
                </Row>
              </Card>
            </div>
          ))
        )}
      </Carousel>

    </Col>
  </Row>
</Content>

                {/* DONATE NOW SECTION */}
               <Content
  data-section="donate"
  style={getSectionStyle("donate", {
    padding: "80px 20px",
    background: "#f5f5f5",
    marginTop: 80,
  })}
>
  <Row justify="center">
    <Col xs={24} md={14} style={{ textAlign: "center" }}>
     <Title level={2}>
  {renderFirstWordColoredText(
    mission?.section,
    "#000",          // first word → black
    colorPrimary     // remaining words → primary
  )}
</Title>


      <Divider plain style={{ margin: "30px 0" }}>
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
          fontSize: 16,
          color: colorTextSecondary,
          maxWidth: 750,
          margin: "0 auto 40px",
          lineHeight: 1.7,
        }}
      >
       {missionStatus === "loading"
          ? "Loading mission..."
          : mission?.description || "No description available."}
      </Paragraph>

      <Button
        type="primary"
        size="large"
        style={{
          borderRadius: 30,
          padding: "10px 40px",
          fontWeight: 600,
        }}
         onClick={() => navigate('/get-involved')}
      >
        {mission?.button_text || "Volunteer With Us"}
      </Button>

      {/* Admin update (optional) */}
      {/* <Button onClick={handleUpdateMission} style={{ marginTop: 20 }}>
        Update Mission
      </Button> */}
    </Col>
  </Row>
</Content>


            </Layout>
        </ConfigProvider>
    );
};

export default Programs;
