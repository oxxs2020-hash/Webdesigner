const fs = require('fs');
const lines = fs.readFileSync('index_vanilla.html', 'utf8').split('\n');

const htmlBody = lines.slice(1759, 2014).join('\n')
  .replace(/class=/g, 'className=')
  .replace(/onclick="selectPill\(this\)"/g, 'data-onclick="selectPill"')
  .replace(/style="z-index: 1; position: relative;"/g, 'style={{ zIndex: 1, position: "relative" }}')
  .replace(/<br>/g, '<br />')
  .replace(/<hr>/g, '<hr />')
  .replace(/<img(.*?)>/g, (match) => {
    if (match.endsWith('/>')) return match;
    return match.substring(0, match.length - 1) + ' />';
  });

const jsScript = lines.slice(2016, 2702).join('\n')
  .replace(/function selectPill\(btn\)/g, 'window.selectPill = function(btn)')
  .replace(/function setLang\(lang, btn\)/g, 'window.setLang = function(lang, btn)');

const pageTsx = `"use client";

import { useEffect, useRef } from 'react';

export default function Home() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    // Polyfill for onclicks
    document.querySelectorAll('[data-onclick="selectPill"]').forEach(el => {
      el.addEventListener('click', function() {
        if (window.selectPill) window.selectPill(this);
      });
    });

    ${jsScript}
  }, []);

  return (
    <>
      ${htmlBody}
    </>
  );
}
`;

fs.writeFileSync('app/page.tsx', pageTsx);
console.log('Conversion complete!');
