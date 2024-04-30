import React, { useEffect, useRef } from "react";

import "./preview.css"

interface PreviewProps {
  code: string;
}

const html = `
  <html>
    <head>
      <style> html { background-color: #fff; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (e) => {
          try {
            eval(e.data);
          } catch (e) {
            const root = document.querySelector('#root')
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + e + '</div>'
            console.error(e)
          }
        }, false)
      </script>
    </body>
    <script></script>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50)
  }, [code]);

  return (
    <div className="preview">
      <iframe
      style={{ background: "white" }}
      ref={iframe}
      title="code preview"
      sandbox="allow-scripts"
      srcDoc={html}
    />
    </div>
  );
};

export default Preview;
