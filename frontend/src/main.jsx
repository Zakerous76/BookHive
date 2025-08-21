import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App.jsx"
import store from "./store.js"
import { Provider } from "react-redux"

createRoot(document.getElementById("root")).render(
  <div>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </div>
)
