import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Footer from "./components/Footer";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/home" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
