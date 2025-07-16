import "./App.css";
import MapComponent from "./components/MapComponent";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapComponent center={[51.505, -0.09]} zoom={13} />
    </div>
  );
}

export default App;
