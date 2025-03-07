import TramList from "./pages/TramList";
import { ThemeProvider } from "../src/context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <TramList />
    </ThemeProvider>
  );
}

export default App;
