import React, { useState, useEffect } from "react";
import {
  Heart,
  X,
  Copy,
  Check,
  Edit,
  Maximize2
} from 'lucide-react';
import { PreviewContent } from "./PreviewContent";
import { CodeBlock, FullCodeModal } from "./CodeBlock";
import { EditControlsModal } from "./AnimationCard";

function AnimationModal({ card, isFavorite, onToggleFavorite, onClose, onCopy, copied }) {
  const [showFullCode, setShowFullCode] = useState(false);
  const [showEditControls, setShowEditControls] = useState(false);
  const [modifiedCard, setModifiedCard] = useState(card);

  const applyModifications = (controls) => {
    const originalCss = card.css || '';
    let modifiedCss = originalCss;

    // Apply size transformation - wrap content with scale
    const sizeScale = controls.size / 100;
    const opacityValue = controls.opacity / 100;

    // Add wrapper transformation styles at the beginning
    const wrapperStyle = `
    .animation-wrapper > div:last-child {
      transform: scale(${sizeScale});
      opacity: ${opacityValue};
      transform-origin: center;
    }
  `;

    // Handle animation speed
    const speedMultiplier = 100 / controls.speed;

    // Replace all animation-duration values
    modifiedCss = modifiedCss.replace(
      /animation-duration:\s*([\d.]+)s/gi,
      (match, duration) => {
        const newDuration = (parseFloat(duration) * speedMultiplier).toFixed(2);
        return `animation-duration: ${newDuration}s`;
      }
    );

    // Replace animation shorthand
    modifiedCss = modifiedCss.replace(
      /animation:\s*([a-zA-Z0-9_-]+)\s+([\d.]+)s/gi,
      (match, name, duration) => {
        const newDuration = (parseFloat(duration) * speedMultiplier).toFixed(2);
        return `animation: ${name} ${newDuration}s`;
      }
    );

    // Replace transition durations
    modifiedCss = modifiedCss.replace(
      /transition(?:-duration)?:\s*([a-zA-Z-]*\s*)?([\d.]+)s/gi,
      (match, property, duration) => {
        const newDuration = (parseFloat(duration) * speedMultiplier).toFixed(2);
        return property
          ? `transition: ${property}${newDuration}s`
          : `transition-duration: ${newDuration}s`;
      }
    );

    // Combine styles
    const finalCss = wrapperStyle + '\n' + modifiedCss;

    // Create new card object with unique reference
    const newCard = {
      ...card,
      css: finalCss,
      html: card.html,
      js: card.js,
      // Add timestamp to force update
      _timestamp: Date.now()
    };

    setModifiedCard(newCard);
    setShowEditControls(false);
  };

  const formatCode = (code, type) => {
    if (!code) return '';

    if (type === 'html') {
      let indent = 0;
      const indentSize = 2;

      return code
        .replace(/>\s*</g, ">\n<")
        .split("\n")
        .map(line => {
          let trimmed = line.trim();
          if (/^<\/.+>/.test(trimmed)) {
            indent--;
          }
          const formatted =
            " ".repeat(Math.max(indent, 0) * indentSize) + trimmed;
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
    (modifiedCard.html ? formatCode(modifiedCard.html, 'html').split('\n').length : 0) +
    (modifiedCard.css ? formatCode(modifiedCard.css, 'css').split('\n').length : 0) +
    (modifiedCard.js ? formatCode(modifiedCard.js, 'js').split('\n').length : 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{modifiedCard.title}</h2>
              <p className="text-gray-400 mt-1">{modifiedCard.description}</p>
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
                {modifiedCard.html && (
                  <CodeBlock
                    code={formatCode(modifiedCard.html, 'html')}
                    language="HTML"
                    maxLines={totalLines > 15 ? 5 : null}
                  />
                )}

                {modifiedCard.css && (
                  <CodeBlock
                    code={formatCode(modifiedCard.css, 'css')}
                    language="CSS"
                    maxLines={totalLines > 15 ? 7 : null}
                  />
                )}

                {modifiedCard.js && (
                  <CodeBlock
                    code={formatCode(modifiedCard.js, 'js')}
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
                <button
                  onClick={() => setShowEditControls(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-all"
                >
                  <Edit size={18} />
                  Edit
                </button>
              </div>
            </div>

            {/* Preview Section - Right Side */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-300">Preview</h3>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-white/10 p-8 min-h-[500px] flex items-center justify-center shadow-xl sticky top-0">
                <PreviewContent
                  key={modifiedCard._timestamp || modifiedCard.id}
                  card={modifiedCard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Controls Modal */}
      {showEditControls && (
        <EditControlsModal
          card={card}
          onClose={() => setShowEditControls(false)}
          onApply={applyModifications}
        />
      )}

      {/* Full Code Modal */}
      {showFullCode && (
        <FullCodeModal
          card={modifiedCard}
          formatCode={formatCode}
          onClose={() => setShowFullCode(false)}
        />
      )}
    </>
  );
}

export { AnimationModal };