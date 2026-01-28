import React, { useEffect, useState } from "react";

export default function CodeViewer({ card }) {
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState("preview");
  const [src, setSrc] = useState("");
  const [previewLoaded, setPreviewLoaded] = useState(false);

  // Simple formatters for HTML/CSS/JS to produce readable output
  const formatHTML = (raw = "") => {
    const s = raw.replace(/>\s*</g, ">" + "\n" + "<").trim();
    const lines = s
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const out = [];
    let indent = 0;
    lines.forEach((line) => {
      if (/^<\/.+>/.test(line)) {
        indent = Math.max(indent - 1, 0);
      }
      out.push("  ".repeat(indent) + line);
      const isOpening =
        /^<[^/!][^>]*>$/.test(line) &&
        !/\/>$/.test(line) &&
        !/^<.+>.*<.+>$/.test(line);
      if (isOpening) indent++;
    });
    return out.join("\n");
  };

  const formatCSS = (raw = "") => {
    let s = raw
      .replace(/\s*{\s*/g, " {\n  ")
      .replace(/;\s*/g, ";\n  ")
      .replace(/\s*}\s*/g, "\n}\n");
    const lines = s.split("\n").map((l) => l.replace(/^\s+|\s+$/g, ""));
    let out = "";
    let indent = 0;
    lines.forEach((line) => {
      if (!line) return;
      if (line.endsWith("}")) {
        indent = Math.max(indent - 1, 0);
        out += "  ".repeat(indent) + line + "\n";
      } else if (line.endsWith("{")) {
        out += "  ".repeat(indent) + line + "\n";
        indent++;
      } else {
        out += "  ".repeat(indent) + line + "\n";
      }
    });
    return out.trimRight();
  };

  const formatJS = (raw = "") => {
    // basic line breaks for semicolons and braces
    let s = raw
      .replace(/;\s*/g, ";\n")
      .replace(/\{\s*/g, "{\n")
      .replace(/\s*}\s*/g, "\n}\n");
    const lines = s
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    const out = [];
    let indent = 0;
    lines.forEach((line) => {
      if (line.endsWith("}")) {
        indent = Math.max(indent - 1, 0);
      }
      out.push("  ".repeat(indent) + line);
      if (line.endsWith("{")) indent++;
    });
    return out.join("\n");
  };

  useEffect(() => {
    setTab("preview");
    setPreviewLoaded(false);
  }, [card]);

  useEffect(() => {
    if (!card) {
      setSrc("");
      return;
    }

    const html = card.html ?? "<div></div>";
    const css = card.css ? `<style>${card.css}</style>` : "";
    const js = card.js
      ? `<script>window.addEventListener('DOMContentLoaded',()=>{${card.js}})</script>`
      : "";

    const full = `<!doctype html><html><head><meta charset="utf-8">${css}<meta name="viewport" content="width=device-width,initial-scale=1"></head><body class="p-4">${html}${js}</body></html>`;

    const blob = new Blob([full], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setSrc(url);

    return () => {
      URL.revokeObjectURL(url);
      setSrc("");
    };
  }, [card]);

  if (!card) {
    return (
      <div className="flex items-center justify-center bg-white/3 rounded-lg p-6">
        <p className="text-white/70">Select a card to view code</p>
      </div>
    );
  }

  const copy = async () => {
    try {
      const indent = (txt, spaces = 4) =>
        txt
          .split("\n")
          .map((l) => (l.trim() ? " ".repeat(spaces) + l : l))
          .join("\n");

      const hasParts = card.html || card.css || card.js;

      const buildFull = () => {
        const htmlPart = (card.html ?? "").trim();
        const cssPart = (card.css ?? "").trim();
        const jsPart = (card.js ?? "").trim();

        let out =
          '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width,initial-scale=1">\n';
        if (cssPart) {
          out += "    <style>\n" + indent(cssPart, 6) + "\n    </style>\n";
        }
        out += "  </head>\n  <body>\n";
        if (htmlPart) {
          out += indent(htmlPart, 4) + "\n";
        }
        if (jsPart) {
          out += "    <script>\n" + indent(jsPart, 6) + "\n    </script>\n";
        }
        out += "  </body>\n</html>";
        return out;
      };

      const text = hasParts ? buildFull() : card.code ?? "";
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("copy failed", e);
    }
  };

  // prepare pretty code for display in Code tab
  const prettyCode = () => {
    if (card.html || card.css || card.js) {
      const html = card.html ? formatHTML(card.html) : "";
      const css = card.css ? formatCSS(card.css) : "";
      const js = card.js ? formatJS(card.js) : "";

      let out =
        '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width,initial-scale=1">\n';
      if (css)
        out +=
          "    <style>\n" +
          css
            .split("\n")
            .map((l) => "      " + l)
            .join("\n") +
          "\n    </style>\n";
      out += "  </head>\n  <body>\n";
      if (html)
        out +=
          html
            .split("\n")
            .map((l) => "    " + l)
            .join("\n") + "\n";
      if (js)
        out +=
          "    <script>\n" +
          js
            .split("\n")
            .map((l) => "      " + l)
            .join("\n") +
          "\n    </script>\n";
      out += "  </body>\n</html>";
      return out;
    }

    return card.code ?? "";
  };

  return (
    <div className="bg-slate-900 text-slate-100 rounded-lg p-4 h-full flex flex-col cv-fade">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold">{card.title}</h3>
          <small className="text-slate-400">
            {card.language ?? "Animation"}
          </small>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-md bg-white/3 p-1">
            <button
              onClick={() => setTab("preview")}
              className={`px-3 py-1 text-sm rounded ${
                tab === "preview"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-200/80 hover:bg-white/5 bg-gray-800"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setTab("code")}
              className={`ml-3 px-3 py-1 text-sm rounded ${
                tab === "code"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-200/80 hover:bg-white/5 bg-gray-800"
              }`}
            >
              Code
            </button>
          </div>
          <button
            onClick={copy}
            className={`px-3 py-1 bg-white/6 bg-gray-800 hover:bg-white/8 text-sm rounded ${
              copied ? "copy-anim" : ""
            }`}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex-1 rounded-md p-2 flex flex-col cv-fade-in">
        {tab === "preview" ? (
          <div
            className={`h-full bg-white rounded-md overflow-hidden iframe-wrap ${
              previewLoaded ? "loaded" : "loading"
            } cv-slide`}
          >
            <iframe
              title={card.id}
              src={src}
              className="w-full h-72 md:h-96 border-0"
              sandbox="allow-scripts"
              onLoad={() => setPreviewLoaded(true)}
            />
          </div>
        ) : (
          <div
            className={`terminal bg-slate-900 rounded-lg overflow-hidden ${
              tab === "code" ? "terminal-glow" : ""
            }`}
          >
            <div className="terminal-header bg-slate-800/60 px-3 py-2 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-inner"></span>
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-inner"></span>
              <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-inner"></span>
              <div className="ml-3 text-xs text-slate-400">Code</div>
            </div>
            <pre className="p-4 overflow-auto text-sm text-slate-100 text-left font-mono code-flicker">
              <code className="whitespace-pre">{prettyCode()}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
