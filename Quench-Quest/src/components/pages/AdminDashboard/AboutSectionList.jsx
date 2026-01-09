import React, { useState } from "react";
import {
  Table,
  Button,
  Switch,
  Tag,
  Typography,
  Space,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AboutEditModal from "../../models/AboutEditModal";


const { Title, Text } = Typography;

// Truncate helper
const truncateText = (text, maxWords = 4) => {
  if (!text) return "-";
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + " ...."
    : text;
};

const AboutSectionList = () => {
  const [sections, setSections] = useState([
    {
      key: "1",
      section: "About Us",
      title: "About Us",
      description:
        "Quench Quest Social Foundation is committed to empowering marginalized communities.",
      status: true,
      lastUpdated: "2025-01-12",
    },
    {
      key: "2",
      section: "Who We Are",
      title: "WHO WE ARE ?",
      description:
        "Quench Quest Social Foundation is a non-profit organization dedicated to education.",
      status: true,
      lastUpdated: "2025-01-10",
    },
    {
      key: "3",
      section: "Vision & Mission",
      vision:
        "To build an inclusive society where every child lives with dignity.",
      mission:
        "To empower vulnerable communities through education and healthcare.",
      status: true,
      lastUpdated: "2025-01-09",
    },
    {
      key: "4",
      section: "Core Objectives",
      title: "Core Objectives",
      description:
        "Promoting education, improving health awareness and eliminating inequalities.",
      status: true,
      lastUpdated: "2025-01-08",
    },
    {
      key: "5",
      section: "Leadership",
      title: "MEET OUR LEADERSHIP",
      description: "Our leadership team brings together passion, experience, and commitment to drive meaningful social change and community empowerment.",
      leaders: [
        {
          name: "Dr. Anya Sharma",
          role: "Founder & CEO",
          bio: "Visionary leader with experience in social impact.",
        },
      ],
      status: true,
      lastUpdated: "2025-01-06",
    },
    {
      key: "6",
      section: "Impact in Numbers",
      title: "Impact in Numbers",

      impacts: [
        { key: "i1", count: 45000, label: "Children & Women Supported" },
        { key: "i2", count: 8500, label: "Skill & Awareness Programs Conducted" },
        { key: "i3", count: 520, label: "Rural & Urban Communities Reached" },
      ],
      status: true,
      lastUpdated: "2025-01-05",
    },

    {
      key: "7",
      section: "Awards & Awardees",
      title: "Best NGO for Social Impact",
      description:
        "Awarded for sustained impact, transparency and innovation in social welfare.",
      image: [],
      ctaText: "View all",
      status: true,
      lastUpdated: "2025-01-13",
    },

    {
      key: "8",
      section: "Partners",
      title: "Our Partners",
      description: "We proudly collaborate with organizations that share our vision.",
      partners: [
        {
          // name: "Hexaware",
          logo: [], // antd Upload fileList
        },
        {
          // name: "Reliance",
          logo: [],
        },
      ],
      status: true,
      lastUpdated: "2025-01-04",
    },
  ]);




  const [editOpen, setEditOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const toggleStatus = (key) => {
    setSections((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: !item.status } : item
      )
    );
  };

  const handleDelete = (key) => {
    setSections((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSave = (updatedValues) => {
    setSections((prev) =>
      prev.map((item) =>
        item.key === currentSection.key
          ? {
            ...item,
            ...updatedValues,
            lastUpdated: new Date().toISOString().split("T")[0],
          }
          : item
      )
    );
  };

  const columns = [
    {
      title: "Sr. No",
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: "Section Name",
      dataIndex: "section",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Description",
      render: (_, record) => {
        const preview =
          record.description ||
          record.vision ||
          record.mission ||
          record.title;
        return <Text>{truncateText(preview)}</Text>;
      },
    },
    {
      title: "Status",
      render: (_, record) => (
        <Space>
          <Tag color={record.status ? "green" : "red"}>
            {record.status ? "Active" : "Hidden"}
          </Tag>
          <Switch
            checked={record.status}
            onChange={() => toggleStatus(record.key)}
          />
        </Space>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => {
              setCurrentSection(record);
              setEditOpen(true);
            }}
          />
          <Popconfirm
            title="Delete this section?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>About Page Section Lists</Title>

      <Table
        columns={columns}
        dataSource={sections}
        pagination={false}
        rowKey="key"
        scroll={{ x: "max-content" }}
      />

      <AboutEditModal
        open={editOpen}
        sectionData={currentSection}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default AboutSectionList;
