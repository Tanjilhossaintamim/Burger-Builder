import { Provider } from "react-redux";
import "./App.css";
import MainComponent from "./components/MainComponent";
import ReduxStore from "./redux/Store";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <Provider store={ReduxStore}>
        <BrowserRouter>
          <MainComponent />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
