import React, { useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import {
  X,
} from 'lucide-react';

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

export { CodeBlock, FullCodeModal };