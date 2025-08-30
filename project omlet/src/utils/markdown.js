import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import React from "react";
export function MarkdownRender({ source }) {
return (
<div className="prose max-w-none">
<ReactMarkdown remarkPlugins={[remarkGfm]}
rehypePlugins={[rehypeSanitize]}>
{source || ""}
</ReactMarkdown>
</div>
);
}