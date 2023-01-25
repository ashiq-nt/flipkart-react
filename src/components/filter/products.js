import { useNavigate, useParams } from "react-router-dom";

function Products(props) {
  let { productList } = props;
  let navigate = useNavigate();
  return (
    <>
      <div className="col-12 col-lg-8 my-0">
        {productList.length === 0 ? (
          <article className="w-100 p-4 shadow mb-3">
            Sorry no product found 
          </article>
        ) : (
          <>
            <section className=" p-0 mt-2 mt-lg-0 m-0">
              {productList.map((pr, index) => {
                return (
                  <article
                    className="w-100 p-lg-4 p-2 shadow m-0"
                    key={pr._id}
                    onClick={() => navigate("/order/" + pr._id)}
                  >
                    <section className="d-flex m-0">
                      <div className="search-result-image d-flex align-items-center">
                        <img src={"/" + pr.image} />
                      </div>
                      <div className=" ms-4">
                        <p className="mb-1 h5 small_flip">{pr.name}</p>
                        <div className="d-flex">
                          <button className="btn-sm bg-success bord border border-0 text-white verysmall_text">
                            {pr.aggregate_rating + "★"}
                          </button>
                          <span className="text-secondary m-1 verysmall_text">
                            2,613 Ratings & 325 Reviews
                          </span>
                        </div>

                        <ul className="p-0">
                          {pr.description.map((value, index) => {
                            return (
                              <li key={index} className="h6  my-lg-2 ms-lg-2 m-0 verysmall_text">
                                {value}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className=" ms-4">
                        <div className="my-lg-2">
                          <span className="h3 fw-bold small_flip">₹{pr.price}/-</span>
                        </div>

                        <span className="text-success h5 verysmall_text">
                          {pr.discount}% off
                        </span>
                        <p className="text-secondary vsmall_text">{pr.delivey}</p>
                      </div>
                    </section>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default Products;
