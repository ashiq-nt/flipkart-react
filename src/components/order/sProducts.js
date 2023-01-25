import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";




function SProducts(props) {
  let { productid } = props;
  let navigate = useNavigate();
  let [menuList, setMenuList] = useState();
  let [type_id, setProductList] = useState();

  console.log( productid);
  let getProductItems = async () => {
    let url = "http://localhost:5005/api/product-list/" + productid;
    let { data } = await axios.get(url);
    // console.log(data.product);
    if (data.status === true) {
      setProductList(data.product.type_id);
    } else {
      setProductList([]);
    }
  };
// console.log(productList);
  
  let getsProductItems = async () => {
    let url = "http://localhost:5005/api/menu-type-list/"+ type_id ;
    let { data } = await axios.get(url);
    console.log(data.menu);
    if (data.status === true) {
      setsProductList(data.menu);
    } else {
      setsProductList([]);
    }
  };
  useEffect(() => {
    getMenuItems();
    getProductItems();
  }, []);
  return (
    <>
      <main>
      <section className="container-fluid row">
        <p className="fw-bold h2 mt-lg-4 mt-2 mb-lg-2 text-primary ms-3 avg_text">
          Shop youre favourite products
        </p>
        <section className="col-12">
          <section className="d-flex  flex-wrap ms-lg-5 ms-4 col-12 mb-5">
            {/* {menuList.map((pr, index) => {
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
            })} */}
          </section>
        </section>
      </section>
      </main>
    </>
  );
}

export default SProducts;
