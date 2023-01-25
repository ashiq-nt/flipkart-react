import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import FilterPage from "./components/filter/filterPage";
import OrderPage from "./components/order/pPhotoSection";
import OrderDetails from "./components/order/orderDetails";

function App() {
  return <>
  <main className="container_fluid">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/filter-page/:type_id" element={<FilterPage/>}/>
      <Route path="/order/:pr_id" element={<OrderPage/>}/>
      <Route path="/order-details/" element={<OrderDetails/>} />
    </Routes>
  </main>
  
     </>;
}

export default App;
