import "./App.css";
import Navbar from "@/components/Navbar";
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
