import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";

function Slides() {
  let navigate = useNavigate();

  let [slideList, setSlideList] = useState([]);
  let [menuList, setMenuList] = useState([]);

  let getMenuListFromServer = async () => {
    let url = "http://localhost:5005/api/menu-list";
    let { data } = await axios.get(url);
    setMenuList(data.menu);
    // console.log(data.menu);
  };
  let getSlideListFromServer = async () => {
    let url = "http://localhost:5005/api/slide-list";
    let { data } = await axios.get(url);
    setSlideList(data.slide);
    // console.log(data.slide);
  };

  useEffect(() => {
    getMenuListFromServer();
    getSlideListFromServer();
  }, []);
  return (
    <>
      <section className="row m-0">
        <div className="col-12 d-flex justify-content-center align-items-center">
          {menuList.map((menu, index) => {
            return (
              <div
                key={menu._id}
                className="text-center first_image_s m-lg-3 ms-1 mb-0"
                onClick={() => navigate("/filter-page/" + menu.type)}
              >
                <div className="first_image">
                  <img src={menu.image} />
                </div>
                <p className="verysmall_text fw-bolder text-center">
                  {menu.name}
                </p>
              </div>
            );
          })}
        </div>
        <hr className="my-3 mx-0" />
      </section>
      <section className="container-fluid row slide_section mb-3 m-0">
        
       
        <Carousel  showThumbs={false} infiniteLoop={true}>
          
          {slideList.map((slide, index) => {
          return (
            <div key={slide._id} className="carousel-item active slide_section m-0"
            onClick={() => navigate("/order/" + slide.productId)} >
              <img src={slide.image} className="d-block w-100 m-0"
             />
            </div>
          );
        })}
      
        </Carousel>
      </section>
    </>
  )
}

export default Slides;
