import Editor from "@monaco-editor/react";

export default function CodeEditor({
    language,
    value,
    onChange,
    height = "420px",
}) {
    return (
        <Editor
            height={height}
            language={language}
            value={value}
            theme="vs-dark"
            onChange={(val) => onChange(val ?? "")}
            options={{
                fontSize: 13,
                fontFamily: "JetBrains Mono, monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "on",
                smoothScrolling: true,
                cursorBlinking: "smooth",
                cursorSmoothCaretAnimation: "on",
                automaticLayout: true,
                padding: { top: 12 },
            }}
        />
    );
}
