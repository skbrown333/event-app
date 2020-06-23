import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
/* UI */
import { Button, Form, Input, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import GoogleIcon from "../../google-icon.svg";
/* Services */
/* Store */
import { Firebase, FirebaseContext } from "../../firebase";
/* Styles */
import "./_signup.scss";

export const Signup = () => {
  const context = useContext<Firebase | null>(FirebaseContext);
  const history = useHistory();
  const loadingIcon = (
    <LoadingOutlined type="loading" style={{ fontSize: 24 }} spin />
  );

  async function handleSubmit(values) {
    const { email, password } = values;
    try {
      await context?.createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (err) {
      message.error(err.message);
    }
  }

  async function signInWithGoogle() {
    try {
      await context?.signInWithGoogle();
      history.push("/");
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
    <div id="ea-signup">
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
          <Form.Item
            className="password"
            label="Confirm Password"
            name="confirm-password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords not match!");
                },
              }),
            ]}
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
          <Form.Item>
            <Button
              type="link"
              size="large"
              style={{ fontWeight: "bold", width: "100%" }}
              icon={<img src={GoogleIcon} alt="Google" />}
              onClick={signInWithGoogle}
              className="sign-in-with-google"
            >
              Sign in with Google
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};
