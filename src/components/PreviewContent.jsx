import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import {
  Heart,
  X,
  Copy,
  Check,
  Edit,
  Maximize2
} from 'lucide-react';
function PreviewContent({ card }) {
  const previewRef = useRef(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Force complete remount when card changes
    setKey(prev => prev + 1);
  }, [card.id, card.css, card.html, card.js]);

  useEffect(() => {
    if (!previewRef.current) return;

    const container = previewRef.current;

    // Clear everything first
    container.innerHTML = '';

    // Create a new wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'animation-wrapper';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';

    // Inject CSS with unique scoping
    if (card.css) {
      const styleEl = document.createElement('style');
      styleEl.setAttribute('data-animation-style', key);

      // Scope CSS to this specific wrapper
      let scopedCss = card.css;

      // Remove any existing .preview-content wrappers from CSS
      scopedCss = scopedCss.replace(/\.preview-content\s*>\s*div\s*\{[^}]*\}/g, '');

      styleEl.textContent = scopedCss;
      wrapper.appendChild(styleEl);
    }

    // Inject HTML
    if (card.html) {
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = card.html;
      wrapper.appendChild(contentDiv);
    }

    // Append wrapper to container
    container.appendChild(wrapper);

    // CRITICAL: Force DOM reflow to restart animations
    void wrapper.offsetWidth;

    // Trigger animation restart by toggling display
    wrapper.style.display = 'none';
    requestAnimationFrame(() => {
      wrapper.style.display = 'flex';

      // Execute JavaScript after animations are ready
      if (card.js) {
        setTimeout(() => {
          try {
            const scopedScript = new Function(
              'container',
              `
                const document = {
                  querySelector: (s) => container.querySelector(s),
                  querySelectorAll: (s) => container.querySelectorAll(s),
                  getElementById: (id) => container.querySelector('#' + id)
                };
                ${card.js}
              `
            );
            scopedScript(wrapper);
          } catch (error) {
            console.error('JavaScript execution error:', error);
          }
        }, 50);
      }
    });

    // Cleanup function
    return () => {
      container.innerHTML = '';
    };
  }, [key, card]);

  return (
    <div
      ref={previewRef}
      key={key}
      className="preview-content w-full h-full"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px'
      }}
    />
  );
}

export { PreviewContent };