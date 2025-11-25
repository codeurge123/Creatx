import React, { useEffect, useState } from "react";

const LOCAL_KEY = "creatx_user_snippets";
const SHARED_KEY = "creatx_shared_snippets";
const CREATE_LOG = "creatx_create_log";
const MAX_PER_DAY = 10;

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}

function readShared() {
  try {
    return JSON.parse(localStorage.getItem(SHARED_KEY) || "[]");
  } catch {
    return [];
  }
}

function readCreateLog() {
  try {
    return JSON.parse(localStorage.getItem(CREATE_LOG) || "[]");
  } catch {
    return [];
  }
}

function pushCreateLog(ts) {
  try {
    const arr = readCreateLog();
    arr.unshift(ts);
    localStorage.setItem(CREATE_LOG, JSON.stringify(arr));
  } catch {}
}

export default function Create() {
  const [title, setTitle] = useState("My Animation");
  const [html, setHtml] = useState('<div class="demo"></div>');
  const [css, setCss] = useState(
    ".demo{width:60px;height:60px;background:#06b6d4;border-radius:8px;animation:float 3s infinite}"
  );
  const [js, setJs] = useState("");
  const [share, setShare] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // terminal active tab: "html" | "css" | "js"
  const [activeTab, setActiveTab] = useState("html");

  // AI modal states
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiTarget, setAiTarget] = useState("full"); // "html","css","js","full"
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [aiError, setAiError] = useState("");
  const [parsedResult, setParsedResult] = useState(null); // {html,css,js} formatted or null

  useEffect(() => {
    setSaved(false);
    setError("");
  }, [title, html, css, js, share]);

  // build preview blob
  useEffect(() => {
    const full = `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}<script>try{${js}}catch(e){console.error(e)}</script></body></html>`;
    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [html, css, js]);

  const countLast24h = () => {
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    const arr = readCreateLog().filter((ts) => ts >= dayAgo);
    return arr.length;
  };

  const addSnippet = () => {
    const now = Date.now();
    const used = countLast24h();
    if (used >= MAX_PER_DAY) {
      setError("Token exceed — try after 24 hours");
      return;
    }

    const code = `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}\n\n/* JS */\n${js}`;
    const id = `user-${Date.now()}`;
    const item = { id, title, code };
    const local = readLocal();
    local.unshift(item);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
    if (share) {
      const s = readShared();
      s.unshift(item);
      localStorage.setItem(SHARED_KEY, JSON.stringify(s));
    }
    // record creation
    pushCreateLog(now);
    // notify other components
    window.dispatchEvent(new Event("creatx:snippets-changed"));
    setSaved(true);
  };

  const deleteOwn = (id) => {
    const local = readLocal().filter((s) => s.id !== id);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
    const shared = readShared().filter((s) => s.id !== id);
    localStorage.setItem(SHARED_KEY, JSON.stringify(shared));
    window.dispatchEvent(new Event("creatx:snippets-changed"));
  };

  useEffect(() => {
    let timer;

    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 10000); // 10 seconds
    }

    if (saved) {
      timer = setTimeout(() => {
        setSaved(false);
      }, 10000); // 10 seconds
    }

    return () => clearTimeout(timer);
  }, [error, saved]);

  //
  // ---------------- formatting helpers ----------------
  //

  function formatHtml(src) {
    try {
      const withoutExtra = src.replace(/>\s+</g, ">\n<").trim();
      const lines = withoutExtra.split("\n");
      let depth = 0;
      const out = lines.map((line) => {
        const trimmed = line.trim();
        if (/^<\/\w/.test(trimmed)) depth = Math.max(depth - 1, 0);
        const pad = "  ".repeat(depth);
        const res = pad + trimmed;
        // increase depth for opening tags that are not self-closing or void
        if (/^<\w[^>]*>(?!.*<\/\w)/.test(trimmed) && !/\/>$/.test(trimmed) && !/^<!(--)?/.test(trimmed)) {
          if (!/\/>$/i.test(trimmed) && !/^<\/\w/.test(trimmed)) depth++;
        } else if (/^<\w[^>]*[^\/]>$/.test(trimmed) && !/^<!(--)?/.test(trimmed)) {
          if (!/^<\/\w/.test(trimmed) && !/\/>$/.test(trimmed)) depth++;
        }
        return res;
      });
      return out.join("\n");
    } catch {
      return src;
    }
  }

  function formatCss(src) {
    try {
      const blocks = src.split("}").map((b) => b.trim()).filter(Boolean);
      const out = blocks.map((blk) => {
        const parts = blk.split("{");
        if (parts.length < 2) return parts[0].trim() + "}";
        const selector = parts[0].trim();
        const body = parts.slice(1).join("{").trim();
        const props = body.replace(/\s*;\s*/g, ";\n  ").replace(/\n\s*;+/g, ";\n  ").trim();
        const cleaned = props.replace(/;\s*$/, "");
        return `${selector} {\n  ${cleaned.replace(/\n{2,}/g, "\n")};\n}`;
      });
      return out.join("\n\n");
    } catch {
      return src;
    }
  }

  function formatJs(src) {
    try {
      const withLines = src.replace(/;\s*/g, ";\n").replace(/\{\s*/g, "{\n").replace(/\}\s*/g, "}\n");
      const lines = withLines.split("\n").map(l => l.replace(/\s+$/,''));
      let depth = 0;
      const out = lines.map((l) => {
        const t = l.trim();
        if (t.startsWith("}")) depth = Math.max(depth - 1, 0);
        const pad = "  ".repeat(depth);
        const res = pad + t;
        if (t.endsWith("{")) depth++;
        return res;
      }).filter(Boolean);
      return out.join("\n");
    } catch {
      return src;
    }
  }

  //
  // ---------------- AI helpers ----------------
  //

  function parseGenerated(generated) {
    const out = { html: "", css: "", js: "" };

    // markers
    const markerHtml = /<!--\s*HTML\s*-->([\s\S]*?)?(?=(\/\*|\<!--|$))/i;
    const markerCss = /\/\*\s*CSS\s*\*\/([\s\S]*?)(?=(\/\*|\<!--|$))/i;
    const markerJs = /\/\*\s*JS\s*\*\/([\s\S]*?)(?=(\/\*|\<!--|$))/i;

    const mHtml = generated.match(markerHtml);
    const mCss = generated.match(markerCss);
    const mJs = generated.match(markerJs);

    if (mHtml || mCss || mJs) {
      out.html = mHtml ? mHtml[1].trim() : "";
      out.css = mCss ? mCss[1].trim() : "";
      out.js = mJs ? mJs[1].trim() : "";
      return out;
    }

    // fenced code blocks
    const fenceHtml = /```html\s*([\s\S]*?)```/i;
    const fenceCss = /```css\s*([\s\S]*?)```/i;
    const fenceJs = /```(?:js|javascript)\s*([\s\S]*?)```/i;
    const fHtml = generated.match(fenceHtml);
    const fCss = generated.match(fenceCss);
    const fJs = generated.match(fenceJs);
    if (fHtml || fCss || fJs) {
      out.html = fHtml ? fHtml[1].trim() : "";
      out.css = fCss ? fCss[1].trim() : "";
      out.js = fJs ? fJs[1].trim() : "";
      return out;
    }

    return null;
  }

  async function callAiApi(prompt) {
    try {
      const resp = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!resp.ok) {
        const txt = await resp.text().catch(() => "");
        throw new Error(txt || `AI endpoint responded ${resp.status}`);
      }
      const text = await resp.text();
      return text;
    } catch (e) {
      console.warn("AI fetch failed, falling back to simulator:", e);
      return simulateAiGeneration(prompt);
    }
  }

  function simulateAiGeneration(prompt) {
    const safePrompt = (prompt || "animation").slice(0, 200);
    return `<!-- HTML -->
<!-- Generated animation for: ${safePrompt} -->
<div class="ai-card">
  <div class="ai-dot"></div>
  <div class="ai-text">` + safePrompt + `</div>
</div>

/* CSS */
.ai-card{display:flex;align-items:center;gap:12px;padding:14px;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,.6);background:linear-gradient(135deg,#0ea5a4,#60a5fa);color:white}
.ai-dot{width:18px;height:18px;border-radius:50%;background:#fff;opacity:.9;animation:ai-bounce 1.6s infinite}
.ai-text{font-family:ui-monospace,monospace;font-size:14px}
@keyframes ai-bounce{0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}}

/* JS */
console.log("AI generated animation for:", ${JSON.stringify(safePrompt)});
`;
  }

  // IMPORTANT: Generate only fetches and sets preview + parsedResult.
  // It DOES NOT insert anything automatically into editors.
  async function handleGenerateFromAi() {
    if (!aiPrompt.trim()) {
      setAiError("Please enter a prompt.");
      return;
    }
    setAiLoading(true);
    setAiError("");
    setAiResult("");
    setParsedResult(null);

    try {
      const finalPrompt =
        `Generate a small web animation snippet (HTML, CSS and optional JS). ` +
        `Return plain text containing three sections marked with: <!-- HTML -->, /* CSS */ and /* JS */. ` +
        `User prompt: ${aiPrompt}`;

      const generated = await callAiApi(finalPrompt);
      setAiResult(generated || "");

      // parse and format in proper order HTML -> CSS -> JS
      const parsed = parseGenerated(generated || "");
      if (parsed) {
        const formatted = {
          html: parsed.html ? formatHtml(parsed.html) : "",
          css: parsed.css ? formatCss(parsed.css) : "",
          js: parsed.js ? formatJs(parsed.js) : "",
        };
        setParsedResult(formatted);
      } else {
        setParsedResult(null);
      }
    } catch (e) {
      console.error(e);
      setAiError("AI generation failed. See console for details.");
    } finally {
      // leave spinner visible briefly for smoothness
      setTimeout(() => setAiLoading(false), 300);
    }
  }

  // apply helpers: use parsedResult if available; otherwise paste raw as wrapped comment
  function applyHtml() {
    if (parsedResult && parsedResult.html) {
      setHtml(parsedResult.html);
    } else {
      setHtml((prev) => prev + `\n<!-- AI RAW START (HTML) -->\n${aiResult}\n<!-- AI RAW END -->`);
    }
  }
  function applyCss() {
    if (parsedResult && parsedResult.css) {
      setCss(parsedResult.css);
    } else {
      setCss((prev) => prev + `\n/* AI RAW START (CSS) */\n${aiResult}\n/* AI RAW END */`);
    }
  }
  function applyJs() {
    if (parsedResult && parsedResult.js) {
      setJs(parsedResult.js);
    } else {
      setJs((prev) => prev + `\n// AI RAW START (JS)\n${aiResult}\n// AI RAW END`);
    }
  }

  // insert all parsed blocks (keeps modal open behaviour same as before)
  function insertParsedBlocks() {
    if (!parsedResult) {
      setAiError("Result couldn't be parsed into separate blocks.");
      return;
    }
    // Insert in strict order: html, css, js
    if (parsedResult.html) setHtml(parsedResult.html);
    if (parsedResult.css) setCss(parsedResult.css);
    if (parsedResult.js) setJs(parsedResult.js);
    setAiOpen(false);
  }

  // save snippet from aiResult
  function saveAiSnippet() {
    try {
      const now = Date.now();
      const id = `ai-${Date.now()}`;
      const code = aiResult || `<!-- AI output -->\n${aiPrompt}`;
      const item = { id, title: `AI: ${title}`, code };
      const local = readLocal();
      local.unshift(item);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(local));
      pushCreateLog(now);
      window.dispatchEvent(new Event("creatx:snippets-changed"));
      setSaved(true);
    } catch (e) {
      setAiError("Could not save snippet.");
    }
  }

  // Format current active editor (keeps simple formatters)
  function formatActive() {
    if (activeTab === "html") setHtml((s) => formatHtml(s));
    if (activeTab === "css") setCss((s) => formatCss(s));
    if (activeTab === "js") setJs((s) => formatJs(s));
  }

  //
  // -------------- UI ----------------
  //
  return (
    <section className="min-h-[70vh]">
      <div className="max-w-6xl mx-auto bg-white/3 p-6 rounded-lg">
        <div className="flex border shadow-sm shadow-gray-800 border-gray-800 p-4 rounded-xl justify-between mb-4">
          <div className="">
            <h2 className="text-xl text-left font-semibold">Create Animation</h2>
            <div className="text-sm text-white/70">
              Compose HTML, CSS and JS — preview live on the right.
            </div>
          </div>
          <div className="text-sm text-right text-white/60">
            <p>Limit: {MAX_PER_DAY} per 24 hours</p>
            Created: {countLast24h()} / {MAX_PER_DAY} (24h)
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Terminal-style editor column (tabbed) */}
          <div>
            <div className="mb-3">
              <label className="text-md text-white/80">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 p-2 rounded-lg bg-white/5 text-white"
              />
            </div>

            <div className="bg-black/80 rounded-lg overflow-hidden border border-white/6">
              <div className="flex items-center gap-2 px-3 py-2 bg-black/90 border-b border-white/6">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                {/* tab buttons — now switch activeTab */}
                <div className="ml-3 text-xs text-white/70 flex gap-2">
                  <button
                    onClick={() => setActiveTab("html")}
                    className={`text-xs px-2 py-1 rounded ${activeTab === "html" ? "bg-white/6 text-white" : "bg-white/4 text-white/60"}`}
                    title="Show HTML editor"
                  >
                    HTML
                  </button>
                  <button
                    onClick={() => setActiveTab("css")}
                    className={`text-xs px-2 py-1 rounded ${activeTab === "css" ? "bg-white/6 text-white" : "bg-white/4 text-white/60"}`}
                    title="Show CSS editor"
                  >
                    CSS
                  </button>
                  <button
                    onClick={() => setActiveTab("js")}
                    className={`text-xs px-2 py-1 rounded ${activeTab === "js" ? "bg-white/6 text-white" : "bg-white/4 text-white/60"}`}
                    title="Show JS editor"
                  >
                    JS
                  </button>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <button onClick={formatActive} title="Format current editor" className="px-3 py-1 rounded bg-white/6 text-xs">Format</button>
                  <button
                    onClick={() => {
                      setAiOpen(true);
                      setAiPrompt("");
                      setAiResult("");
                      setAiError("");
                      setParsedResult(null);
                    }}
                    className="px-3 py-1 rounded bg-emerald-600 text-white text-sm"
                    title="Open AI Assistant"
                  >
                    AI Assist
                  </button>
                </div>
              </div>

              <div className="p-3">
                <div
                  className="bg-black p-2 rounded text-[13px] font-mono text-white/80"
                  style={{ minHeight: "320px" }}
                >
                  <div className="text-[12px] text-white/60 mb-2">user@creatx:~$ editing — showing {activeTab.toUpperCase()}</div>

                  {/* show only the active editor */}
                  {activeTab === "html" && (
                    <div className="mb-2">
                      <div className="text-md text-left text-white/60">HTML</div>
                      <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        rows={21}
                        className="w-full mt-1 p-2 rounded bg-black text-white font-mono"
                      />
                    </div>
                  )}

                  {activeTab === "css" && (
                    <div className="mb-2">
                      <div className="text-md text-left text-white/60">CSS</div>
                      <textarea
                        value={css}
                        onChange={(e) => setCss(e.target.value)}
                        rows={21}
                        className="w-full mt-1 p-2 rounded bg-black text-white font-mono"
                      />
                    </div>
                  )}

                  {activeTab === "js" && (
                    <div>
                      <div className="text-md text-left text-white/60">JavaScript</div>
                      <textarea
                        value={js}
                        onChange={(e) => setJs(e.target.value)}
                        rows={21}
                        className="w-full mt-1 p-2 rounded bg-black text-white font-mono"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={share}
                  onChange={(e) => setShare(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-xs text-white/80">Share with others</span>
              </label>

              <button onClick={addSnippet} className="px-4 py-2 rounded bg-indigo-600">
                Save
              </button>

              <button
                onClick={() => {
                  setTitle("My Animation");
                  setHtml('<div class="demo"></div>');
                  setCss(".demo{width:60px;height:60px;background:#06b6d4}");
                  setJs("");
                  setShare(false);
                  setSaved(false);
                  setError("");
                }}
                className="px-3 py-2 rounded bg-white/4"
              >
                Reset
              </button>
            </div>

            {error && (
              <div className="mt-3 text-sm text-left bg-red-700 duration-200 rounded-md p-2 text-white">
                {error}
              </div>
            )}
            {saved && (
              <div className="mt-3 w-full text-sm text-left bg-green-600 duration-200 text-white p-2 rounded-md">
                Saved — visible in Library. If shared, it will appear in Shared tab.
              </div>
            )}
          </div>

          {/* Preview column */}
          <div>
            <div className="mb-2 text-md text-white/70">Live preview</div>
            <div className="border border-white/6 rounded bg-black/40" style={{ height: 635 }}>
              {previewUrl ? (
                <iframe title="preview" src={previewUrl} className="w-full h-full" sandbox="allow-scripts allow-same-origin" />
              ) : (
                <div className="p-4 text-white/60">Preview not available</div>
              )}
            </div>
            <div className="mt-2 text-xs text-white/60">
              You have created {countLast24h()} / {MAX_PER_DAY} animations in the last 24 hours.
            </div>
          </div>
        </div>

        <hr className="my-4 border-white/6" />

        <h3 className="text-sm font-semibold mb-2">Your animations</h3>
        <div className="space-y-2">
          {readLocal().length === 0 && <div className="text-sm text-white/60">You have no saved animations yet.</div>}
          {readLocal().map((s) => (
            <div key={s.id} className="flex items-center justify-between bg-white/3 p-2 rounded">
              <div>
                <div className="font-medium">{s.title}</div>
                <div className="text-xs text-white/60">{s.id}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => navigator.clipboard.writeText(s.code)} className="text-xs px-2 py-1 rounded bg-indigo-600">
                  Copy
                </button>
                <button onClick={() => deleteOwn(s.id)} className="text-xs px-2 py-1 rounded bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- AI Modal ---------- */}
      {aiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* backdrop - darker navy tint */}
          <div
            className="absolute inset-0"
            onClick={() => setAiOpen(false)}
            style={{ background: "rgba(2,6,23,0.7)" }}
          />

          {/* modal (animated scale+fade) - enlarged */}
          <div
            className="relative z-10 w-full max-w-5xl rounded-lg p-4"
            style={{
              background: "#041428", // deep navy
              boxShadow: "0 20px 50px rgba(2,6,23,0.8)",
              border: "1px solid rgba(255,255,255,0.04)",
              maxHeight: "88vh",
              overflow: "auto",
              animation: "popIn 220ms cubic-bezier(.2,.9,.2,1)",
            }}
          >
            <style>{`
              @keyframes popIn {
                0% { transform: scale(.96); opacity: 0 }
                100% { transform: scale(1); opacity: 1 }
              }
              @keyframes spinner {
                0% { transform: rotate(0deg) }
                100% { transform: rotate(360deg) }
              }
              .ai-spinner {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 3px solid rgba(255,255,255,0.12);
                border-top-color: rgba(255,255,255,0.9);
                animation: spinner 1s linear infinite;
              }
              .ai-dots > span {
                display:inline-block;
                width:6px;
                height:6px;
                margin-left:6px;
                background:rgba(255,255,255,0.9);
                border-radius:50%;
                animation: jump 1s infinite ease-in-out;
              }
              .ai-dots > span:nth-child(1){ animation-delay: 0s }
              .ai-dots > span:nth-child(2){ animation-delay: .12s }
              .ai-dots > span:nth-child(3){ animation-delay: .24s }
              @keyframes jump {
                0%{ transform: translateY(0) }
                50%{ transform: translateY(-6px) }
                100%{ transform: translateY(0) }
              }
            `}</style>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center">
                  <h4 className="text-lg font-semibold text-white">AI Assistant</h4>
                  <div className="ml-3 text-xs text-white/60">Generate HTML / CSS / JS</div>
                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={() => setAiOpen(false)}
                      title="Close"
                      className="text-white/60 hover:text-white bg-transparent rounded p-1"
                      style={{ fontSize: 18, lineHeight: "18px" }}
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <label className="text-sm block mt-3 text-white/80">Prompt</label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  rows={4}
                  className="w-full mt-1 p-3 rounded bg-black text-white font-mono"
                  placeholder="Describe the animation: e.g. 'a neon bouncing dot with trailing shadow and label' "
                  style={{ minHeight: 96 }}
                />

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-white/80">Insert target:</label>
                    <select value={aiTarget} onChange={(e) => setAiTarget(e.target.value)} className="bg-white/4 p-1 rounded text-white text-sm ml-2">
                      <option value="full">HTML + CSS + JS (all)</option>
                      <option value="html">HTML only</option>
                      <option value="css">CSS only</option>
                      <option value="js">JS only</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="ml-auto flex items-center gap-2">
                      <button
                        onClick={handleGenerateFromAi}
                        className="px-3 py-1 rounded bg-indigo-600 text-sm flex items-center gap-2 disabled:opacity-60"
                        disabled={aiLoading}
                      >
                        {aiLoading ? (
                          <>
                            <div className="ai-spinner" />
                            <div className="text-xs text-white/90">Generating</div>
                            <div className="ai-dots"><span></span><span></span><span></span></div>
                          </>
                        ) : (
                          "Generate"
                        )}
                      </button>

                    </div>
                  </div>
                </div>

                {aiError && <div className="mt-3 text-sm text-amber-400">{aiError}</div>}

                {/* result preview */}
                <div className="mt-4">
                  <div className="text-sm text-white/70 mb-2">AI result (preview)</div>
                  <div className="bg-black p-3 rounded font-mono text-sm text-white/80" style={{ minHeight: 200, maxHeight: 420, overflowY: "auto" }}>
                    {aiLoading ? (
                      <div className="flex items-center gap-3 text-white/60">
                        <div className="ai-spinner" />
                        <div>Generating…</div>
                      </div>
                    ) : aiResult ? (
                      <pre className="whitespace-pre-wrap text-[13px]">{aiResult}</pre>
                    ) : (
                      <div className="text-white/50">No result yet — enter a prompt and click Generate.</div>
                    )}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={insertParsedBlocks}
                      className="px-3 py-1 rounded bg-emerald-600 text-sm"
                      disabled={!parsedResult}
                      title="Insert all parsed blocks (HTML → CSS → JS)"
                    >
                      Insert parsed blocks (all)
                    </button>

                    <button
                      onClick={() => navigator.clipboard.writeText(aiResult || "")}
                      className="px-3 py-1 rounded bg-indigo-600 text-sm"
                      disabled={!aiResult}
                    >
                      Copy raw
                    </button>

                    <button
                      onClick={saveAiSnippet}
                      className="px-3 py-1 rounded bg-sky-600 text-sm"
                      disabled={!aiResult}
                    >
                      Save as snippet
                    </button>

                    <button
                      onClick={applyHtml}
                      className="px-3 py-1 rounded bg-violet-600 text-sm"
                      disabled={!aiResult}
                    >
                      Apply HTML
                    </button>
                    <button
                      onClick={applyCss}
                      className="px-3 py-1 rounded bg-rose-600 text-sm"
                      disabled={!aiResult}
                    >
                      Apply CSS
                    </button>
                    <button
                      onClick={applyJs}
                      className="px-3 py-1 rounded bg-yellow-600 text-sm"
                      disabled={!aiResult}
                    >
                      Apply JS
                    </button>
                  </div>

                  <div className="mt-3 text-xs text-white/60">
                    Note: Generate previews the AI output. Use the Apply buttons to copy specific parts into the corresponding editor sections.
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/60">Tip: For best parsing ask the AI to "return code with markers: HTML , /* CSS */, /* JS */".</div>
          </div>
        </div>
      )}
    </section>
  );
}
