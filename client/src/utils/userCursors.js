

export const cursorStyle = (username, color) => {
  const safeUsername = username.replace(/\s+/g, "-");

  const className = `remote-cursor-${safeUsername}`;
  if (document.querySelector(`style[data-user="${safeUsername}"]`)) return;

  const style = document.createElement("style");
  style.innerHTML = `
    .${className} {
      position: relative;
      margin: 1px
    }

    .${className}::before {
      content: '';
      position: absolute;
      width: 1px;

      height: 100%;
      background-color: ${color};
      z-index: 10;
    }

    .${className}::after {
      content: '${username}';
      position: absolute;
      top: -1.2em;
      left: 0;
      background: ${color};
      color: white;
      padding: 2px 6px;
      font-size: 10px;
      border-radius: 4px;
      white-space: nowrap;
      z-index: 11;
    }
  `;
  document.head.appendChild(style);
};
