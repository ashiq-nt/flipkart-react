import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainHeader from "../common/MainHeader";
import Filter from "./filter";
import Products from "./products";
import axios from "axios";

function FilterPage() {
  // let navigate = useNavigate();
  let { type_id } = useParams();
  let [menuList, setMenuList] = useState({ type: type_id });
  let [productList, setProductList] = useState([]);
  let [filterData, setFilterData] = useState({
    type: type_id,
  });

  let getMenuItems = async () => {
    let url = "http://localhost:5005/api/menu-type-list/" + type_id;
    let { data } = await axios.get(url);
    // console.log(data.menu);
    if (data.status === true) {
      setMenuList([...data.menu]);
    } else {
      setMenuList([]);
    }
  };
  let filter = async () => {
    let url = "http://localhost:5005/api/product-filter-list";

    let { data } = await axios.post(url, filterData);
    if (data.status === true) {
      setProductList(data.product);
      // console.log(data.product);
    } else {
      setProductList([]);
    }
  };

  let getFilterResult = (event, type) => {
    let value = event.target.value;
    let _filterData = { ...filterData };
    switch (type) {
      case "sort":
        // sort code
        _filterData["sort"] = value;
        break;
        case "product":
          _filterData["product"] = value;
          break;
      case "brand":
        _filterData["brand"] = value;
      //   let checked = event.target.checked;

      //   let brand =
      //   filterData.brand == undefined ? [] : [...filterData.brand];
      // if (checked) {
      //   let isAvailable = brand.includes(Number(value));
      //   if (isAvailable === false) brand.push(Number(value));
      // } else {
      //   let position = brand.indexOf(Number(value));
      //   brand.splice(position, 1);
      // }
      // if (brand.length > 0) {
      //   _filterData["brand"] = brand;
      // }
      break;
      case "costFor":
        value = value.split("-");
        _filterData["L_cost"] = Number(value[0]);
        _filterData["H_cost"] = Number(value[1]);
        // console.log(value[0]);
        // console.log(value[1]);
        break;

      default:
        break;
    }

    setFilterData({..._filterData,...filterData});
  };
  useEffect(() => {
    getMenuItems();
  }, []); // mounting ==> only once

  useEffect(() => {
    filter();
  }, [filterData]); // updating ===> on state updat
  return (
    <>
      <MainHeader />
      <main className="container-fluid">
        <section className="row mb-5">
          <div className="col-12 mt-lg-4 ">
            <div className="row gap-lg-5 mt-4">
              <Filter getFilterResult={getFilterResult} menuList={menuList} productList={productList}/>
              <Products productList={productList} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default FilterPage;
