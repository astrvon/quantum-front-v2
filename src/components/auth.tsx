import { Flex, Form, Input, Button, Image, Typography } from "antd";

import useLoginMutation, {
  ILoginMutationPayload,
  LoginSchemaPayload,
} from "@/common/custom/hooks/api/mutation/auth/useLoginMutation";
import { IThemeColor } from "@/common/interfaces/enum/ThemeColor.enum";
import { setZodFormErrors } from "@/common/lib/setZodFormErrors";

const HeaderAuth = () => (
  <div style={{ flex: 1, width: "100%" }}>
    <Image
      fallback="https://dummyimage.com/150x50/1e88e5/ffffff&text=Logo"
      src="/static/logo.png"
      alt="logo"
      width={50}
      preview={false}
    />
    <Typography.Title level={3} style={{ marginTop: 16 }}>
      Start exploring the goodies.
    </Typography.Title>
  </div>
);

export const Auth = () => {
  const [formLogin] = Form.useForm<ILoginMutationPayload>();

  const { mutate: login, isPending: isLoadingLogin } = useLoginMutation();

  const handleFinish = async () => {
    const values = await formLogin.validateFields();
    const parsed = LoginSchemaPayload.safeParse(values);
    if (!parsed.success) return setZodFormErrors(parsed.error, formLogin);
    login(parsed.data);
  };

  const LoginForm = () => (
    <Form
      form={formLogin}
      onFinish={handleFinish}
      layout="vertical"
      style={{ width: "100%" }}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[{ required: true, message: "Username is required" }]}
        required
      >
        <Input placeholder="Enter your username" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Password is required" }]}
        required
      >
        <Input.Password placeholder="Enter your password" />
      </Form.Item>
      <Button type="primary" block loading={isLoadingLogin} htmlType="submit">
        Login
      </Button>
    </Form>
  );

  return (
    <Flex
      style={{ height: "100vh", background: IThemeColor.Background }}
      align="center"
      justify="center"
    >
      <Flex
        style={{
          width: 900,
          height: 500,
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Flex flex={1} style={{ flexDirection: "column", padding: 32 }}>
          <HeaderAuth />
          <LoginForm />
        </Flex>

        <Flex
          flex={1}
          align="center"
          justify="center"
          style={{
            background: IThemeColor.Primary,
            height: "100%",
          }}
        >
          <Image
            src="/static/logo_banner.png"
            fallback="https://dummyimage.com/400x300/1e88e5/ffffff&text=Banner"
            width={400}
            preview={false}
            alt="Banner"
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
