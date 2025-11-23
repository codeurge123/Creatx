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

  return (
    <section className="min-h-[70vh]">
      <div className="max-w-6xl mx-auto bg-white/3 p-6 rounded-lg">
        <div className="flex border shadow-sm shadow-gray-800 border-gray-800 p-4 rounded-xl justify-between mb-4">
          <div className=" ">
            <h2 className="text-xl text-left font-semibold">
              Create Animation
            </h2>
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
          {/* Terminal-style editor column */}
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
                <div className="ml-3 text-xs text-white/70">
                  Terminal — write HTML / CSS / JS
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => setHtml(html)}
                    className={`text-xs px-2 py-1 rounded ${
                      true ? "bg-white/5 text-white" : "bg-white/4"
                    }`}
                  >
                    HTML
                  </button>
                  <button
                    onClick={() => setCss(css)}
                    className={`text-xs px-2 py-1 rounded ${
                      true ? "bg-white/5 text-white" : "bg-white/4"
                    }`}
                  >
                    CSS
                  </button>
                  <button
                    onClick={() => setJs(js)}
                    className={`text-xs px-2 py-1 rounded ${
                      true ? "bg-white/5 text-white" : "bg-white/4"
                    }`}
                  >
                    JS
                  </button>
                </div>
              </div>

              <div className="p-3">
                <div
                  className="bg-black p-2 rounded text-[13px] font-mono text-white/80"
                  style={{ minHeight: "320px" }}
                >
                  <div className="text-[12px] text-white/60 mb-2">
                    user@creatx:~$ editing
                  </div>
                  <div className="mb-2">
                    <div className="text-md text-left text-white/60">HTML</div>
                    <textarea
                      value={html}
                      onChange={(e) => setHtml(e.target.value)}
                      rows={6}
                      className="w-full mt-1 p-2 rounded bg-black text-white font-mono"
                    />
                  </div>

                  <div className="mb-2">
                    <div className="text-md text-left text-white/60">CSS</div>
                    <textarea
                      value={css}
                      onChange={(e) => setCss(e.target.value)}
                      rows={6}
                      className="w-full mt-1 p-2 rounded bg-black text-white font-mono"
                    />
                  </div>

                  <div>
                    <div className="text-md text-left text-white/60">
                      JavaScript
                    </div>
                    <textarea
                      value={js}
                      onChange={(e) => setJs(e.target.value)}
                      rows={5}
                      className="w-full mt-1 p-2 rounded bg-black text-white font-mono"
                    />
                  </div>
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

              <button
                onClick={addSnippet}
                className="px-4 py-2 rounded bg-indigo-600"
              >
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
                Saved — visible in Library. If shared, it will appear in Shared
                tab.
              </div>
            )}
          </div>

          {/* Preview column */}
          <div>
            <div className="mb-2 text-md text-white/70">Live preview</div>
            <div
              className="border border-white/6 rounded bg-black/40"
              style={{ height: 635 }}
            >
              {previewUrl ? (
                <iframe
                  title="preview"
                  src={previewUrl}
                  className="w-full h-full"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="p-4 text-white/60">Preview not available</div>
              )}
            </div>
            <div className="mt-2 text-xs text-white/60">
              You have created {countLast24h()} / {MAX_PER_DAY} animations in
              the last 24 hours.
            </div>
          </div>
        </div>

        <hr className="my-4 border-white/6" />

        <h3 className="text-sm font-semibold mb-2">Your animations</h3>
        <div className="space-y-2">
          {readLocal().length === 0 && (
            <div className="text-sm text-white/60">
              You have no saved animations yet.
            </div>
          )}
          {readLocal().map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between bg-white/3 p-2 rounded"
            >
              <div>
                <div className="font-medium">{s.title}</div>
                <div className="text-xs text-white/60">{s.id}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(s.code)}
                  className="text-xs px-2 py-1 rounded bg-indigo-600"
                >
                  Copy
                </button>
                <button
                  onClick={() => deleteOwn(s.id)}
                  className="text-xs px-2 py-1 rounded bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
