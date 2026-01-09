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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ProgramEditModal from "../../models/ProgramEditModal";

const { Title, Text } = Typography;

// Helper function to truncate text
const truncateText = (text, maxWords = 4) => {
  if (!text) return "-";
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + " ...."
    : text;
};

const ProgramSectionList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  const [sections, setSections] = useState([
    {
      key: "1",
      section: "Programs Hero Section",
      title: "Our Programs",
      description:
        "Creating sustainable impact for children, women, and communities.",
      status: true,
      lastUpdated: "2025-01-12",
    },
    {
      key: "2",
      section: "Program 1 - Education & Child Welfare",
      title: "Education & Child Welfare",
      description:
        "Providing access to quality education, child protection, and nutrition support.",
      keyActivities: [
        "Running informal education and learning support centers",
        "Distribution of school supplies and uniforms",
        "Child protection awareness workshops",
        "Nutritional support programs",
      ],
      beneficiaries: ["Children", "SC", "ST", "Urban Slum Families"],
      button: {
        text: "Learn More / Support",
        link: "/programs/education-child-welfare",
      },
      status: true,
      lastUpdated: "2025-01-10",
    },
    {
      key: "3",
      section: "Stories of Change",
      title: "Stories of Change",
      description:
        "Real-life stories showcasing impact and transformation through our programs.",
      stories: [
        {
          title: "From Child Labour to Classroom Dreams",
          description:
            "Rescued from child labour, Raju was enrolled in our bridge education program.",
          image: [],
          buttonText: "Know More",
          buttonLink: "/stories/raju",
        },
      ],
      status: true,
      lastUpdated: "2025-01-05",
    },
  ]);

  // Toggle status
  const toggleStatus = (key) => {
    setSections((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, status: !item.status } : item
      )
    );
  };

  // Delete section
  const handleDelete = (key) => {
    setSections((prev) => prev.filter((item) => item.key !== key));
  };

  // Table columns
  const columns = [
    {
      title: "Sr. No",
      key: "srNo",
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
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined style={{ fontSize: 18 }} />}
            onClick={() => {
              setCurrentSection(record); // Edit mode
              setIsModalOpen(true);
            }}
          />
          <Popconfirm
            title="Delete this section?"
            description="This action cannot be undone"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
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
      <Title level={3}>Program Page Section Lists</Title>

      {/* Add Program Button */}
      <Button
        type="primary"
        style={{ marginBottom: 16 , float:"right"}}
        onClick={() => {
          setCurrentSection(null); // Add mode
          setIsModalOpen(true);
        }}
      >
        + Add Program
      </Button>

      <Table
        columns={columns}
        dataSource={sections}
        pagination={false}
        rowKey="key"
        scroll={{ x: "max-content" }}
      />

      {/* Modal for Add/Edit */}
      <ProgramEditModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sectionData={currentSection}
        onSave={(updatedData) => {
          if (currentSection) {
            // Edit existing
            setSections((prev) =>
              prev.map((item) =>
                item.key === currentSection.key
                  ? {
                      ...item,
                      ...updatedData,
                      lastUpdated: new Date().toISOString().split("T")[0],
                    }
                  : item
              )
            );
          } else {
            // Add new program
            const newKey = (sections.length + 1).toString();
            setSections((prev) => [
              ...prev,
              {
                key: newKey,
                section: `Program ${newKey} - ${updatedData.title || "New Program"}`,
                status: true,
                lastUpdated: new Date().toISOString().split("T")[0],
                ...updatedData,
              },
            ]);
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default ProgramSectionList;
