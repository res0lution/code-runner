import React, { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
  <html>
    <head></head>
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
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);

  return (
    <iframe
      ref={iframe}
      title="code preview"
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

export default Preview;
