import axios from "axios";
import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import MainHeader from "../common/MainHeader";

function OrderDetails() {
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
    // else{
    //     window.location.assign("/");
    // }
  };

  let [orderList, setOrderList] = useState([]);

  let getOrderDetails = async () => {
    let url = "http://localhost:5005/api/get-order-datails/" + user.email;
    let { data } = await axios.get(url);
    setOrderList(data.order);
    console.log(data);
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <main className="container-fluid  m-0">
        <MainHeader/>
        <section className="col-12 col-lg-8 p-0 mt-2 mt-lg-3 m-0">
          {orderList.length === 0 ? (
            <article className="w-100 p-4 shadow mb-3">
              Sorry there is no order found
            </article>
          ) : (
            <>
              {orderList.map((order, index) => {
                return (
                  <article key={order._id} className="w-100 p-4 shadow mb-3">
                
                        <section
                       
                          className="d-flex align-items-center"
                        >
                          <div className="search-result-image d-flex align-items-center">
                            <img src={"/" + order.p_image} alt="" />
                          </div>
                          <div className="search-result-details ms-4">
                            <p className="mb-1 h4">{order.p_name}</p>
                            <p className="mb-1 fw-bold">
                              Quantity :{order.qty}
                            </p>
                            <p className="mb-1 text-muted ">
                              Price: {order.p_price}
                            </p>
                            <p className="mb-1 text-muted">
                              {/* Restaurant:{order.rest_name} */}
                            </p>
                            <p className="mb-1 text-muted">
                              {/* Contact:{order.c_number} */}
                            </p>
                          </div>
                        </section>
                
                    <hr />
                    <section className="d-flex edu-m-remove-para-margin">
                      <div>
                        <p>Total Amount:</p>
                        <p>Payment id:</p>
                      </div>
                      <div className="ms-4 fw-bold">
                        <p>{order.totalAmount}</p>
                        <p>{order.payment_id}</p>
                      </div>
                    </section>
                  </article>
                );
              })}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default OrderDetails;
