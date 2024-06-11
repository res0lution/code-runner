import React, { useEffect, useRef } from "react";

import "./preview.css"

interface PreviewProps {
  code: string;
  err: string;
}

const html = `
  <html>
    <head>
      <style> html { background-color: #fff; }</style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (e) => {
          const root = document.querySelector('#root')
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + e + '</div>'
          console.error(e)
        }

        window.addEventListener('error', (e) => {
          e.preventDefault()
          handleError(e);
        }, false)

        window.addEventListener('message', (e) => {
          try {
            eval(e.data);
          } catch (e) {
            handleError(e);
          }
        }, false)
      </script>
    </body>
    <script></script>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, err }) => {
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

      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
