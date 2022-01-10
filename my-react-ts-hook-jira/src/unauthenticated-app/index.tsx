import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
import { useDocumentTitle } from "utils";

export const UnauthenticatedApp = () => {
  const [isRegister, setRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null)

  useDocumentTitle("登录或者注册")

  return (
    <Container>
      <Header />
			<Background />
      <ShadowCard>
				<Title>
					{isRegister ? "请注册" : "请登录"}
				</Title>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
        <Divider />
        <Button type={"link"} onClick={() => setRegister(!isRegister)}>
          {isRegister
            ? "有账号？ 快登录，别愣着!"
            : "没有账号？ 快注册，别思考人生!"}
        </Button> 
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
	width: 100%;
`

const Title = styled.h2`
	margin-bottom: 2.4rem;
	color: rgb(94, 108, 132)
`

const Background = styled.div`
 	position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 45rem;
  padding: 3rem 4rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
