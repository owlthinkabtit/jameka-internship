import React, { useState, useEffect } from "react";
import Skeleton from "../UI/Skeleton";

const LandingIntro = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row">
          {[0, 1, 2].map((index) => (
            <div className="col-lg-4 col-md-6 mb-sm-30" key={index}>
              <div className="feature-box f-boxed style-3">
                {loading ? (
                  <Skeleton width="60px" height="60px" borderRadius="50%" />
                ) : (
                  <i
                    className={`bg-color-2 i-boxed ${
                      index === 0
                        ? "icon_wallet"
                        : index === 1
                        ? "icon_cloud-upload_alt"
                        : "icon_tags_alt"
                    }`}
                    data-aos="fade-up"
                    data-aos-duration="2000"
                  ></i>
                )}
                <div className="text">
                  {loading ? (
                    <>
                      <Skeleton width="140px" height="20px" borderRadius="4px" />
                      <Skeleton width="200px" height="15px" borderRadius="4px" style={{ marginTop: "8px" }} />
                      <Skeleton width="200px" height="15px" borderRadius="4px" style={{ marginTop: "4px" }} />
                    </>
                  ) : (
                    <>
                      <h4 data-aos="fade-up" data-aos-duration="3000">
                        {index === 0
                          ? "Set up your wallet"
                          : index === 1
                          ? "Add your NFT's"
                          : "Sell your NFT's"}
                      </h4>
                      <p data-aos="fade-up" data-aos-duration="3000">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem.
                      </p>
                    </>
                  )}
                </div>
                {!loading && (
                  <i
                    className={`wm ${
                      index === 0
                        ? "icon_wallet"
                        : index === 1
                        ? "icon_cloud-upload_alt"
                        : "icon_tags_alt"
                    }`}
                  ></i>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
