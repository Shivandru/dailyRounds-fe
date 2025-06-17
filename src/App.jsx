import "./App.css";
import AllRoutes from "./routes/AllRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: "Figtree, sans-serif",
            fontSize: "14px",
          },
        }}
      />
      <AllRoutes />
    </>
  );
}

export default App;
