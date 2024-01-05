import { BrowserRouter } from "react-router-dom";
import "../global.scss";
import AppRoutes from "./AppRoutes";
import ErrorBoundary from "../components/ErrorBoundry";

function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
