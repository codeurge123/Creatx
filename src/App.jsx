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
import DocsShell from "./pages/DocsShell.jsx";
import {
  Heart,
  X,
  Copy,
  Check,
  Edit,
  Maximize2
} from 'lucide-react';
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // VS Code dark-like
import "prismjs/components/prism-markup"; // HTML
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";

import { sampleCards } from "../samplecard.js";

function FooterController() {
  const location = useLocation();

  // hide footer only on login page
  if (location.pathname === "/login") return null;

  return <Footer />;
}
function NavbarController() {
  const location = useLocation();

  // hide footer only on login page
  if (location.pathname === "/login") return null;

  return <Navbar />;
}


function Library() {
  const [category, setCategory] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const filteredCards = category === "all"
    ? sampleCards
    : sampleCards.filter(c => c.category === category);

  const displayedCards = showAll ? filteredCards : filteredCards.slice(0, 6);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyCode = () => {
    if (!selectedCard) return;

    const code = `<!-- HTML -->
${selectedCard.html}

/* CSS */
${selectedCard.css}

${selectedCard.js ? `// JavaScript\n${selectedCard.js}` : ''}`;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* Category Filters */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => {
              setCategory("all");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "all"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setCategory("css");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "css"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            CSS
          </button>
          <button
            onClick={() => {
              setCategory("js");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-all ${category === "js"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
          >
            JS
          </button>
        </div>

        {/* Animation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCards.map((card) => (
            <AnimationCard
              key={card.id}
              card={card}
              isFavorite={favorites[card.id]}
              onToggleFavorite={() => toggleFavorite(card.id)}
              onClick={() => setSelectedCard(card)}
            />
          ))}
        </div>

        {/* View All Button */}
        {!showAll && filteredCards.length > 6 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 relative top-[-49px]   bg-indigo-500 hover:from-indigo-600 rounded-full font-semibold shadow-lg transition-all hover:scale-105"
            >
              View All Animations ({filteredCards.length})
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedCard && (
        <AnimationModal
          card={selectedCard}
          isFavorite={favorites[selectedCard.id]}
          onToggleFavorite={() => toggleFavorite(selectedCard.id)}
          onClose={() => setSelectedCard(null)}
          onCopy={copyCode}
          copied={copied}
        />
      )}
    </div>
  );
}

function AnimationCard({ card, isFavorite, onToggleFavorite, onClick }) {
  return (
    <div
      className="relative group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all  hover:scale-105"
    >
      {/* Preview Area */}
      <div className="h-48 bg-black/20 flex items-center justify-center p-4">
        <PreviewContent card={card} />
      </div>

      {/* Card Content */}
      <div className="p-4 cursor-pointer" onClick={onClick}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-left text-white">{card.title}</h3>
            <p className="text-sm text-gray-400 text-left mt-1">{card.description}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="ml-2 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-150"
          >
            <Heart
              size={20}
              className={`transition-all ${isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-400 hover:text-red-400"
                }`}
            />
          </button>
        </div>
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300">
          {card.language}
        </span>
      </div>
    </div>
  );
}

function AnimationModal({ card, isFavorite, onToggleFavorite, onClose, onCopy, copied }) {
  const [showFullCode, setShowFullCode] = useState(false);

  const formatCode = (code, type) => {
    if (!code) return '';

    if (type === 'html') {
      let indent = 0;
      const indentSize = 2;

      return code
        .replace(/>\s*</g, ">\n<") // break tags into lines
        .split("\n")
        .map(line => {
          let trimmed = line.trim();

          // closing tag → decrease indent first
          if (/^<\/.+>/.test(trimmed)) {
            indent--;
          }

          const formatted =
            " ".repeat(Math.max(indent, 0) * indentSize) + trimmed;

          // opening tag that is NOT self-closing → increase indent
          if (
            /^<[^/!][^>]*>$/.test(trimmed) &&
            !trimmed.endsWith("/>") &&
            !trimmed.includes("</")
          ) {
            indent++;
          }

          return trimmed ? formatted : "";
        })
        .filter(Boolean)
        .join("\n");
    }

    if (type === "css") {
      return code
        .replace(/\{/g, " {\n")
        .replace(/\}/g, "\n}\n")
        .replace(/;/g, ";\n")
        .split("\n")
        .map(line => {
          // indent inside blocks
          if (
            line.startsWith("}") ||
            line.startsWith("@keyframes")
          ) return line.trim();

          if (line.includes("{")) return line.trim();

          return line.trim() ? "  " + line.trim() : "";
        })
        .filter(Boolean)
        .join("\n");
    }


    if (type === 'js') {
      let indent = 0;

      return code
        .replace(/;/g, ";\n")
        .replace(/\{/g, " {\n")
        .replace(/\}/g, "\n}\n")
        .split("\n")
        .map(line => {
          if (line.includes("}")) indent -= 1;

          const formatted = "  ".repeat(Math.max(indent, 0)) + line.trim();

          if (line.includes("{")) indent += 1;

          return formatted.trim() ? formatted : "";
        })
        .filter(Boolean)
        .join("\n");
    }

    return code;
  };

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);



  const totalLines =
    (card.html ? formatCode(card.html, 'html').split('\n').length : 0) +
    (card.css ? formatCode(card.css, 'css').split('\n').length : 0) +
    (card.js ? formatCode(card.js, 'js').split('\n').length : 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{card.title}</h2>
              <p className="text-gray-400 mt-1">{card.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleFavorite}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-150"
              >
                <Heart
                  size={24}
                  className={`transition-all ${isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400 hover:text-red-400"
                    }`}
                />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-150"
              >
                <X size={24} className="text-gray-400 " />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="grid justify-center md:grid-cols-[60%_35%] items-start gap-6 p-6 overflow-y-auto max-h-[calc(90vh-180px)]">

            {/* Code Section - Left Side */}
            <div className="space-y-4 min-h-[650px]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-indigo-300">Code</h3>
                {totalLines > 15 && (
                  <button
                    onClick={() => setShowFullCode(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-all"
                  >
                    <Maximize2 size={14} />
                    View Complete Code
                  </button>
                )}
              </div>

              {/* VS Code Style Editor */}
              <div className="space-y-4">
                {card.html && (
                  <CodeBlock
                    code={formatCode(card.html, 'html')}
                    language="HTML"
                    maxLines={totalLines > 15 ? 5 : null}
                  />
                )}

                {card.css && (
                  <CodeBlock
                    code={formatCode(card.css, 'css')}
                    language="CSS"
                    maxLines={totalLines > 15 ? 7 : null}
                  />
                )}

                {card.js && (
                  <CodeBlock
                    code={formatCode(card.js, 'js')}
                    language="JavaScript"
                    maxLines={totalLines > 15 ? 5 : null}
                  />
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onCopy}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all"
                >
                  {copied ? (
                    <>
                      <Check size={18} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy Code
                    </>
                  )}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all">
                  <Edit size={18} />
                  Edit
                </button>
              </div>
            </div>

            {/* Preview Section - Right Side */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-300">Preview</h3>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-white/10 p-8 min-h-[500px] flex items-center justify-center shadow-xl sticky top-0">
                <PreviewContent card={card} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Code Modal */}
      {showFullCode && (
        <FullCodeModal
          card={card}
          formatCode={formatCode}
          onClose={() => setShowFullCode(false)}
        />
      )}
    </>
  );
}

function CodeBlock({ code, language, maxLines }) {
  const codeRef = useRef(null);

  const lines = code.split("\n");
  const isLimited = typeof maxLines === "number";
  const isTruncated = isLimited && lines.length > maxLines;

  const visibleCode = isTruncated
    ? lines.slice(0, maxLines).join("\n")
    : code;

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [visibleCode]);

  return (
    <div className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-white/10 shadow-xl text-left relative">
      {/* Header */}
      <div className="bg-[#323233] px-4 py-2 flex items-center gap-2 border-b border-white/5">
        <span className="text-xs text-gray-400 uppercase">{language}</span>
      </div>

      {/* Code */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code
            ref={codeRef}
            className={`language-${language.toLowerCase()} whitespace-pre`}
          >
            {visibleCode}
          </code>
        </pre>

        {/* Fade only in preview */}
        {isTruncated && (
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1e1e1e] to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
}




function FullCodeModal({ card, formatCode, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Complete Code</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-150"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Full Code Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-4">
          {card.html && (
            <CodeBlock
              code={formatCode(card.html, 'html')}
              language="HTML"
            />
          )}

          {card.css && (
            <CodeBlock
              code={formatCode(card.css, 'css')}
              language="CSS"
            />
          )}

          {card.js && (
            <CodeBlock
              code={formatCode(card.js, 'js')}
              language="JavaScript"
            />
          )}
        </div>
      </div>
    </div>
  );
}


function PreviewContent({ card }) {
  const previewRef = useRef(null);
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    // force remount on card change
    setRenderKey((k) => k + 1);
  }, [card.id]);

  useEffect(() => {
    if (!previewRef.current) return;

    const previewDiv =
      previewRef.current.querySelector(".preview-content");

    if (!previewDiv) return;

    previewDiv.replaceChildren();

    // Inject CSS
    if (card.css) {
      const styleEl = document.createElement("style");
      styleEl.textContent = card.css;
      previewDiv.appendChild(styleEl);
    }

    // Inject HTML (keyed wrapper)
    const wrapper = document.createElement("div");
    wrapper.setAttribute("data-key", renderKey);
    wrapper.innerHTML = card.html || "";
    previewDiv.appendChild(wrapper);

    // 🔥 Force animation restart
    void wrapper.offsetHeight;

    // JS
    if (card.js) {
      const scopedScript = new Function(
        "container",
        `
          const document = {
            querySelector: (s) => container.querySelector(s),
            querySelectorAll: (s) => container.querySelectorAll(s)
          };
          setTimeout(() => { ${card.js} }, 0);
        `
      );
      scopedScript(wrapper);
    }
  }, [renderKey]);

  return (
    <div ref={previewRef} className="w-full">
      <div className="preview-content"></div>
    </div>
  );
}



function AlertNotify({ message, onClose }) {
  const [visible, setVisible] = useState(false);

  // Animate IN on mount
  useEffect(() => {
    setVisible(true);
  }, []);

  // Animate OUT then close
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 500); // match animation duration
  };

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
      <button
        onClick={handleClose}
        className="p-1 rounded bg-red-700 hover:border-1 hover:border-red-800 hover:bg-red-800 transition"
      >
        <X size={16} />
      </button>
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
        <NavbarController />

        <div className='sm:hidden m-5 bg-red-300/20 backdrop-blur-lg p-8 text-center rounded-md fixed top-6  z-50 '>
          <p className="font-semibold m-10">Creatx. is designed for desktop/laptops screens only.</p>
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
          </Routes>
        </main>

        <FooterController />

        <div className="hidden md:block">
          <AnimationPanel />
        </div>
        <div className="hidden md:block">
          <AlertNotify message={"This site is currently under Construction."} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
