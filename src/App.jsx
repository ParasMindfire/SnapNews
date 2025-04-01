import { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/routes";
import { BookmarkProvider } from "./contexts/BookmarkContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BookmarkProvider>
        <AppRoutes />
      </BookmarkProvider>
    </>
  );
}

export default App;
