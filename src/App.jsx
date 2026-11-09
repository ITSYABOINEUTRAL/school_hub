
import { useState } from "react";
import SideBar from "./components/layout/SideBar";
import TopBar from "./components/layout/TopBar";
import MainContent from "./components/MainContent";
import LoginScreen from "./components/LoginScreen";

const App = () => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("schoolHubAuth");

    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  function handleLogin(data) {
    const authData = {
      token: data.token,
      user: data.user,
    };

    localStorage.setItem("schoolHubAuth", JSON.stringify(authData));

    setAuth(authData);
  }

  function handleLogout() {
    localStorage.removeItem("schoolHubAuth");
    setAuth(null);
  }

  if (!auth) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <TopBar
          user={auth.user}
          onLogout={handleLogout}
        />

        <MainContent />
      </div>
    </div>
  );
};

export default App;
