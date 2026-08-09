export default function TopBar({ theme, setTheme }) {
  return (
    <div className="topbar">
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}
