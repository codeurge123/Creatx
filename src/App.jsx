// App.jsx
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import CardGrid from "./components/CardGrid";
import CodeViewer from "./components/CodeViewer";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AnimationPanel from "./components/AnimationPanel";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Login from "./pages/Login.jsx";
import SignUp from './pages/SignUp.jsx'
import DocsShell from "./pages/DocsShell.jsx";
import Community from "./pages/Community.jsx";
import {
  Heart,
  X,
  Copy,
  Check,
  Edit,
  Maximize2
} from 'lucide-react';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; 
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import { AnimationCard } from "./components/AnimationCard.jsx";
import { AnimationModal } from "./components/AnimationModal.jsx";
import { CodeBlock, FullCodeModal } from "./components/CodeBlock.jsx";
import { PreviewContent } from "./components/PreviewContent.jsx";
import Library from "./components/Library.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import { sampleCards } from "../samplecard.js";
import ScrollToTop from "./components/ScrollToTop.jsx";

function FooterController() {
  const location = useLocation();

  // hide footer only on login page
  if (location.pathname === "/login") return null;
  if (location.pathname === "/signup") return null;

  return <Footer />;
}
function NavbarController() {
  const location = useLocation();

  // hide footer only on login page
  if (location.pathname === "/login") return null;
  if(location.pathname === '/signup') return null
 
  return <Navbar />;
}

function AnimationPanelController() {
  const location = useLocation();
  
  // hide footer only on login page
  if (location.pathname === "/login") return null;
  if(location.pathname === '/signup') return null
  return <AnimationPanel />;
}

function AlertNotify({ message }) {
  const [visible, setVisible] = useState(false);

  // Animate IN on mount
  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false)
    }, 3000);
  }, []);

  return (
    <div
      className={`
        fixed bottom-6 left-6 z-50
        bg-red-700 text-white
        px-4 py-4 rounded-lg shadow-lg
        flex items-center gap-3
        transition-all duration-300 ease-out
        ${visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-6 scale-95"}
      `}
    >
      <span>{message}</span>
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(sampleCards[0]);
  const [category, setCategory] = useState("all");
  const [cards] = useState(sampleCards);

  useEffect(() => {
    const filtered = category === "all" ? cards : cards.filter((c) => c.category === category);
    if (!filtered.some((c) => c.id === selected?.id)) {
      setSelected(filtered[0] || cards[0] || null);
    }
  }, [category, cards]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen text-white flex flex-col">
        <ScrollToTop />
        <NavbarController />

        <div className="sm:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <div className="bg-red-300/20 p-8 mx-6 text-center rounded-lg shadow-lg">
            <p className="font-semibold text-lg text-white">
              Creatx. is designed for desktop/laptop screens only.
            </p>
          </div>
        </div>


        <main className="site-main max-w-6xl mx-auto pt-28 pb-8 px-4 flex-1 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<DocsShell />} />
            <Route
              path="/library"
              element={
                <Library
                  selected={selected}
                  setSelected={setSelected}
                  category={category}
                  setCategory={setCategory}
                  cards={cards}
                />
              }
            />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/community" element={<Community />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
          </Routes>
        </main>

        <FooterController />

        <div className="hidden md:block">
          <AnimationPanelController />
        </div>
        <div className="hidden md:block">
          <AlertNotify message={"This site is currently under Construction."} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
