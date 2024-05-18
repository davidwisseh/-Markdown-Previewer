import logo from "./logo.svg";
import "./App.css";
import Editor from "./components/editor";
import Markdown from "./components/markdown";
function App() {
  return (
    <div className="App">
      <Editor />
      <Markdown />
    </div>
  );
}

export default App;
