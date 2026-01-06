import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface GenMarkdownRendererProps {
  markdown: string;
}

marked.setOptions({
  gfm: true,
  breaks: true,
});

const GenMarkdownRenderer: React.FC<GenMarkdownRendererProps> = ({
  markdown,
}) => {
  const html = DOMPurify.sanitize(marked.parse(markdown, { async: false }));

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default GenMarkdownRenderer;
