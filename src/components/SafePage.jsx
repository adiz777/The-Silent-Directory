export default function SafePage({ loading, emptyText, children }) {
  if (loading) {
    return (
      <div style={{ padding: 24, color: "#aaa" }}>
        Initializing directory systems…
      </div>
    );
  }

  if (!children) {
    return (
      <div style={{ padding: 24, color: "#777" }}>
        {emptyText || "No data available."}
      </div>
    );
  }

  return children;
}
