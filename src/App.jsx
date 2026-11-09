import { useState } from "react";
import SideBar from "./components/layout/SideBar";
import TopBar from "./components/layout/TopBar";
import MainContent from "./components/MainContent";
import LoginScreen from "./components/LoginScreen";

const App = () => {
  const [user, setUser] = useState(null);


  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <TopBar user={user} onLogout={() => setUser(null)} />

        <MainContent />
      </div>
    </div>
  );
};

export default App;