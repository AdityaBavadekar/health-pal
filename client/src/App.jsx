import "./App.css";
import Navbar from "./components/navbar";
import Dashboard from "./pages/dasboard";

function App() {
  return (
    <div className="flex">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
