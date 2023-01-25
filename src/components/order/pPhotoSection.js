import MainHeader from "../common/MainHeader";
import SProducts from "./sProducts";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
// import useRazorpay from "react-razorpay";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function OrderPage() {
  let { pr_id } = useParams();

  let navigate = useNavigate();
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
  // console.log(user);

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
  let initProduct = {
    aggregate_rating: "",
    brand: [],

    delivey: "",
    description: [],
    offers: [],
    image: "retaurent-background.png",
    locality: "",
    discount: 0,
    type_id: 0,
    price: 0,
    name: "sss",
    rating_text: "",
    thumb: [],
    _id: "",
  };

  let [productList, setProductList] = useState({ ...initProduct });
  let [qList, setQList] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);
  let [prodId, setProdId] = useState(0);
  let [pRate, setRate] = useState([]);
  let [sProductList, setSProductList] = useState([]);

  let getQuantity = async () => {
    let url = "http://localhost:5005/api/quantity-list";
    let { data } = await axios.get(url);
    // console.log(data.qty);
    if (data.status === true) {
      setQList(data.qty);
    } else {
      setQList([]);
    }
  };
  // let pr_price = productList.price;
  let setPrice = () => {
    setTotalPrice(totalPrice + productList.price);
  };
  // console.log("total"+totalPrice);

  let getMenuItems = async () => {
    let url = "http://localhost:5005/api/product-list/" + pr_id;
    let { data } = await axios.get(url);
    // console.log(data.product);
    if (data.status === true) {
      setProductList({ ...data.product });

      setProdId(data.product.type_id);
      setRate(data.product.rating_text);
    } else {
      setProductList({ ...data.initProduct });
    }
  };

  let addItem = (index) => {
    let _qList = [...qList];
    _qList[index].qty += 1;
    setQList(_qList);
    setTotalPrice(totalPrice + productList.price);
  };
  let removeItem = (index) => {
    let _qList = [...qList];
    _qList[index].qty -= 1;
    setQList(_qList);
    setTotalPrice(totalPrice - productList.price);
  };

  let getsProductItems = async () => {
    let url = "http://localhost:5005/api/product-type-list/" + prodId;
    let { data } = await axios.get(url);
    // console.log(data.product);
    if (data.status === true) {
      setSProductList(data.product);
    } else {
      setSProductList([]);
    }
  };
  // let type = productList.type_id;
  // console.log(""+type);
  // let getProdId = () => {
  //   // setProdId(productList.type_id);
  // };
  // console.log(prodId);

  let makePayment = async () => {
    let userOrder = pr_id;
    let url = "http://localhost:5005/api/gen-product-order-id";
    let { data } = await axios.post(url, { amount: totalPrice });
    // console.log(data);
    if (data.status === false) {
      alert("Unable to generate order");
      return false;
    }
    let { order } = data;

    var options = {
      key: "rzp_test_RB0WElnRLezVJ5",
      amount: order.amount,
      currency: order.currency,
      name: "Zomato Order",
      description: "Make a payment for youre order",
      image: "",
      order_id: order.id,
      handler: async function (response) {
        let verifyData = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
          name: user.name,
          mobile: 9999999999,
          p_image: productList.image,
          p_name: productList.name,
          // qty: qList.qty,
          p_price: productList.price,
          email: user.email,
          order_list: userOrder,
          totalAmount: totalPrice,
        };
        let { data } = await axios.post(
          "http://localhost:5005/api/verify-payment",
          verifyData
        );
        if (data.status === true) {
          alert("Payment completed successfully");
          window.location.assign("/order-details/");
        } else {
          alert("Payment fails");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: 9835672456,
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  // useEffect(() => {
  //   getProdId();
  // }, [prodId]);

  useEffect(() => {
    getMenuItems();
    getQuantity();

    getsProductItems();
    // set();
  }, [prodId, pRate,qList]);

  return (
    <>
      <MainHeader />
      <div
        className="modal fade"
        id="modalUserDetails"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel2">
                name
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter full Name"
                  value={user.name}
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={user.email}
                  onChange={() => {}}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Address
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  // value="cccccccccccc"
                  onChange={() => {}}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-danger"
                data-bs-target="#modalMenuList"
                data-bs-toggle="modal"
              >
                Back
              </button>
              <button className="btn btn-success" onClick={makePayment}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="modalMenuList"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          {user === false ? (
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">
                  Please login before buying
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          ) : (
            <>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalToggleLabel">
                    {productList.name}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body ">
                  <section className="m-0">
                    <div className="search-result-image d-flex m-auto">
                      <img src={"/" + productList.image} alt="" />
                    </div>
                    <div className="ms-4">
                      {/* <p className="mb-1 h5">{productList.name}</p> */}

                      <div className="d-flex mb-3">
                        <label className="form-label my-0">
                          Select colour:
                        </label>
                        <select className="form-select text-muted my-0">
                          <option value="">Black</option>
                          <option value="">White</option>
                          <option value="">Hash</option>
                        </select>
                      </div>
                      {qList.map((qty, index) => {
                        return (
                          <div className="d-flex" key={index}>
                            <p className="fw-bold h5">Quantity:</p>
                            <p className="ms-2 h5 text-primary bg">{qty.qty}</p>
                            <p className="me-2 h6 mt-1 ms-1">Items</p>
                            <div className="ms-1">
                              <button
                                className="btn btn-primary btn-sm h6 mb-2"
                                onClick={() => addItem(index)}
                              >
                                +
                              </button>
                              <button
                                className="btn btn-danger btn-sm h6 mb-2 ms-2"
                                onClick={() => removeItem(index)}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                  <div className="d-flex justify-content-between mt-3">
                    <h4 className="ms-lg-5">Total Price:</h4>
                    <h4 className="text-primary me-lg-5">
                      {" ₹" + totalPrice + "/-"}
                    </h4>
                    <button
                      className="btn btn-danger"
                      data-bs-target="#modalUserDetails"
                      data-bs-toggle="modal"
                    >
                      Process
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <main className="container-fluid m-0">
        <main className="row mt-lg-4 mt-2">
          <div
            className="modal fade"
            id="modalGallery"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-lg carousel_image"
              style={{ height: "75vh" }}
            >
              <div className="modal-content ">
                <div className="modal-body h-75  ">
                  <Carousel showThumbs={false} infiniteLoop={true}>
                    {productList.thumb.map((value, index) => {
                      return (
                        <div key={index} className=" carousel_image">
                          <img src={"/" + value} />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>

          <section className="col-lg-3 col-12">
            <section className="w-100 shadow positiom_image mb-3 m-0">
              <section className="d-flex justify-content-center align-content-center align-items-center m-0">
                <div className="pr-image d-flex align-items-center m-0">
                  <img src={"/" + productList.image} alt="" />
                </div>
              </section>

              <section className="d-flex justify-content-center align-items-center">
                <button
                  className="h5 py-lg-2 px-lg-4 bg-warning bord"
                  data-bs-toggle="modal"
                  data-bs-target="#modalGallery"
                >
                  Gallery
                </button>
                <div className="ms-4 fw-bold">
                  <button
                    className="h5 py-lg-2 px-lg-3 bg-primary text-white bord align-self-start"
                    data-bs-toggle="modal"
                    href="#modalMenuList"
                    role="button"
                    onClick={setPrice}
                  >
                    Buy Now
                  </button>
                </div>
              </section>
            </section>
          </section>

          <section className="col-12 col-lg-7 p-0 m-0 position_section">
            <article className="w-100 p-lg-4 p-2 shadow mb-lg-3 me-lg-2 ms-lg-3 m-0">
              <section className="ms-lg-4">
                <div className="ms-lg-4 ms-2">
                  <div className="my-lg-2">
                    <p
                      className="mb-1 h4 text-primary small_flip
                    "
                    >
                      {productList.name}
                    </p>
                  </div>
                  <div className="d-flex">
                    <button className="btn-sm bg-success bord border border-0 text-white verysmall_text">
                      {productList.aggregate_rating + "★"}
                    </button>
                    <span className="text-secondary m-1 small_text">
                      2,613 Ratings & 325 Reviews
                    </span>
                  </div>
                  <div className="my-lg-2">
                    <span className="h3 fw-bold small_flip">
                      ₹{productList.price}/-
                    </span>
                  </div>
                  <span className="text-success h5 verysmall_text">
                    {productList.discount}% off
                  </span>
                  <div className="my-2 m-0">
                    <p className="h5 mb-lg-4 mb-2 small_flip">
                      Available offers
                    </p>
                  </div>
                  <ul className="p-0">
                    {productList.offers.map((value, index) => {
                      return (
                        <li
                          key={index}
                          className="h6 text-success my-lg-2 verysmall_text"
                        >
                          {value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="ms-lg-4 ms-2">
                  <p className="mb-lg-4 h5 small_flip">Highlights</p>
                  <ul className="p-0">
                    {productList.description.map((value, index) => {
                      return (
                        <li key={index} className="h6  my-lg-2 verysmall_text">
                          {value}
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* <div>
                <p className="mb-1 h5">Specification</p>

              </div>  */}
                <hr className="m-0" />
                <div>
                  <p className="my-lg-3 h4 small_flip">Ratings & Reviews</p>

                  <div className="">
                    <p className="mb-lg-2 h3 small_flip">
                      {productList.aggregate_rating}★
                    </p>
                    <p className="text-secondary m-1 verysmall_text">
                      2,613 Ratings & 325 Reviews
                    </p>
                    <hr />
                    <div className="p-lg-3 p-0">
                      {pRate.map((v, index) => {
                        return (
                          <div key={index} className="m-lg-2 m-0 p-0">
                            <button className="btn-sm bg-success bord border border-0 text-white vsmall_text m-0">
                              {productList.aggregate_rating}★
                            </button>
                            <p className="h6y-lg-2 small_text p-0 m-0">{v}</p>
                            <hr />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </section>
        </main>
        <section className="container-fluid row">
          <p className="fw-bold h2 mt-lg-4 mt-2 mb-lg-2 text-primary ms-3 avg_text">
            Shop youre favourite products
          </p>
          <section className="col-12">
            <section className="d-flex  flex-wrap ms-lg-5 ms-4 col-12 mb-5">
              {sProductList.map((pr, index) => {
                return (
                  <div
                    key={pr._id}
                    className="quick-search2"
                    onClick={() => navigate("/order/" + pr._id)}
                  >
                    <div className="quick-search23">
                      <img src={"/" + pr.image} />
                      <p className=" fw-bold p-0 m-0  vsmall_text">{pr.name}</p>
                      <div className="d-flex m-0 p-0">
                        <button className="btn-sm bg-success bord border border-0 text-white m-0 vsmall_text s_pad">
                          {pr.aggregate_rating + "★"}
                        </button>
                        <p className="fw-bold ms-lg-2 mt-1 m-0 vsmall_text ">
                          {"₹" + pr.price + "/-"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </section>
        </section>
      </main>
    </>
  );
}

export default OrderPage;
