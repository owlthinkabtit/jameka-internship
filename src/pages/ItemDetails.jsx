import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton"
import axios from "axios";

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const { nftId } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch item details.");
        console.error("Error fetching item");
      });
    window.scrollTo(0, 0);
  }, [nftId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!item) {
    // Skeleton placeholders while loading
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <Skeleton width="100%" height="400px" borderRadius="16px" />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <Skeleton width="60%" height="32px" borderRadius="8px" />
                    <div className="item_info_counts d-flex justify-content-between mt-3">
                      <Skeleton width="30%" height="20px" borderRadius="8px" />
                      <Skeleton width="30%" height="20px" borderRadius="8px" />
                    </div>
                    <Skeleton width="100%" height="80px" borderRadius="8px" className="mt-3" />
                    <div className="d-flex flex-row mt-4">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author d-flex align-items-center">
                          <Skeleton width="50px" height="50px" borderRadius="50%" />
                          <Skeleton width="120px" height="20px" borderRadius="8px" className="ml-3" />
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Creator</h6>
                    <div className="item_author d-flex align-items-center">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <Skeleton width="120px" height="20px" borderRadius="8px" className="ml-3" />
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price d-flex align-items-center">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <Skeleton width="100px" height="30px" borderRadius="8px" className="ml-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>{item.description}</p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img
                              className="lazy"
                              src={item.ownerImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>
                            {item.ownerName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img
                              className="lazy"
                              src={item.creatorImage}
                              alt=""
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>
                            {item.creatorName}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
