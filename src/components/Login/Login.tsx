import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

/* Components */
import { Button, Form, Input, message } from "antd";
import GoogleIcon from "../../google-icon.svg";

/* Store */
import { Firebase, FirebaseContext } from "../../firebase";

/* Styles */
import "./_login.scss";

/**
 * Login Page
 *
 * @example
 * <Login />
 */
export const Login = () => {
  const context = useContext<Firebase | null>(FirebaseContext);
  const history = useHistory();

  async function handleSubmit(values) {
    const { email, password } = values;
    try {
      await context?.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (err) {
      message.error("Email or password is incorrect!");
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
    },
  };

  return (
    <div id="ea-signup">
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
            Login
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
    </div>
  );
};
