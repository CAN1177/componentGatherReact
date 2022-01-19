import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";
import { ReactComponent as SoftLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  // const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
            <Route index element={<ProjectListScreen />} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
};

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* 直接以svg 格式渲染，避免直接渲染为图片 */}
        {/* <img src={softLogo} alt=""/> */}
        <Button type="link" onClick={resetRoute}>
          <SoftLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <ButtonNoPadding type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </ButtonNoPadding>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
const Container = styled.div`
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3)
  z-index: 1;
`;

const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
  button {
    display: flex;
    align-items: center;
  }
`;

const HeaderRight = styled.div``;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
