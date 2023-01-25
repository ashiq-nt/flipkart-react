import { useNavigate, useParams } from "react-router-dom";

function Filter(props) {
  let { productList, menuList, getFilterResult } = props;
  let { type_id } = useParams();
  console.log(type_id);
  return (
    <>
      <div className="col-lg-3 col-12">
        <div className="d-none d-lg-block">
          <article className="w-100 shadow mb-3">
            <section className="d-flex align-items-center">
              <div className="main-filter-image d-flex align-items-center">
                <img src={menuList.image} alt="" />
              </div>
            </section>
            <hr />
            <section className="d-flex">
              <div>
                <p>CUISINES:</p>
                <p>COST FOR TWO:</p>
              </div>
              <div className="ms-4 fw-bold">
                <p>Bakery</p>
                <p>₹700</p>
              </div>
            </section>
          </article>
        </div>

        <section className="shadow p-2 px-4">
          <p className="fw-bold mb-2 d-flex justify-content-between">
            Filters
            <button
              className="btn btn-sm d-lg-none"
              data-bs-toggle="collapse"
              data-bs-target="#filter-target"
              aria-expanded="true"
              aria-controls="filter-target"
            >
              <i
                className="fa fa-arrow-down text-primary"
                aria-hidden="true"
              ></i>
            </button>
          </p>
          <aside className="d-lg-block d-md-block collapse" id="filter-target">
            <div className="mb-3">
              <label className="form-label">Select Product</label>
              <select
                className="form-select text-muted"
                onChange={(event) => getFilterResult(event, "product")}
              >
                <option value="">Select Location</option>
                {productList.map((product, index) => {
                  return (
                    <option key={index} value={product.name}>
                      {product.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {type_id === 1 ? (
              <>
                <div className="mb-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Brand
                  </label>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="north-indian"
                      value="1"
                      onChange={(event) => getFilterResult(event, "brand")}
                    />
                    <label htmlFor="north-indian" className="form-check-label">
                      iphone
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="north-indian"
                      value="2"
                      onChange={(event) => getFilterResult(event, "brand")}
                    />
                    <label htmlFor="" className="form-check-label">
                      samsung
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="north-indian"
                      value="3"
                      onChange={(event) => getFilterResult(event, "brand")}
                    />
                    <label htmlFor="" className="form-check-label">
                      Oneplus
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Cost
                  </label>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="0-10000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      Less than `10000
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="10000-20000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      10000 to 20000
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="20000-50000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      20000 to 50000
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="50000-100000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      50000 to 100000
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="100000-100000000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      100000+
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label fw-bold fs-5">
                    Sort
                  </label>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="sort"
                      value="1"
                      onChange={(event) => {
                        getFilterResult(event, "sort");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      Price low to high
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="sort"
                      value="-1"
                      onChange={(event) => {
                        getFilterResult(event, "sort");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      Price high to low
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Brand
                  </label>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="north-indian"
                      value="1"
                      onChange={(event) => getFilterResult(event, "brand")}
                    />
                    <label htmlFor="north-indian" className="form-check-label">
                      Asus
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="north-indian"
                      value="2"
                      onChange={(event) => getFilterResult(event, "brand")}
                    />
                    <label htmlFor="" className="form-check-label">
                      HP
                    </label>
                  </div>


                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label fw-bold">
                    Cost
                  </label>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="0-30000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      Less than `30000
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="30000-50000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      30000 to 50000
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="50000-80000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      50000 to 80000
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="80000-100000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      80000 to 100000
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="costFor"
                      value="100000-100000000"
                      onChange={(event) => {
                        getFilterResult(event, "costFor");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      100000+
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label fw-bold fs-5">
                    Sort
                  </label>
                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="sort"
                      value="1"
                      onChange={(event) => {
                        getFilterResult(event, "sort");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      Price low to high
                    </label>
                  </div>

                  <div className="form-check ms-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="sort"
                      value="-1"
                      onChange={(event) => {
                        getFilterResult(event, "sort");
                      }}
                    />
                    <label htmlFor="" className="form-check-label">
                      Price high to low
                    </label>
                  </div>
                </div>
              </>
            )}
            <>
              <div className="mb-3">
                <label htmlFor="" className="form-label fw-bold">
                  Brand
                </label>
                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="north-indian"
                    value="1"
                    onChange={(event) => getFilterResult(event, "brand")}
                  />
                  <label htmlFor="north-indian" className="form-check-label">
                    iphone
                  </label>
                </div>

                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="north-indian"
                    value="2"
                    onChange={(event) => getFilterResult(event, "brand")}
                  />
                  <label htmlFor="" className="form-check-label">
                    samsung
                  </label>
                </div>

                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="north-indian"
                    value="3"
                    onChange={(event) => getFilterResult(event, "brand")}
                  />
                  <label htmlFor="" className="form-check-label">
                    Oneplus
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="" className="form-label fw-bold">
                  Cost
                </label>
                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="costFor"
                    value="0-10000"
                    onChange={(event) => {
                      getFilterResult(event, "costFor");
                    }}
                  />
                  <label htmlFor="" className="form-check-label">
                    Less than `10000
                  </label>
                </div>

                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="costFor"
                    value="10000-20000"
                    onChange={(event) => {
                      getFilterResult(event, "costFor");
                    }}
                  />
                  <label htmlFor="" className="form-check-label">
                    10000 to 20000
                  </label>
                </div>

                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="costFor"
                    value="20000-50000"
                    onChange={(event) => {
                      getFilterResult(event, "costFor");
                    }}
                  />
                  <label htmlFor="" className="form-check-label">
                    20000 to 50000
                  </label>
                </div>

                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="costFor"
                    value="50000-100000"
                    onChange={(event) => {
                      getFilterResult(event, "costFor");
                    }}
                  />
                  <label htmlFor="" className="form-check-label">
                    50000 to 100000
                  </label>
                </div>

                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="costFor"
                    value="100000-100000000"
                    onChange={(event) => {
                      getFilterResult(event, "costFor");
                    }}
                  />
                  <label htmlFor="" className="form-check-label">
                    100000+
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="" className="form-label fw-bold fs-5">
                  Sort
                </label>
                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="sort"
                    value="1"
                    onChange={(event) => {
                      getFilterResult(event, "sort");
                    }}
                  />
                  <label htmlFor="" className="form-check-label">
                    Price low to high
                  </label>
                </div>

                <div className="form-check ms-2">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="sort"
                    value="-1"
                    onChange={(event) => {
                      getFilterResult(event, "sort");
                    }}
                  />
                  <label htmlFor="" className="form-check-label">
                    Price high to low
                  </label>
                </div>
              </div>
            </>
          </aside>
        </section>
      </div>
    </>
  );
}

export default Filter;
