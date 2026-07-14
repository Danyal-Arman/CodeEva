import React, { useRef, useEffect, lazy, Suspense } from "react";
import { useEditorTheme } from "../context/EditorThemeContext";
import useCollaborativeCode from "../utils/collaborativeCode";
import TerminalPanel from "./TerminalPanel";
import { cursorStyle } from "../utils/userCursors";
import { useParams } from "react-router-dom";
import { generateUserColor } from "../utils/generateUserColor";
import { MonacoBinding } from "y-monaco";
import { initializeAwareness } from "../services/yjs/awareness";
import * as Y from "yjs";

const Editor = lazy(() => import("@monaco-editor/react"));

import { useYjsEditor } from "../hooks/useYjsEditor";

const CodeEditor = ({
  currentLanguage,
  roomId,
  userId,
  username,
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
  const { editorTheme } = useEditorTheme();
  const { fileId } = useParams();

  const isRemoteUpdate = useRef(false);
  const bindingRef = useRef(null);
  const userColor = useRef({});
  const userDecorations = useRef({});
  const awarenessListener = useRef(null);
  const cursorTimeout = useRef({});
  const lastcursorPosition = useRef({});
  const localCursor = useRef({});

  const { provider, ydoc, ytext } = useYjsEditor(roomId);

  useEffect(() => {
    if (!provider) return;
    initializeAwareness(provider, username, userId);
  }, [provider, username, userId]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    onEditorReady?.();

    bindingRef.current = new MonacoBinding(
      ytext,
      editor.getModel(),
      new Set([editor]),
      provider.awareness,
    );

    editor.onDidChangeCursorPosition((e) => {
      const model = editor.getModel();

      const index = model.getOffsetAt({
        lineNumber: e.position.lineNumber,
        column: e.position.column,
      });

      console.log("Sending index:", index);
      const relativePosition = Y.createRelativePositionFromTypeIndex(
        ytext,
        index,
      );

      provider.awareness.setLocalStateField("cursor", relativePosition);
    });

    const clearRemoteCursor = (clientId) => {
      if (cursorTimeout.current[clientId]) {
        clearTimeout(cursorTimeout.current[clientId]);
        delete cursorTimeout.current[clientId];
      }

      if (userDecorations.current[clientId]) {
        editor.deltaDecorations([userDecorations.current[clientId]], []);
        delete userDecorations.current[clientId];
      }
    };

    const handleAwarenessUpdate = ({ added, updated, removed } = {}) => {
      const states = Array.from(provider.awareness.getStates().entries());
      const model = editor.getModel();
      if (!model) return;

      removed?.forEach((clientId) => {
        clearRemoteCursor(clientId);
      });

      states.forEach(([clientId, state]) => {
        // console.log(provider.awareness.clientID === clientId)
        if (clientId === provider.awareness.clientID) return;
        if (!state?.user) {
          clearRemoteCursor(clientId);
          return;
        }

        if (!state?.cursor) {
          clearRemoteCursor(clientId);
          return;
        }

        const absolutePos = Y.createAbsolutePositionFromRelativePosition(
          state.cursor,
          ydoc,
        );
        
        if (!absolutePos || absolutePos.index == null) {
          clearRemoteCursor(clientId);
          return;
        }

        console.log(
          "Rendering remote cursor:",
          state.user.name,
          absolutePos.index,
        );

        const currentIndex = absolutePos.index;
        console.log(
  "Decoration exists:",
  !!userDecorations.current[clientId]
);

console.log(
  "Last index:",
  lastcursorPosition.current[clientId]
);

console.log(
  "Remote index:",
  currentIndex
);
        if (lastcursorPosition.current[clientId] === currentIndex) {
          console.log(
  "SKIPPING SAME POSITION",
  clientId,
  currentIndex
);
          return;
        }

        lastcursorPosition.current[clientId] = currentIndex;

        const remoteCursorIndex = absolutePos.index;
        const localCursorIndex = model.getOffsetAt(editor.getPosition());
        // console.log("remoteCursorIndex",remoteCursorIndex)
        // console.log("localCursorIndex", localCursorIndex)

        // if (remoteCursorIndex === localCursorIndex) {
        //   clearRemoteCursor(clientId);
        //   return;
        // }
        const monacoPosition = model.getPositionAt(absolutePos.index);
        if (!monacoPosition) {
          clearRemoteCursor(clientId);
          return;
        }

        const remoteUsername = state.user.name || `user-${clientId}`;
        const safeUsername = remoteUsername.replace(/\s+/g, "-");
        const color = state.user.color || "#ff0000";

        if (!userColor.current[remoteUsername]) {
          userColor.current[remoteUsername] = color;
        }

        cursorStyle(safeUsername, userColor.current[remoteUsername]);

        const range = new monaco.Range(
          monacoPosition.lineNumber,
          monacoPosition.column,
          monacoPosition.lineNumber,
          monacoPosition.column,
        );

        const previousDecoration = userDecorations.current[clientId]
          ? [userDecorations.current[clientId]]
          : [];

          console.log("CREATING CURSOR", clientId);
          const newDecorationIds = editor.deltaDecorations(previousDecoration, [
          {
            range,
            options: {
              className: `remote-cursor-${safeUsername}`,
              stickiness:
                monaco.editor.TrackedRangeStickiness
                  .NeverGrowsWhenTypingAtEdges,
            },
          },
        ]);
        userDecorations.current[clientId] = newDecorationIds[0];

        if (cursorTimeout.current[clientId]) {
          clearTimeout(cursorTimeout.current[clientId]);
        }

        cursorTimeout.current[clientId] = setTimeout(() => {
            console.log("TIMED OUT", clientId);
            clearRemoteCursor(clientId);
        }, 5000);
      });
    };
    awarenessListener.current = handleAwarenessUpdate;
    provider.awareness.on("update", handleAwarenessUpdate);

    monaco.editor.defineTheme("vs-dark", {
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

    monaco.editor.setTheme("vs-dark");
  };

  const handleEditorChange = (editor) => {
    if (isRemoteUpdate.current) {
      isRemoteUpdate.current = false;
      return;
    }
  };

  useEffect(() => {
    return () => {
      if (awarenessListener.current && provider?.awareness) {
        provider.awareness.off("update", awarenessListener.current);
      }
      bindingRef.current?.destroy();
      provider?.destroy();
      ydoc?.destroy();
    };
  }, [provider, ydoc]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Editor
          height="100vh"
          language={currentLanguage}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          theme={editorTheme === "dark" ? "vs-dark" : "vs-light"}
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
