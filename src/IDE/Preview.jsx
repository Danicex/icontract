import React, { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Code } from "lucide-react";
import "prismjs/themes/prism-tomorrow.css"; // Ensure theme is loaded
import "prismjs"; // Ensure PrismJS is imported globally
import "prismjs/components/prism-solidity"; // Load Solidity syntax highlighting

export default function Preview({ code }) {
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  return (
    <div className=" w-3/3 h-full border border-gray-700 bg-gray-900 p-3 overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <Code size={16} />
        <span className="text-sm font-medium text-white">Preview</span>
      </div>
      <Separator className="bg-gray-700 mb-2" />
      {code ? (
        <pre className="h-full w-full overflow-y-auto p-2 bg-gray-800 rounded-md">
          <code
            ref={codeRef}
            className="language-sol block whitespace-pre-wrap break-words text-white">
            {code}
          </code>
        </pre>
      ) : (
        <div className="text-xs text-red-400">
          Preview page to show
          <br />
          written code
        </div>
      )}
    </div>
  );
}
