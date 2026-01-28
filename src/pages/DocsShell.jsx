// DocsPage.jsx
import React, { useEffect, useMemo, useState } from "react";

/* Sample snippet content */
const SAMPLE_HTML = `<!-- HTML -->
<div class="demo">
  <div class="dot"></div>
  <div class="label">Creatx</div>
</div>`;

const SAMPLE_CSS = `/* CSS */
.demo{
  width:120px; margin:40px auto; display:flex;flex-direction:column;align-items:center;gap:8px;
}
.dot{
  width:60px;height:60px;border-radius:12px;background:#06b6d4;box-shadow:0 10px 20px rgba(2,6,23,.4);
  animation:float 2.6s infinite;
}
.label{
  color:#cfeefd;font-family:Inter, ui-sans-serif, system-ui, -apple-system;
}
@keyframes float{
  0%{ transform: translateY(0); }
  50%{ transform: translateY(-10px); }
  100%{ transform: translateY(0); }
}`;

const SAMPLE_JS = `// JS (optional)
document.querySelectorAll('.dot').forEach(el => {
  el.addEventListener('click', () => {
    el.style.transform = 'scale(0.95)';
    setTimeout(()=> el.style.transform = '', 180);
  });
});`;

/* copy helper */
async function copyToClipboard(text) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

export default function DocsShell() {
  const [html, setHtml] = useState(SAMPLE_HTML);
  const [css, setCss] = useState(SAMPLE_CSS);
  const [js, setJs] = useState(SAMPLE_JS);
  const [activeSection, setActiveSection] = useState("overview");
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewVisible, setPreviewVisible] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const full = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>
      try { ${js} } catch(e){console.error(e)}
    </script>
  </body>
</html>`;
    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [html, css, js]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const navItems = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "getting-started", label: "Getting started" },
      { id: "html", label: "HTML" },
      { id: "css", label: "CSS" },
      { id: "js", label: "JavaScript" },
      { id: "examples", label: "Examples" },
    ],
    []
  );

  const handleCopy = async (text, label = "Code") => {
    const ok = await copyToClipboard(text);
    setToast(ok ? `${label} copied` : `Could not copy ${label}`);
  };

  const CodeBlock = ({ title, value, onChange }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-slate-100">{title}</div>
        <button
          onClick={() => handleCopy(value, title)}
          className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded text-white"
        >
          Copy
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-h-[140px] bg-[#071221] border border-white/6 text-slate-100 p-3 rounded font-mono text-sm resize-vertical focus:outline-none focus:ring-2 focus:ring-sky-500"
      />
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-[#06131a] via-[#071420] to-[#040812] text-slate-100 antialiased">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="p-5 mb-8">
          {/* right column */}
          <aside className="col-span-12 md:col-span-3 lg:col-span-3">
            <div className="sticky top-6 space-y-4">
              <div className="p-4 bg-[#071428] border border-white/6 rounded-lg">
                <div className="font-semibold text-sky-200 text-2xl mb-2">Resources</div>
                <ul className="text-sm text-slate-300 mt-5 space-y-2">
                  <li>
                    <a
                      className="text-sky-300 hover:underline"
                      href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                      target="_blank"
                      rel="noreferrer"
                    >
                      MDN — CSS
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sky-300 hover:underline"
                      href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                      target="_blank"
                      rel="noreferrer"
                    >
                      MDN — HTML
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-sky-300 hover:underline"
                      href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                      target="_blank"
                      rel="noreferrer"
                    >
                      MDN — JS
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
