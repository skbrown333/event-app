import React, { useContext } from "react";
/* UI */
import { Button, Form, Input, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
/* Services */
/* Store */
import { Firebase, FirebaseContext } from "../../firebase";
/* Styles */
import "./_signup.scss";

interface State {
  loading: boolean;
}

export const Signup = () => {
  const context = useContext<Firebase | null>(FirebaseContext);
  const loadingIcon = (
    <LoadingOutlined type="loading" style={{ fontSize: 24 }} spin />
  );

  async function handleSubmit(values) {
    const { email, password } = values;
    try {
      await context?.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      message.error(err.message);
    }
  }

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  return (
    <div id="signup">
      <Spin indicator={loadingIcon} spinning={false}>
        <Form
          className="event-form"
          layout="vertical"
          style={{ width: 300 }}
          onFinish={handleSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            className="email"
            label="Email"
            name="email"
            rules={[{ type: "email", required: true }]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            className="password"
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ fontWeight: "bold", width: "100%" }}
            >
              Signup
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
