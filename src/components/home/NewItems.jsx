import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CustomNextArrow from "../UI/CustomNextArrow";
import CustomPrevArrow from "../UI/CustomPrevArrow";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      )
      .then((response) => {
        const itemsWithTimer = response.data.map((item) => ({
          ...item,
          timeLeft: calculateTimeLeft(item.expiryDate),
        }));
        setNewItems(itemsWithTimer);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching new items");
      });
  }, []);

  const calculateTimeLeft = (expiryDate) => {
    const timeLeft = new Date(expiryDate) - new Date();
    if (timeLeft <= 0) return "Expired";
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setNewItems((items) =>
        items.map((item) => ({
          ...item,
          timeLeft: calculateTimeLeft(item.expiryDate),
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />, 
    prevArrow: <CustomPrevArrow />, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <Slider {...settings}>
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div className="col-md-12" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      </div>
                      <div className="de_countdown">
                        <Skeleton width="80px" height="20px" borderRadius="4px" />
                      </div>
                      <div className="nft__item_wrap">
                        <Skeleton width="100%" height="200px" borderRadius="8px" />
                      </div>
                      <div className="nft__item_info">
                        <Skeleton width="140px" height="20px" borderRadius="4px" />
                        <Skeleton width="80px" height="20px" borderRadius="4px" style={{ marginTop: "8px" }} />
                      </div>
                    </div>
                  </div>
                ))
              : newItems.map((item, index) => (
                  <div
                    className="col-md-12"
                    key={index}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.author}`}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="de_countdown">{item.timeLeft}</div>

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>

                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
