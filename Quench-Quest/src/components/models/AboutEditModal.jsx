import React, { useEffect } from "react";
import { Modal, Form, Input, Switch, Button, Typography, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";


const { Text } = Typography;

const AboutEditModal = ({ open, onClose, onSave, sectionData }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (sectionData) {
            form.setFieldsValue(sectionData);
        }
    }, [sectionData, form]);

    if (!sectionData) return null;

    return (
        <Modal
            title={`Edit Section – ${sectionData.section}`}
            open={open}
            onCancel={onClose}
            width={800}
            okText="Save Changes"
            onOk={() => {
                form.validateFields().then((values) => {
                    onSave(values);
                    onClose();
                });
            }}
        >
            <Form layout="vertical" form={form}>

                {/* COMMON FIELDS */}
                {sectionData.title !== undefined && (
                    <Form.Item label="Title" name="title">
                        <Input />
                    </Form.Item>
                )}

                {sectionData.description !== undefined && (
                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                )}

                {sectionData.vision && (
                    <Form.Item label="Vision" name="vision">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                )}

                {sectionData.mission && (
                    <Form.Item label="Mission" name="mission">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                )}

                {/* LEADERSHIP */}
                {sectionData.section === "Leadership" && (
                    <Form.List name="leaders">
                        {(fields, { add, remove }) => (
                            <>


                                {fields.map((field, index) => (
                                    <div
                                        key={field.key}
                                        style={{ border: "1px solid #ddd", padding: 16, marginBottom: 12 }}
                                    >
                                        <Text strong>Leader {index + 1}</Text>

                                        <Form.Item
                                            {...field}
                                            name={[field.name, "name"]}
                                            label="Name"
                                            rules={[{ required: true }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            {...field}
                                            name={[field.name, "role"]}
                                            label="Role"
                                            rules={[{ required: true }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            {...field}
                                            name={[field.name, "bio"]}
                                            label="Bio"
                                        >
                                            <Input.TextArea rows={2} />
                                        </Form.Item>

                                        <Button danger type="link" onClick={() => remove(field.name)}>
                                            Remove Leader
                                        </Button>
                                    </div>
                                ))}

                                <Button type="dashed" block onClick={() => add()}>
                                    + Add Leader
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


                {/* PARTNERS */}
                {/* PARTNERS */}
                {sectionData.section === "Partners" && (
                    <Form.List name="partners">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div
                                        key={field.key}
                                        style={{
                                            border: "1px solid #ddd",
                                            padding: 16,
                                            marginBottom: 12,
                                            borderRadius: 6,
                                        }}
                                    >
                                        <Typography.Text strong>
                                            Partner {index + 1}
                                        </Typography.Text>

                                        {/* <Form.Item
              {...field}
              name={[field.name, "name"]}
              label="Partner Name"
              rules={[{ required: true, message: "Enter partner name" }]}
            >
              <Input />
            </Form.Item> */}

                                        <Form.Item
                                            label="Partner Logo"
                                            name={[field.name, "logo"]}
                                            valuePropName="fileList"
                                            getValueFromEvent={(e) =>
                                                Array.isArray(e) ? e : e?.fileList
                                            }
                                            rules={[{ required: true, message: "Upload partner logo" }]}
                                        >
                                            <Upload
                                                listType="picture-card"
                                                beforeUpload={() => false}
                                                maxCount={1}
                                            >
                                                <div>
                                                    <UploadOutlined />
                                                    <div style={{ marginTop: 8 }}>Upload</div>
                                                </div>
                                            </Upload>
                                        </Form.Item>

                                        <Button danger type="link" onClick={() => remove(field.name)}>
                                            Remove Partner
                                        </Button>
                                    </div>
                                ))}

                                <Button type="dashed" block onClick={() => add()}>
                                    + Add Partner
                                </Button>
                            </>
                        )}
                    </Form.List>
                )}


                {/* AWARDS & AWARDEES */}
                {sectionData.section === "Awards & Awardees" && (
                    <>

                        <Form.Item
                            label="Upload Image"
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            rules={[{ required: true, message: "Upload award image" }]}
                        >
                            <Upload
                                listType="picture-card"
                                beforeUpload={() => false} // prevent auto upload
                                maxCount={1} // only allow 1 image
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </>
                )}


            </Form>
        </Modal>
    );
};

export default AboutEditModal;
