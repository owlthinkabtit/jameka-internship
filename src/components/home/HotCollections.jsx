import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import CustomNextArrow from "../UI/CustomNextArrow";
import CustomPrevArrow from "../UI/CustomPrevArrow";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      )
      .then((response) => {
        setCollections(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching collections:", error);
        setLoading(false);
      });
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <Slider {...settings}>
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="col-lg-12" key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton
                        width="100%"
                        height="200px"
                        borderRadius="8px"
                      />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="70%" height="20px" borderRadius="4px" />
                      <Skeleton width="50%" height="20px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <Slider {...settings}>
              {collections.map((collection, index) => (
                <div
                  className="col-lg-12"
                  key={index}
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to={`/explore/`}>
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
