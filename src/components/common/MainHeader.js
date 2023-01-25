import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MainHeader() {
  let navigate = useNavigate();
  let [productList, setProductList] = useState([]);
  let [restaurantInputText, setRestaurantInputText] = useState("");
  let [searchList, setSearchList] = useState([]);

  let getUserLoginData = () => {
    let token = localStorage.getItem("fliptoken");
    if (token == null) {
      return false;
    } else {
      try {
        let result = jwtDecode(token);
        return result;
      } catch (error) {
        localStorage.removeItem("fliptoken");
        return false;
      }
    }
  };

  let [user, setUser] = useState(getUserLoginData());
  // let [product, setProduct] = useState();

  let onSuccess = (response) => {
    let token = response.credential;
    localStorage.setItem("fliptoken", token);
    alert("login in successfully");
    window.location.assign("/");
  };
  let onError = () => {
    console.log("Login Failed");
  };

  let logout = () => {
    let doLogout = window.confirm("Are you sure to logout ?");
    if (doLogout === true) {
      localStorage.removeItem("fliptoken");
      window.location.assign("/");
    }
  };

  let getProductListFromServer = async () => {
    let url = "http://localhost:5005/api/product-all-list";
    let { data } = await axios.get(url);
    setProductList(data.product);
    // console.log(data.product);
  };
  console.log();
  let searchForProduct = async (e) => {
    let { value } = e.target;
    setRestaurantInputText(value);
    if (value !== "") {
      let url = "http://localhost:5005/api/search-Product";
      let { data } = await axios.post(url, {
        restaurant: value
      });
      setSearchList(data.result);
    }
  };
  useEffect(() => {
    setRestaurantInputText("");
    // setSearchList([]);
  }, []);
  useEffect(() => {
    getProductListFromServer();
  }, []);
  // useEffect(() => {

  // }, [product]);
  return (
    <>
      <GoogleOAuthProvider clientId="722034488236-igsipkh31qql3tcjpb21g2uj4giho16e.apps.googleusercontent.com">
        <div
          className="modal fade"
          id="google-login"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-primary"
                  id="exampleModalLabel"
                >
                  Login
                </h1>
                {/* <div className="d-flex justify-content-center align-items-center"> */}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="icon_login m-auto">
                <img src="/images/assets/zomato2.png" />{" "}
              </div>
              <span className="text-primary h5 text-center">
                Please Login with youre Gmail account
              </span>
              <div className="modal-body  m-auto">
                <GoogleLogin onSuccess={onSuccess} onError={onError} />
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        <header className="row container-fluid bg-primary m-0">
          <div className="col-12 d-flex align-items-center py-2">
            <div className="col-1 d-none d-lg-block d-md-block"></div>
            <div className="col-2 d-flex justify-content-end">
              <div className="ms-2">
                <p className="text-white h4 fw-bold small_flip fst-italic p-0 m-0">
                  flipkart
                </p>
                <p className="p-0 m-0 fst-italic verysmall_text text-warning text-center">
                  Explore Plus+
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-7">
              <input
                type="text"
                placeholder="Search products"
                className="border border-0 outline bord ms-lg-2 p-lg-2 pe-lg-5 p-2 m-0 searching_ul verysmall_text"
                value={restaurantInputText}
                onChange={searchForProduct}
              />
              <ul className="list-group position-absolute ms-lg-2 z_indx w-lg-25 p-0 verysmall_text">
                {productList.map((product, index) => {
                  return (
                    <li
                      key={product._id}
                      className="list-group-item verysmall_text position-static"
                      onClick={() => navigate("/order/" + product._id)}
                    >
                      {product.name}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-3 col-1 d-flex justify-content-end">
              {user === false ? (
                <button
                  className="btn btn-outline-light verysmall_text"
                  data-bs-toggle="modal"
                  data-bs-target="#google-login"
                >
                  Login
                </button>
              ) : (
                <>
                  <div className="d-none d-lg-block">
                    <div className="d-flex">
                      <p className="fw-bold text-white p-0 verysmall_text text-center">
                        Welcome {user.name}
                      </p>
                      <button
                        className="btn btn-outline-light ms-3 btn-sm p-lg-2 p-0 verysmall_text"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className="d-lg-none">
                    <div className="d-flex">
                      <p className=" text-white p-0 vsmall_text m-0 text-center me-2">
                        Welcome {user.name}
                      </p>
                      <button
                        className="btn btn-outline-light  m-0 btn-sm p-lg-2 p-1 verysmall_text"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col-lg-2 col-3">
              <button
                className="btn d-flex btn-outline-light ms-lg-4 ms-1 text-center"
                onClick={() => navigate("/order-details/")}
              >
                <span className="material-symbols-outlined small_text">
                  shopping_cart
                </span>
                <p className="vsmall_text m-0">My Orders</p>
              </button>
            </div>
          </div>
        </header>
      </GoogleOAuthProvider>
    </>
  );
}

export default MainHeader;
