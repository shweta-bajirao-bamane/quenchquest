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
import HeroEditModal from "../../models/HeroEditModal";

const { Title, Text } = Typography;

// Helper function to truncate text after N words
const truncateText = (text, maxWords = 4) => {
  if (!text) return "-";
  const words = text.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + " ...."
    : text;
};


const HomeSectionLists = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSection, setCurrentSection] = useState(null);

    const [sections, setSections] = useState([
        {
            key: "1",
            section: "Hero Section",
            title: "Empowering Lives.",
            subtitle: "Building Stronger Communities.",
            description:
                "We are a social welfare organization dedicated to uplifting underprivileged children, women, and communities.",
            status: true,
            lastUpdated: "2025-01-12",
        },
        {
            key: "2",
            section: "Who We Are",
            title: "WHO WE ARE ?",
            description:
                "Quench Quest Social Foundation is dedicated to empowering marginalized communities through education, health awareness, and grassroots-driven action.",
            image: "https://via.placeholder.com/400x220",
            status: true,
            lastUpdated: "2025-01-03",
        },
        {
            key: "3",
            section: "Core Objectives",
            description:
                "We aim to provide education, health, and empowerment programs to build stronger communities.",
            status: true,
            lastUpdated: "2025-01-10",
        },
        {
            key: "4",
            section: "Featured Programs",
            programs: [
                { key: "p1", icon: "🎓", title: "Education", description: "Quality education for children" },
                { key: "p2", icon: "❤️", title: "Health", description: "Medical camps and awareness" },
                { key: "p3", icon: "💼", title: "Training", description: "Skill development programs" },
            ],
            status: true,
            lastUpdated: "2025-01-08",
        },
        {
            key: "5",
            section: "Impact in Numbers",
            impacts: [
                { key: "i1", count: 45000, label: "Children & Women Supported" },
                { key: "i2", count: 8500, label: "Skill & Awareness Programs Conducted" },
                { key: "i3", count: 520, label: "Rural & Urban Communities Reached" },
            ],
            status: true,
            lastUpdated: "2025-01-05",
        },
        {
            key: "6",
            section: "Volunteer CTA",
            title: "Become a Volunteer",
            description: "Join our mission to help communities.",
            buttonText: "Join as Volunteer",
            status: false,
            lastUpdated: "2025-01-01",
        },
        {
            key: "7",
            section: "Latest News",
            news: [
                {
                    key: "n1",
                    image: "https://via.placeholder.com/400x220",
                    date: "2025-01-01",
                    title: "Community Outreach Event",
                    desc: "We conducted a community outreach program in rural areas.",
                    buttonText: "Connect With Us",
                },
                {
                    key: "n2",
                    image: "https://via.placeholder.com/400x220",
                    date: "2025-01-05",
                    title: "Health Awareness Campaign",
                    desc: "Awareness campaign for women's health in urban areas.",
                    buttonText: "Connect With Us",
                },
            ],
            status: true,
            lastUpdated: "2025-01-04",
        },
    ]);

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
            render: (_, record) => (
                <Text>{truncateText(record.description || record.title, 6)}</Text>
            ),
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
                            setCurrentSection(record);
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
            <Title level={3}>Home Page Section Lists</Title>

            {/* Table with horizontal scroll for desktop */}
            <Table
                columns={columns}
                dataSource={sections}
                pagination={false}
                rowKey="key"
                scroll={{ x: "max-content" }} // horizontal scroll
            />

            {/* Section Edit Modal */}
            <HeroEditModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sectionData={currentSection}
                onSave={(updatedData) => {
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
                    setIsModalOpen(false);
                    console.log("Updated Section Content:", updatedData);
                }}
            />
        </div>
    );
};

export default HomeSectionLists;
