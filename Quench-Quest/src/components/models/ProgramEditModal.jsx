import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;

const sectionCardStyle = {
  background: "#fafafa",
  padding: 16,
  borderRadius: 10,
  marginBottom: 20,
  border: "1px solid #eee",
};

const ProgramEditModal = ({ open, onClose, sectionData, onSave }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (sectionData) {
      // Edit mode: populate form
      form.setFieldsValue(sectionData);
    } else {
      // Add mode: initialize empty form with one key activity and one beneficiary
      form.setFieldsValue({
        title: "",
        description: "",
        keyActivities: [""],
        beneficiaries: ["", "", ""],
        button: { text: "", link: "" },
      });
    }
  }, [sectionData, form]);

  const isHero = sectionData?.section === "Programs Hero Section";
  const isStory = sectionData?.section === "Stories of Change";
  const isProgram = !isHero && !isStory;

  return (
    <Modal
      open={open}
      title={sectionData ? `Edit ${sectionData.section}` : "Add New Program"}
      onCancel={onClose}
      width={800}
      onOk={() => {
        form.validateFields().then((values) => onSave(values));
      }}
      okText={sectionData ? "Save Changes" : "Add Program"}
    >
      <Form form={form} layout="vertical">
        {/* HERO SECTION */}
        {isHero && (
          <div style={sectionCardStyle}>
            <Text strong style={{ fontSize: 16 }}>Hero Section</Text>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true }]}
              style={{ marginTop: 12 }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </div>
        )}

        {/* PROGRAM DETAILS */}
        {isProgram && (
          <div style={sectionCardStyle}>
            <Text strong style={{ fontSize: 16 }}>Program Details</Text>

            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true }]}
              style={{ marginTop: 12 }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            {/* Key Activities */}
            <Form.List name="keyActivities">
              {(fields, { add, remove }) => (
                <>
                  <Row align="middle" style={{ marginBottom: 8 }}>
                    <Text strong>Key Activities</Text>
                    <Button type="link" size="small" onClick={() => add()}>+ Add</Button>
                  </Row>
                  {fields.map((field) => (
                    <Row key={field.key} gutter={8} align="middle" style={{ marginBottom: 8 }}>
                      <Col span={22}>
                        <Form.Item
                          {...field}
                          rules={[{ required: true }]}
                          style={{ marginBottom: 0 }}
                        >
                          <Input size="small" placeholder="Key Activity" />
                        </Form.Item>
                      </Col>
                      <Col span={2}>
                        <Button danger size="small" type="text" onClick={() => remove(field.name)}>✕</Button>
                      </Col>
                    </Row>
                  ))}
                </>
              )}
            </Form.List>

            {/* Beneficiaries */}
            <Form.List name="beneficiaries">
              {(fields, { add, remove }) => (
                <>
                  <Row align="middle" style={{ marginBottom: 8 }}>
                    <Text strong>Beneficiaries</Text>
                    <Button type="link" size="small" onClick={() => add()}>+ Add</Button>
                  </Row>
                  <Row gutter={[8, 8]}>
                    {fields.map((field) => (
                      <Col span={8} key={field.key}>
                        <Row gutter={4} align="middle">
                          <Col span={20}>
                            <Form.Item
                              {...field}
                              rules={[{ required: true }]}
                              style={{ marginBottom: 0 }}
                            >
                              <Input size="small" placeholder="Beneficiary" />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Button danger size="small" type="text" onClick={() => remove(field.name)}>✕</Button>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </Form.List>

            {/* CTA Button */}
            <div style={{ marginTop: 16 }}>
              <Text strong style={{ fontSize: 16 }}>CTA Button</Text>
              <Row gutter={16} style={{ marginTop: 8 }}>
                <Col span={12}>
                  <Form.Item name={["button", "text"]} label="Button Text">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name={["button", "link"]} label="Button Link">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        )}

        {/* STORIES OF CHANGE */}
        {isStory && (
          <Form.List name="stories">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={field.key} style={{ background: "#fff", padding: 20, borderRadius: 12, marginBottom: 16, border: "1px solid #eee" }}>
                    <Text strong>Story {index + 1}</Text>
                    <Form.Item {...field} name={[field.name, "title"]} label="Title" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, "description"]} label="Description" rules={[{ required: true }]}>
                      <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item {...field} name={[field.name, "image"]} label="Story Image" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList?.slice(-1)} rules={[{ required: true }]}>
                      <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
                        <div style={{ color: "#888" }}>
                          <UploadOutlined />
                          <div style={{ fontSize: 12, marginTop: 4 }}>Upload Image</div>
                        </div>
                      </Upload>
                    </Form.Item>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item {...field} name={[field.name, "buttonText"]} label="Button Text">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item {...field} name={[field.name, "buttonLink"]} label="Button Link">
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Button danger type="link" onClick={() => remove(field.name)}>Remove Story</Button>
                  </div>
                ))}
                <Button type="dashed" onClick={() => add()} block>+ Add New Story</Button>
              </>
            )}
          </Form.List>
        )}
      </Form>
    </Modal>
  );
};

export default ProgramEditModal;
