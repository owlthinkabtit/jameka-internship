import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const AuthorItems = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
      )
      .then((response) => {
        console.log("API Response:", response.data);
        setAuthor(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Author Items", error);
        setLoading(false);
      });
  }, [id]);

  const renderSkeletons = () => {
    return Array(8)
      .fill(0)
      .map((_, index) => (
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>
            <div className="nft__item_wrap">
              <Skeleton width="100%" height="200px" borderRadius="10px" />
            </div>
            <div className="nft__item_info">
              <Skeleton width="70%" height="20px" borderRadius="5px" />
              <Skeleton width="50%" height="20px" borderRadius="5px" />
            </div>
          </div>
        </div>
      ));
  };

  if (loading) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">{renderSkeletons()}</div>
        </div>
      </div>
    );
  }

  const { nftCollection = [] } = author || {};

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {nftCollection.slice(0, 8).map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link to={`/author/${item.authorId}`}>
                    <img
                      className="lazy"
                      src={item.authorImage}
                      alt=""
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
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
                  <Link to={`/item-details/${item.id}`}>
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
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
