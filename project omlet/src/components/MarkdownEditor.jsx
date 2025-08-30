import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
export default function MarkdownEditor({ value, onChange }) {
return (
<div className="card">
<SimpleMDE value={value} onChange={onChange} options={{ spellChecker:
false, status: false }} />
</div>
);
}