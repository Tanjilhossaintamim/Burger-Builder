import { Provider } from "react-redux";
import "./App.css";
import MainComponent from "./components/MainComponent";
import ReduxStore from "./redux/Store";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/Error/ErrorBoundary";
function App() {
  return (
    <>
      <Provider store={ReduxStore}>
        <BrowserRouter>
          <ErrorBoundary fallback={<h1>Something Went Wrong !</h1>}>
            <MainComponent />
          </ErrorBoundary>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
