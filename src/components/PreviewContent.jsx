import React, { useMemo } from "react";

function PreviewContent({
  card,
  background = "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
  className = "",
}) {
  const previewDoc = useMemo(() => {
    const html = card?.html || "";
    const css = card?.css || "";
    const js = card?.js || "";
    const safeBackground = String(background).replace(/<\/style/gi, "<\\/style");

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body {
        margin: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: ${safeBackground};
      }

      body {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: system-ui, sans-serif;
        overflow: hidden;
      }

      .animation-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        box-sizing: border-box;
      }

      .animation-content {
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 100%;
        max-height: 100%;
      }

      ${css}
    </style>
  </head>
  <body>
    <div class="animation-wrapper">
      <div class="animation-content">${html}</div>
    </div>
    <script>
      try {
        ${js}
      } catch (error) {
        console.error("JavaScript execution error:", error);
      }
    </script>
  </body>
</html>`;
  }, [background, card]);

  return (
    <iframe
      key={`${card?._id || card?.id || "preview"}-${card?._timestamp || "base"}`}
      title={`${card?.title || "Animation"} preview`}
      srcDoc={previewDoc}
      sandbox="allow-scripts"
      className={`preview-content block h-full w-full overflow-hidden border-0 bg-transparent ${className}`}
    />
  );
}

export { PreviewContent };
