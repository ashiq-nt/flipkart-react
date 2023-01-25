import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Menu() {
  let navigate = useNavigate();

  let [productList, setProductList] = useState([]);
  let [menuList, setMenuList] = useState([]);

  let getMenuListFromServer = async () => {
    let url = "http://localhost:5005/api/menu-list";
    let { data } = await axios.get(url);
    setMenuList(data.menu);
    // console.log(data.menu);
  };
  let getProductListFromServer = async () => {
    let url = "http://localhost:5005/api/product-all-list";
    let { data } = await axios.get(url);
    setProductList(data.product);
    // console.log(data.product);
  };

  useEffect(() => {
    getMenuListFromServer();
    getProductListFromServer();
  }, []);
  return (
    <>
      <section className="container-fluid row">
        <p className="fw-bold h2 mt-lg-3 mb-lg-5 text-primary ms-3 avg_text">
          Select youre category
        </p>
        <section className="col-12">
          <section className="d-flex flex-wrap gap-3 m-auto">
            {menuList.map((menu, index) => {
              return (
                <div key={menu._id} className="quick-search d-flex ms-1"
                onClick={() => navigate("/filter-page/" + menu.type)}>
                  <img src={menu.image} />
                  <div className="p-2">
                    <p className="h5 fw-bold pt-1 ps-1 small_flip">{menu.name}</p>
                    <p className="small text-success verysmall_text">{menu.content}</p>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </section>

      <section className="container-fluid row">
        <p className="fw-bold h2 mt-lg-4 mt-2 mb-lg-2 text-primary ms-3 avg_text">
          Shop youre favourite products
        </p>
        <section className="col-12">
          <section className="d-flex  flex-wrap ms-lg-5 ms-4 col-12 mb-5">
            {productList.map((pr, index) => {
              return (
                <div key={pr._id} className="quick-search2"
                onClick={() => navigate("/order/" + pr._id)}>
                  <div className="quick-search23">
                    <img src={pr.image} />
                    <p className=" fw-bold p-0 m-0 small_text vsmall_text">{pr.name}</p>
                    <div className="d-flex m-0 p-0">
                      <button className="btn-sm bg-success bord border border-0 text-white m-0 vsmall_text s_pad">
                       { pr.aggregate_rating +"★"}
                      </button>
                      <p className="fw-bold ms-lg-2 mt-1 m-0 vsmall_text ">{"₹"+pr.price+"/-"}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </section>
    </>
  );
}

export default Menu;
