import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/porfile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import ResetPassword from "./routes/reset-password";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    path:"/",
    element: 
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/create-account", 
    element: <CreateAccount />
  },
  {
    path: "/reset-password", 
    element: <ResetPassword />
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    //wait for firebase 계정 인증 확인시 대기
    await auth.authStateReady();
    setLoading(false);
    //setTimeout(() => setLoading(false),2000);
  }
  useEffect(() => {
    init();
  },[]);
  return <>
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router = {router} />}
    </Wrapper>  
  </>;
}

export default App;
