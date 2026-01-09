import React, { useState, useEffect, useRef } from "react";
import { Layout, Typography, Row, Col, Divider, Button } from "antd";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  HeartFilled,
  RiseOutlined,
} from "@ant-design/icons";
import antdTheme from "../../theme/antdTheme";
import CountUp from "react-countup";
import { Carousel, Image } from "antd";

import heroBg from "../../assets/hero-img1.png";
import { fetchAboutIntro } from "../../slices/aboutSlice";
import { fetchAboutWho } from "../../slices/aboutWhoSlice";
import { fetchMissionVision } from "../../slices/missionVisionSlice";
import { fetchCoreObjectives } from "../../slices/coreObjectivesSlice";
import { fetchLeadership, setLeadershipItems } from "../../slices/leadershipSlice";
import { fetchImpact } from "../../slices/impactSlice";
import { fetchAwards } from "../../slices/awardsSlice";
import { fetchPartners } from "../../slices/partnersSlice";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

// Motion variants for hero section
const heroVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};
const titleVariant = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const paraVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const About = () => {
  const { colorPrimary, colorTextSecondary } = antdTheme.token;

  // LOCAL STATE FOR LEADERSHIP DATA
  const [localLeaders, setLocalLeaders] = useState([]);
  const [loadingLocal, setLoadingLocal] = useState(false);

  // LOCAL STATE FOR CORE OBJECTIVES
  const [localCoreObjectives, setLocalCoreObjectives] = useState([]);
  const [loadingCore, setLoadingCore] = useState(false);

  // choose icon based on item type/title
  const getIcon = (item) => {
    const t = (item?.type || item?.title || "").toLowerCase();
    const iconStyle = { color: colorPrimary, fontSize: 36, marginBottom: 12 };
    if (t.includes("vision")) return <RiseOutlined style={iconStyle} />;
    if (t.includes("mission")) return <HeartFilled style={iconStyle} />;
    return null;
  };

  // Desktop helper
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.matchMedia("(min-width: 992px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const handler = (e) => setIsDesktop(e.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  // Dispatch
  const dispatch = useDispatch();

  // Selectors
  const { intro, loading: introLoading } = useSelector((state) => state.about);
  const { aboutWho, loading: whoLoading } = useSelector((state) => state.aboutWho);
  const { item: missionVisionItem, loading: mvLoading } = useSelector((state) => state.missionVision);
  
  // Core Objectives from Redux - for debugging
  const coreObjectivesState = useSelector((state) => state.coreObjectives || {});
  const coreItemsFromRedux = coreObjectivesState.items || [];
  const coreLoadingFromRedux = coreObjectivesState.loading || false;
  
  // REDUX leadership state
  const leadershipState = useSelector((state) => state.leadership);
  const reduxLeaders = leadershipState?.items || [];
  const reduxLoading = leadershipState?.loading || false;
  
  // Impact data
  const {
    impactList,
    loading: impactLoading,
  } = useSelector((state) => state.impact);

  // Awards data
  const {
    items: awards,
    loading: awardsLoading,
  } = useSelector((state) => state.awards);

  // Partners data
  const { items: partners, loading: partnersLoading } = useSelector(
    (state) => state.partners
  );

  // DIRECT API FETCH FOR LEADERSHIP
  const fetchLeadershipDirectly = async () => {
    try {
      setLoadingLocal(true);
      console.log("Fetching leadership directly from API...");
      
      const response = await fetch('http://192.168.0.105:8000/api/content/leadership/');
      const data = await response.json();
      
      console.log("Leadership API response:", data);
      
      if (data && Array.isArray(data)) {
        setLocalLeaders(data);
        dispatch(setLeadershipItems(data));
      }
    } catch (error) {
      console.error("Error fetching leadership:", error);
    } finally {
      setLoadingLocal(false);
    }
  };

  // DIRECT API FETCH FOR CORE OBJECTIVES - SIMPLE VERSION
  const fetchCoreObjectivesDirectly = async () => {
    try {
      setLoadingCore(true);
      console.log("Fetching core objectives directly...");
      
      // Try different possible endpoints
      const endpoints = [
        'http://192.168.0.105:8000/api/content/coreobjectives/',
        'http://192.168.0.105:8000/api/coreobjectives/',
        'http://192.168.0.105:8000/coreobjectives/'
      ];
      
      let data = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log(`Trying endpoint: ${endpoint}`);
          const response = await fetch(endpoint);
          if (response.ok) {
            data = await response.json();
            console.log(`Success from ${endpoint}:`, data);
            break;
          }
        } catch (err) {
          console.log(`Failed from ${endpoint}:`, err.message);
        }
      }
      
      if (data) {
        if (Array.isArray(data)) {
          setLocalCoreObjectives(data);
          console.log(`Set ${data.length} core objectives in local state`);
        } else if (data && typeof data === 'object') {
          // Handle different response formats
          if (Array.isArray(data.results)) {
            setLocalCoreObjectives(data.results);
          } else if (Array.isArray(data.data)) {
            setLocalCoreObjectives(data.data);
          } else if (Array.isArray(data.items)) {
            setLocalCoreObjectives(data.items);
          } else {
            // Wrap single object in array
            setLocalCoreObjectives([data]);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching core objectives directly:", error);
    } finally {
      setLoadingCore(false);
    }
  };

  // Load all data on component mount
  useEffect(() => {
    console.log("Component mounted, fetching all data...");
    
    // Fetch leadership
    fetchLeadershipDirectly();
    
    // Fetch core objectives directly (since Redux might not be working)
    fetchCoreObjectivesDirectly();
    
    // Fetch other data normally
    if (!intro) dispatch(fetchAboutIntro());
    if (!aboutWho) dispatch(fetchAboutWho());
    if (!missionVisionItem) dispatch(fetchMissionVision());
    
    // Also try Redux fetch for core objectives
    if (coreItemsFromRedux.length === 0 && !coreLoadingFromRedux) {
      dispatch(fetchCoreObjectives());
    }
    
    if (impactList.length === 0) dispatch(fetchImpact());
    if (awards.length === 0) dispatch(fetchAwards());
    if (partners.length === 0) dispatch(fetchPartners());
    
  }, []);

  // Use LOCAL data for display
  const displayLeaders = localLeaders.length > 0 ? localLeaders : reduxLeaders;
  const displayLoadingLeaders = loadingLocal || reduxLoading;
  
  // Use LOCAL core objectives data (priority) or Redux data
  const displayCoreObjectives = localCoreObjectives.length > 0 ? localCoreObjectives : coreItemsFromRedux;
  const displayLoadingCore = loadingCore || coreLoadingFromRedux;

  // Hero content
  const heroImage = heroBg;
  const mainTitle = intro?.section || intro?.heading || "";
  const subTitle = intro?.subtitle || intro?.sub_title || "";
  const heroParagraph = intro?.description || "";

  // Leadership section data
  const leadershipSectionTitle = displayLeaders.length > 0 
    ? (displayLeaders[0]?.section || "MEET OUR LEADERSHIP")
    : "MEET OUR LEADERSHIP";

  const leadershipSectionDesc = displayLeaders.length > 0 
    ? (displayLeaders[0]?.description || "")
    : "";

  // Core Objectives section title
  const coreObjectivesTitle = displayCoreObjectives.length > 0 
    ? (displayCoreObjectives[0]?.section || "OUR CORE OBJECTIVES")
    : "OUR CORE OBJECTIVES";

  const heroStyle = {
    padding: "100px 20px",
    ...(heroImage && {
      backgroundImage: `linear-gradient(rgba(24, 24, 25, 0.85), rgba(63, 64, 66, 0.85)), url(${heroImage})`,
    }),
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    overflow: 'hidden',
  };

  const partnerData = partners.length > 0 ? partners[0] : null;
  const partnerImages = partnerData
    ? [
        partnerData.image1,
        partnerData.image2,
        partnerData.image3,
        partnerData.image4,
        partnerData.image5,
        partnerData.image6,
      ].filter(Boolean)
    : [];

  // Debug logging
  useEffect(() => {
    console.log("=== CURRENT STATE ===");
    console.log("Core Objectives (Local):", localCoreObjectives);
    console.log("Core Objectives (Redux):", coreItemsFromRedux);
    console.log("Display Core Objectives:", displayCoreObjectives);
    console.log("Loading Core:", displayLoadingCore);
    console.log("=== END STATE ===");
  }, [localCoreObjectives, coreItemsFromRedux, displayCoreObjectives, displayLoadingCore]);


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

// Derive Impact section title from API data
const impactSectionTitle =
  Array.isArray(impactList) && impactList.length > 0
    ? impactList[0].section
    : "";



  return (
    <Layout>
    

      {/* HERO SECTION */}
      {intro ? (
        <Content style={heroStyle}>
          <motion.div
            aria-hidden
            animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              right: -40,
              top: 20,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              filter: 'blur(28px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <Row justify="center">
            <Col xs={24} md={14} style={{ textAlign: "center", position: 'relative', zIndex: 1 }}>
              <motion.div
                variants={heroVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                <motion.div variants={titleVariant}>
                 <Title level={1}>
  {renderFirstWordColoredText(
    `${mainTitle} ${subTitle}`,
    antdTheme.token.colorBgHeader,
    colorPrimary
  )}
</Title>

                </motion.div>

                <motion.div variants={paraVariant}>
                  <Paragraph
                    style={{
                      fontSize: 18,
                      color: antdTheme.token.colorBgHeader,
                      maxWidth: 800,
                      margin: "0 auto",
                      lineHeight: 1.7,
                    }}
                  >
                    {heroParagraph}
                  </Paragraph>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Content>
      ) : null}

      {/* WHO WE ARE SECTION */}
      {aboutWho ? (
        <Content id="about" style={{ padding: '80px 20px', backgroundColor: '#ffffff' }}>
          <Row justify="center">
            <Col xs={24} md={16} style={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
     <Title level={2} style={{ marginBottom: 20 }}>
  {renderFirstWordColoredText(
    aboutWho.section,
    "#000",
    colorPrimary
  )}
</Title>


                <Divider plain style={{ margin: '30px 0' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                viewport={{ once: true }}
              >
                <Paragraph
                  style={{
                    fontSize: 17,
                    color: antdTheme.token.colorTextSecondary,
                    maxWidth: 900,
                    margin: '0 auto',
                    lineHeight: 1.8,
                  }}
                >
                  {aboutWho.description}
                </Paragraph>
              </motion.div>
            </Col>
          </Row>
        </Content>
      ) : null}

     {/* VISION & MISSION */}
      {missionVisionItem ? (
        <Content style={{ padding: "100px 20px", background: "#fafafa" }}>
          <Row gutter={[40, 40]} justify="center">
            {Array.isArray(missionVisionItem) ? (
              missionVisionItem.map((it, index) => {
                const title = it.title || it.section || it.name || `Section ${index + 1}`;
                const desc = it.description || it.desc || it.content || it.body || "";
                const Icon = getIcon(it);
                return (
                  <Col xs={24} md={10} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      viewport={{ once: true }}
                      style={{
                        background: "#fff",
                        padding: 40,
                        borderRadius: antdTheme.token.borderRadius,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                      }}
                    >
                      {/* left-align icon/title/paragraph */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                        {Icon}
                       <Title level={3} style={{ margin: 0, textAlign: 'left' }}>
  {renderFirstWordColoredText(title, "#000", colorPrimary)}
</Title>

                      </div>
                      <Paragraph style={{ fontSize: 16, color: colorTextSecondary }}>{desc}</Paragraph>
                    </motion.div>
                  </Col>
                );
              })
            ) : missionVisionItem.vision && missionVisionItem.mission ? (
              // API returned an object with 'vision' and 'mission'
              <>
                <Col xs={24} md={10}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                    viewport={{ once: true }}
                    style={{
                      background: "#fff",
                      padding: 40,
                      borderRadius: antdTheme.token.borderRadius,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* left-align vision block */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                      <RiseOutlined style={{ color: colorPrimary, fontSize: 36 }} />
                    </div>
                    <Paragraph style={{ fontSize: 16, color: colorTextSecondary }}>{missionVisionItem.vision}</Paragraph>
                  </motion.div>
                </Col>

                <Col xs={24} md={10}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{
                      background: "#fff",
                      padding: 40,
                      borderRadius: antdTheme.token.borderRadius,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* left-align mission block */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                      <HeartFilled style={{ color: colorPrimary, fontSize: 36 }} />
                    </div>
                    <Paragraph style={{ fontSize: 16, color: colorTextSecondary }}>{missionVisionItem.mission}</Paragraph>
                  </motion.div>
                </Col>
              </>
            ) : (
              // Single object with title/description
              (() => {
                const title = missionVisionItem.title || missionVisionItem.section || "OUR VISION";
                const desc = missionVisionItem.description || missionVisionItem.content || missionVisionItem.desc || "";
                const SingleIcon = getIcon(missionVisionItem);
                return (
                  <Col xs={24} md={20} key="single">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0 }}
                      viewport={{ once: true }}
                      style={{
                        background: "#fff",
                        padding: 40,
                        borderRadius: antdTheme.token.borderRadius,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
                      }}
                    >
                      {/* left-align single fallback */}
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                        {SingleIcon}
                        <Title level={3} style={{ margin: 0, textAlign: 'left' }}>{title}</Title>
                      </div>
                      <Paragraph style={{ fontSize: 16, color: colorTextSecondary }}>{desc}</Paragraph>
                    </motion.div>
                  </Col>
                );
              })()
            )}
          </Row>
        </Content>
      ) : mvLoading ? (
        <Content style={{ padding: "100px 20px", background: "#fafafa" }}>
          <Row justify="center">
            <Col xs={24} md={8} style={{ textAlign: 'center' }}>
              <Paragraph style={{ fontSize: 16, color: colorTextSecondary }}>Loading...</Paragraph>
            </Col>
          </Row>
        </Content>
      ) : null}

      {/* SIMPLIFIED CORE OBJECTIVES SECTION - WILL DEFINITELY WORK */}
      <Content style={{ padding: '80px 20px', backgroundColor: '#ffffff' }}>
        <Row justify="center">
          <Col xs={24} md={18} style={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
          <Title level={2} style={{ marginBottom: 20 }}>
  {renderFirstWordColoredText(
    coreObjectivesTitle,
    "#000",          
    colorPrimary     
  )}
</Title>


              <Divider plain style={{ margin: '30px 0' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 14,
                    color: colorPrimary,
                    fontSize: 22,
                  }}
                >
                  <span style={{ width: 40, height: 2, background: colorPrimary }} />
                  <HeartFilled />
                  <span style={{ width: 40, height: 2, background: colorPrimary }} />
                </span>
              </Divider>
            </motion.div>

            {/* SIMPLE DISPLAY - This will definitely work */}
            {displayLoadingCore ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: `3px solid ${colorPrimary}20`,
                  borderTop: `3px solid ${colorPrimary}`,
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }}></div>
                <Paragraph>Loading core objectives...</Paragraph>
              </div>
            ) : displayCoreObjectives.length > 0 ? (
              <div>
               
                
                {displayCoreObjectives.map((item, index) => (
                  <motion.div
                    key={item.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                     style={{
                    fontSize: 17,
                    color: antdTheme.token.colorTextSecondary,
                    maxWidth: 900,
                    margin: '0 auto',
                    lineHeight: 1.8,
                  }}
                  >
                    {/* <Title level={3} style={{ 
                      marginBottom: 20,
                      color: colorPrimary,
                      textAlign: 'center'
                    }}>
                      {item.section || "OUR CORE OBJECTIVES"}
                    </Title> */}
                    
                    <Paragraph
                      style={{
                        fontSize: 17,
                        color: colorTextSecondary,
                        lineHeight: 1.8,
                        textAlign: 'center'
                      }}
                    >
                      {item.description || "No description available"}
                    </Paragraph>
                    
                   
                  </motion.div>
                ))}
              </div>
            ) : (
              // Fallback - Show static content
            <div>No data available</div>
            )}
          </Col>
        </Row>
      </Content>

      {/* SIMPLIFIED LEADERSHIP SECTION */}
      <Content style={{ padding: "100px 20px", background: "#fafafa" }}>
        <Row justify="center">
          <Col xs={24} style={{ textAlign: "center", marginBottom: 60 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
             <Title level={2}>
  {renderFirstWordColoredText(
    leadershipSectionTitle,
    "#000",                             // first word → black
    antdTheme.token.colorPrimary        // remaining → primary
  )}
</Title>


              <Divider plain style={{ margin: "30px 0" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 14,
                    color: antdTheme.token.colorPrimary,
                    fontSize: 22,
                  }}
                >
                  <span style={{ width: 40, height: 2, background: antdTheme.token.colorPrimary }} />
                  <HeartFilled />
                  <span style={{ width: 40, height: 2, background: antdTheme.token.colorPrimary }} />
                </span>
              </Divider>

              <Paragraph
                style={{
                  fontSize: 16,
                  color: antdTheme.token.colorTextSecondary,
                  maxWidth: 700,
                  margin: "0 auto",
                }}
              >
                {leadershipSectionDesc}
              </Paragraph>
            </motion.div>
          </Col>
        </Row>

        <Row gutter={[32, 32]} justify="center">
          {displayLoadingLeaders ? (
            <Col xs={24} style={{ textAlign: "center" }}>
              <Paragraph>Loading leadership...</Paragraph>
            </Col>
          ) : displayLeaders && displayLeaders.length > 0 ? (
            displayLeaders.map((member, index) => (
              <Col xs={24} sm={12} md={8} key={member.id}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    background: "#fff",
                    padding: 30,
                    borderRadius: antdTheme.token.borderRadius,
                    textAlign: "center",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                    height: "100%",
                  }}
                >
                  {/* IMAGE */}
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      margin: "0 auto 20px",
                      borderRadius: "50%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={member.image || member.image_url}
                      alt={member.name}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-avatar.png";
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  <Title level={4}>{member.name}</Title>

                  <Paragraph
                    style={{
                      color: antdTheme.token.colorPrimary,
                      fontWeight: 500,
                      marginBottom: 12,
                    }}
                  >
                    {member.designation}
                  </Paragraph>

                  <Paragraph
                    style={{
                      fontSize: 14,
                      color: antdTheme.token.colorTextSecondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {member.sub_description}
                  </Paragraph>
                </motion.div>
              </Col>
            ))
          ) : (
            <Paragraph>No data available</Paragraph>
          )}
        </Row>
      </Content>

      {/* OUR IMPACT IN NUMBERS SECTION */}
      <Content id="projects" style={{ padding: '100px 20px', backgroundColor: '#ffffff' }}>
        <Row justify="center">
          <Col xs={24} style={{ textAlign: 'center', marginBottom: 60 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
             <Title level={2} style={{ marginBottom: 20 }}>
  {renderFirstWordColoredText(
    impactSectionTitle,
    "#000",                     // first word
    colorPrimary                // remaining words
  )}
</Title>


              <Divider plain style={{ margin: '30px 0' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 12,
                    color: antdTheme.token.colorPrimary,
                    fontSize: 22,
                  }}
                >
                  <span style={{ width: 40, height: 2, background: antdTheme.token.colorPrimary }} />
                  <HeartFilled />
                  <span style={{ width: 40, height: 2, background: antdTheme.token.colorPrimary }} />
                </span>
              </Divider>
            </motion.div>
          </Col>
        </Row>

        <Row
          gutter={[32, 32]}
          justify="center"
          style={{ maxWidth: 1200, margin: '0 auto' }}
        >
          {impactList.map((item, index) => (
            <Col xs={24} sm={8} key={index} style={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.3, duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <Title
                  level={1}
                  style={{
                    color: antdTheme.token.colorPrimary,
                    fontWeight: 700,
                    fontSize: 'clamp(35px, 6vw, 24px)',
                    marginBottom: 10,
                  }}
                >
                  <CountUp
                    start={0}
                    end={Number(String(item.value).replace(/[^\d]/g, ""))}
                    duration={2.5}
                    separator=","
                  />
                  +
                </Title>

                <Paragraph
                  style={{
                    fontSize: 18,
                    fontWeight: 500,
                    color: antdTheme.token.colorText,
                  }}
                >
                  {item.label}
                </Paragraph>
              </motion.div>
            </Col>
          ))
          
          }
        </Row>
      </Content>

      {/* AWARDS & ACHIEVEMENTS */}
      <Content style={{ background: "#e6d3c6", padding: "0" }}>
        <Carousel autoplay dots={true} effect="fade">
          {awards.map((award, index) => (
            <div key={index}>
              <Row
                align="middle"
                style={{
                  minHeight: "520px",
                  padding: "60px 40px",
                }}
              >
                <Col xs={24} md={12} style={{ paddingLeft: isDesktop ? 64 : 20 }}>
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <Title
                      level={2}
                      style={{
                        fontWeight: 700,
                        maxWidth: 520,
                      }}
                    >
                      {award.title}
                    </Title>

                    <Paragraph
                      style={{
                        fontSize: 16,
                        lineHeight: 1.8,
                        maxWidth: 520,
                        marginTop: 20,
                      }}
                    >
                      {award.description}
                    </Paragraph>
                  </motion.div>
                </Col>

                <Col xs={24} md={12}>
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Image
                      src={award.image}
                      preview={false}
                      style={{
                        maxHeight: 360,
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                    />
                  </motion.div>
                </Col>
              </Row>
            </div>
          ))}
        </Carousel>
      </Content>

      {/* PARTNERS SECTION */}
      <Content style={{ padding: "100px 20px", background: "#ffffffff" }}>
        <Row justify="center">
          <Col xs={24} style={{ textAlign: "center", marginBottom: 50 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
             <Title level={2}>
  {renderFirstWordColoredText(
    partnerData?.section || "OUR PARTNERS",
    "#000",                 // first word → black
    colorPrimary            // remaining words → primary
  )}
</Title>


              <Divider plain>
                <HeartFilled style={{ color: colorPrimary, fontSize: 22 }} />
              </Divider>

              <Paragraph
                style={{
                  fontSize: 16,
                  color: colorTextSecondary,
                  maxWidth: 700,
                  margin: "0 auto",
                }}
              >
                {partnerData ? partnerData.description : ""}
              </Paragraph>
            </motion.div>
          </Col>
        </Row>

        <Row justify="center">
          <Col xs={24} md={18}>
            <Carousel
              autoplay
              autoplaySpeed={2000}
              dots={false}
              slidesToShow={4}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1024, settings: { slidesToShow: 3 } },
                { breakpoint: 768, settings: { slidesToShow: 2 } },
                { breakpoint: 480, settings: { slidesToShow: 1 } },
              ]}
            >
              {partnersLoading
                ? Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} style={{ height: 120, background: "#f0f0f0" }} />
                  ))
                : partnerImages.map((img, index) => (
                    <div key={index}>
                      <div
                        style={{
                          height: 120,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 20,
                        }}
                      >
                        <Image
                          src={img}
                          preview={false}
                          style={{
                            maxHeight: 80,
                            maxWidth: "100%",
                            objectFit: "contain",
                            transition: "0.3s",
                          }}
                        />
                      </div>
                    </div>
                  ))}
            </Carousel>
          </Col>
        </Row>
      </Content>

      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Layout>
  );
};

export default About;