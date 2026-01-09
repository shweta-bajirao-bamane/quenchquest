import React, { useEffect } from "react";
import {
    Modal,
    Input,
    Form,
    Upload,
    Button,
    Typography,
    DatePicker,
    Row,
    Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text, Paragraph } = Typography;

const HeroEditModal = ({ open, onClose, sectionData, onSave }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (!sectionData) return;

        const fixedData = { ...sectionData };

        // Convert Latest News dates to dayjs
        if (fixedData.news) {
            fixedData.news = fixedData.news.map((item) => ({
                ...item,
                date: item.date ? dayjs(item.date) : null,
            }));
        }

        form.setFieldsValue(fixedData);
    }, [sectionData, form]);

    if (!sectionData) return null;

    return (
        <Modal
            title={`Edit ${sectionData.section}`}
            open={open}
            onCancel={onClose}
            onOk={() => {
                form.validateFields().then((values) => {
                    // Convert dayjs back to string for Latest News
                    if (values.news) {
                        values.news = values.news.map((item) => ({
                            ...item,
                            date: item.date ? item.date.format("YYYY-MM-DD") : null,
                        }));
                    }
                    onSave(values);
                });
            }}
            okText="Save Changes"
            width={800}
            bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
        >
            <Form form={form} layout="vertical">

                {/* CORE OBJECTIVES */}
                {sectionData.section === "Core Objectives" && (
                    <>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: "Please enter a title" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: "Please enter a description" }]}
                        >
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </>
                )}

                {/* HERO SECTION */}
                {sectionData.section === "Hero Section" && (
                    <>
                        {/* Title + Subtitle */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="title"
                                    label="Title"
                                    rules={[{ required: true, message: "Please enter a title" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="subtitle"
                                    label="Subtitle"
                                    rules={[{ required: true, message: "Please enter a subtitle" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Description */}
                        <Form.Item name="description" label="Description">
                            <Input.TextArea rows={3} />
                        </Form.Item>

                        {/* Buttons */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="button1Text"
                                    label="Button 1 Text"
                                    rules={[{ required: true, message: "Enter Button 1 text" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="button2Text"
                                    label="Button 2 Text"
                                    rules={[{ required: true, message: "Enter Button 2 text" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        {/* Hero Image */}
                        <Form.Item label="Hero Image">
                            <Upload beforeUpload={() => false} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                            </Upload>
                        </Form.Item>
                    </>
                )}

                {/* WHO WE ARE SECTION */}
                {sectionData.section === "Who We Are" && (
                    <>
                        <Form.Item
                            name="title"
                            label="Title"
                            rules={[{ required: true, message: "Please enter a title" }]}
                        >
                            <Input placeholder="WHO WE ARE ?" />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true, message: "Please enter a description" }]}
                        >
                            <Input.TextArea rows={4} placeholder="Enter the Who We Are description" />
                        </Form.Item>

                    </>
                )}

                {/* FEATURED PROGRAMS */}
                {sectionData.section === "Featured Programs" && (
                    <Form.List name="programs">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div
                                        key={field.key}
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: 16,
                                            borderRadius: 8,
                                            marginBottom: 12,
                                        }}
                                    >
                                        <Text strong>Program {index + 1}</Text>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "icon"]}
                                                    label="Icon"
                                                    rules={[{ required: true }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "title"]}
                                                    label="Title"
                                                    rules={[{ required: true }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item
                                            {...field}
                                            name={[field.name, "description"]}
                                            label="Description"
                                            rules={[{ required: true }]}
                                        >
                                            <Input.TextArea rows={2} />
                                        </Form.Item>

                                        <Button type="link" danger onClick={() => remove(field.name)}>
                                            Remove Program
                                        </Button>
                                    </div>
                                ))}

                                <Button type="dashed" onClick={() => add()} block>
                                    + Add New Program
                                </Button>
                            </>
                        )}
                    </Form.List>
                )}

                {/* IMPACT IN NUMBERS */}
                {sectionData.section === "Impact in Numbers" && (
                    <Form.List name="impacts">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div
                                        key={field.key}
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: 16,
                                            borderRadius: 8,
                                            marginBottom: 12,
                                        }}
                                    >
                                        <Text strong>Impact {index + 1}</Text>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "count"]}
                                                    label="Count"
                                                    rules={[{ required: true }]}
                                                >
                                                    <Input type="number" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "label"]}
                                                    label="Label"
                                                    rules={[{ required: true }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Button type="link" danger onClick={() => remove(field.name)}>
                                            Remove Impact
                                        </Button>
                                    </div>
                                ))}

                                <Button type="dashed" onClick={() => add()} block>
                                    + Add New Impact
                                </Button>
                            </>
                        )}
                    </Form.List>
                )}

                {/* VOLUNTEER CTA */}
                {sectionData.section === "Volunteer CTA" && (
                    <>
                        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea rows={3} />
                        </Form.Item>

                        <Form.Item
                            name="buttonText"
                            label="Button Text"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </>
                )}

                {/* LATEST NEWS */}
                {sectionData.section === "Latest News" && (
                    <Form.List name="news">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div
                                        key={field.key}
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: 16,
                                            borderRadius: 8,
                                            marginBottom: 12,
                                        }}
                                    >
                                        <Text strong>News {index + 1}</Text>

                                        <Form.Item
                                            {...field}
                                            name={[field.name, "title"]}
                                            label="Title"
                                            rules={[{ required: true }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            {...field}
                                            name={[field.name, "desc"]}
                                            label="Description"
                                            rules={[{ required: true }]}
                                        >
                                            <Input.TextArea rows={2} />
                                        </Form.Item>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "date"]}
                                                    label="Date"
                                                    rules={[{ required: true }]}
                                                >
                                                    <DatePicker style={{ width: "100%" }} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "buttonText"]}
                                                    label="Button Text"
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Form.Item {...field} name={[field.name, "image"]} label="Image">
                                            <Upload beforeUpload={() => false} maxCount={1}>
                                                <Button icon={<UploadOutlined />}>Upload Image</Button>
                                            </Upload>
                                        </Form.Item>

                                        <Button type="link" danger onClick={() => remove(field.name)}>
                                            Remove News
                                        </Button>
                                    </div>
                                ))}

                                <Button type="dashed" onClick={() => add()} block>
                                    + Add New News
                                </Button>
                            </>
                        )}
                    </Form.List>
                )}

            </Form>
        </Modal>
    );
};

export default HeroEditModal;
