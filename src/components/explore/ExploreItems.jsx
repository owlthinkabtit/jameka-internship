import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const calculateTimeLeft = (expiryData) => {
    const timeLeft = new Date(expiryData) - new Date();
    if (timeLeft <= 0) return "Expired";
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const fetchItems = async (reset = false) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?page=${page}&filter=${filter}`
      );

      const itemsWithTimer = response.data.map((item) => ({
        ...item,
        timeLeft: calculateTimeLeft(item.expiryDate),
      }));

      setExploreItems((prevItems) =>
        reset ? itemsWithTimer : [...prevItems, ...itemsWithTimer]
      );
    } catch (error) {
      console.error("Error fetching explore items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(true);
  }, [filter]);

  useEffect(() => {
    fetchItems();
  }, [page]);

  const loadMore = () => setPage((prevPage) => prevPage + 1);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <div className="row">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                </div>
                <div className="de_countdown">
                  <Skeleton width="100px" height="20px" borderRadius="4px" />
                </div>
                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="200px" borderRadius="8px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="70%" height="20px" borderRadius="4px" />
                  <Skeleton width="50%" height="20px" borderRadius="4px" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row">
          {exploreItems.map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div
                className="nft__item"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
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
        </div>
      )}
      <div className="col-md-12 text-center">
        <button onClick={loadMore} id="loadmore" className="btn-main lead">
          Load more
        </button>
      </div>
    </>
  );
};

export default ExploreItems;
