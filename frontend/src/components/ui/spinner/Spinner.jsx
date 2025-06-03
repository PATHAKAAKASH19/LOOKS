export default function Spinner({ height="80vh", width="100vw" }) {
  return (
    <div
      style={{
        height: `${height}`,
        width: `${width}`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      
      }}
    >
      <div className="spinner"></div>
    </div>
  );
}
