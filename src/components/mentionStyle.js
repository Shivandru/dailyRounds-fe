const mentionStyle = {
  control: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "0.5rem",
    color: "#ffffff",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    resize: "none",
    width: "100%",
  },
  highlighter: {
    overflow: "hidden",
    padding: "0.75rem 1rem",
  },
  input: {
    margin: 0,
    color: "#ffffff",
    outline: "none",
    padding: "0.75rem 1rem",
    minHeight: "4.5rem",
    boxSizing: "border-box",
    width: "100%",
  },
  suggestions: {
    list: {
      backgroundColor: "#1f1f1f",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "0.5rem",
      overflow: "hidden",
      color: "white",
      zIndex: 5,
    },
    item: {
      padding: "8px 12px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      cursor: "pointer",
      zIndex: 5,
    },
    itemFocused: {
      backgroundColor: "#6b21a8",
    },
  },
};
export default mentionStyle;
