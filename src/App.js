import Error404 from "containers/errors/Error404";
import About from "containers/pages/About";
import Contact from "containers/pages/Contact";
import Home from "containers/pages/Home";
import Prices from "containers/pages/Prices";
import Services from "containers/pages/Services";
import StudentList from "containers/pages/StudentList";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Error404 />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/studentList" element={<StudentList />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
