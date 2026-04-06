import React, { useRef, useCallback, lazy, Suspense } from "react";
import { useTheme } from "../context/ThemeContext";
import useCollaborativeCode from "../utils/collaborativeCode";
import TerminalPanel from "./TerminalPanel";
import { cursorStyle } from "../utils/userCursors";
import { useParams } from "react-router-dom";
import { generateUserColor } from "../utils/generateUserColor";

const Editor = lazy(()=>import("@monaco-editor/react"));

const userColor = {};
const userDecorations = {};
const cursorTimeouts = {};
const CodeEditor = ({
  currentLanguage,
  roomId,
  userId,
  username,
  currentCode,
  setCurrentCode,
  output,
  isTerminalOpen,
  setIsTerminalOpen,
  onEditorReady,
  editorRef,
  isSidebarOpen,
  isFileSidebarOpen,
  isVersionSidebarOpen,
  rightWidth,
}) => {
  const { currentTheme } = useTheme();
  const { fileId } = useParams();

  const isRemoteUpdate = useRef(false);

  const getCurrentCode = useCallback(
    () => editorRef.current?.getValue() || "",
    [],
  );

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    onEditorReady?.();
    monaco.editor.defineTheme("vscode-dark-plus", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "569CD6" }, // let, const
        { token: "identifier", foreground: "9CDCFE" }, // console
        { token: "function", foreground: "DCDCAA" }, // log
        { token: "type.identifier", foreground: "4EC9B0" },
        { token: "string", foreground: "CE9178" },
        { token: "number", foreground: "B5CEA8" },
        { token: "comment", foreground: "6A9955" },
        { token: "delimiter", foreground: "D4D4D4" },
      ],
      colors: {},
    });

    monaco.editor.setTheme("vscode-dark-plus");
  };
  const localUsername = username;

  const { sendCodeUpdate } = useCollaborativeCode({
    roomId,
    username,
    fileId,
    editorRef,

    onIncomingCodeUpdate: ({
      newCode,
      position,
      username,
      fileId: incomingFileId,
    }) => {
      if (username === localUsername) return;
      if (incomingFileId !== fileId) return;
      console.log("Incoming update:", { username, position, incomingFileId });

      if (editorRef.current && editorRef.current.getValue() !== newCode) {
        const editor = editorRef.current;
        const model = editor.getModel();
        isRemoteUpdate.current = true;

        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: newCode,
            },
          ],
          () => null,
        );

        if (position) {
          if (!userColor[username]) {
            userColor[username] = generateUserColor(userId, "cursor");
          }

          const color = userColor[username];
          const safeUsername = username.replace(/\s+/g, "-");

          if (!document.querySelector(`style[data-user="${safeUsername}"]`)) {
            cursorStyle(safeUsername, color);
          }
          const decoration = {
            range: new monaco.Range(
              position.lineNumber,
              position.column,
              position.lineNumber,
              position.column,
            ),
            options: {
              className: `remote-cursor-${safeUsername}`,
              stickiness:
                monaco.editor.TrackedRangeStickiness
                  .NeverGrowsWhenTypingAtEdges,
            },
          };

          const decorationId = editor.deltaDecorations(
            userDecorations[safeUsername]
              ? [userDecorations[safeUsername]]
              : [],
            [decoration],
          )[0];

          userDecorations[safeUsername] = decorationId;

          if (cursorTimeouts[safeUsername]) {
            clearTimeout(cursorTimeouts[safeUsername]);
          }

          cursorTimeouts[safeUsername] = setTimeout(() => {
            if (editor && userDecorations[safeUsername]) {
              editor.deltaDecorations([userDecorations[safeUsername]], []);
              delete userDecorations[safeUsername];
              delete cursorTimeouts[safeUsername];
            }
          }, 5000);
        }
      }

      setCurrentCode(newCode);
    },

    getCurrentCode,
  });

  const handleEditorChange = (newCode) => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }
    setCurrentCode(newCode);
    sendCodeUpdate(newCode);
  };

  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <Editor
        height="100vh"
        language={currentLanguage}
        value={currentCode}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={currentTheme === "dark" ? "vs-dark" : "vs-light"}
        loading={<div>Loading...</div>}
        options={{
          padding: {
            top: 20,
          },
        }}
      />
    </Suspense>

      <TerminalPanel
        isTerminalOpen={isTerminalOpen}
        output={output}
        setIsTerminalOpen={setIsTerminalOpen}
        isSidebarOpen={isSidebarOpen}
        isFileSidebarOpen={isFileSidebarOpen}
        isVersionSidebarOpen={isVersionSidebarOpen}
        rightWidth={rightWidth}
      />
    </>
  );
};

export default CodeEditor;
