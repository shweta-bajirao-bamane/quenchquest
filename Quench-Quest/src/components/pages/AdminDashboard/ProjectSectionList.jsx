import React, { useState } from "react";
import {
  Table,
  Switch,
  Button,
  Tag,
  Typography,
  Space,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// helper
const truncateText = (text, maxWords = 4) => {
  if (!text) return "-";
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

const ProjectSectionList = () => {
  const [projects, setProjects] = useState([
        {
      key: "1",
      type: "hero",
      section: "Projects & Impact Hero Section",
      title: "Our Projects & Impact",
      description:
        "Explore the tangible outcomes of our dedication to social welfare, empowerment, and community development.",
      buttonText: "Download Impact Report",
      status: true,
      lastUpdated: "2025-01-12",
    },
    {
      key: "2",
      category: "Education & Child Welfare",
      tag: "Rural",
      title: "Rural Education Initiative",
      description:
        "Establish learning centers in remote rural areas to provide quality education.",
      stats: {
        childrenEnrolled: "500+",
        villagesCovered: "10",
        literacyIncrease: "30%",
      },
      button: {
        text: "View case Study",
        link: "/programs/education-child-welfare",
      },
      status: true,
      lastUpdated: "2025-01-12",

    },
    {
      key: "3",
      category: "Women Empowerment",
      tag: "Urban Slum",
      title: "Women Empowerment Workshops",
      description:
        "Workshops for women in urban slums to enhance health awareness and economic independence.",
      stats: {
        womenTrained: "350+",
        businessesStarted: "75",
        healthIncrease: "40%",
      },
        button: {
        text: "View case Study",
        link: "/programs/education-child-welfare",
      },
      status: true,
      lastUpdated: "2025-01-11",
    },
    {
      key: "4",
      category: "Livelihood & Skill Training",
      tag: "Urban Slum",
      title: "Vocational Training for Youth",
      description:
        "Skill-based training enabling sustainable livelihoods and self-reliance.",
      stats: {
        youthTrained: "600+",
        jobPlacements: "450+",
        wageIncrease: "25%",
      },
        button: {
        text: "View case Study",
        link: "/programs/education-child-welfare",
      },
      status: false,
      lastUpdated: "2025-01-10",
    },
  ]);

  // toggle active/hidden
  const toggleStatus = (key) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: !item.status } : item
      )
    );
  };

  // delete project
  const handleDelete = (key) => {
    setProjects((prev) => prev.filter((item) => item.key !== key));
  };

  const columns = [
    {
      title: "Sr No",
      width: 70,
      render: (_, __, index) => index + 1,
    },
     {
      title: "Project Title",
      dataIndex: "title",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
   
    {
      title: "Description",
      dataIndex: "description",
      render: (text) => <Text>{truncateText(text)}</Text>,
    },
    {
      title: "Status",
      dataIndex: "status",
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
      responsive: ["md"],
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined style={{ fontSize: 18 }} />}
            onClick={() => {
              console.log("Edit Project:", record);
              // open edit modal here
            }}
          />
          <Popconfirm
            title="Delete this project?"
            description="This action cannot be undone"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined style={{ fontSize: 18 }} />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Title level={3}>Projects & Impact – Section List</Title>
        <Button type="primary" icon={<PlusOutlined />}>
          Add Project
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={projects}
        pagination={false}
        rowKey="key"
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ProjectSectionList;
