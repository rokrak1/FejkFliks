import { Toaster } from "react-hot-toast";
import "./App.css";
import Routes from "./routes/routes";
import { useEffect } from "react";
import { useAuth } from "./store/AuthProvider";
import { useDataStore } from "./store/store";

function App() {
  const { user } = useAuth();
  const initializeData = useDataStore((s) => s.initializeData);

  useEffect(() => {
    (async () => {
      await initializeData(user);
    })();
  }, []);

  return (
    <div className="w-full h-full">
      <Routes />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
