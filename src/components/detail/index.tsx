import React, { ReactNode } from "react";
import { FaCar } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { GiFilmStrip, GiSpaceship, GiWorld } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import Tooltip from "../../common/tooltip/Tooltip";
import "./detail.scss";
import Badge from "../../common/badge/Badge";

type DetailProps = {
  isOpen: boolean;
  onClose: () => void;
  detailMetadata: {
    name?: string;
    homeworld?: string;
    films?: string[];
    vehicles?: string[];
    starships?: string[];
    created?: ReactNode | string;
    category?: string | null;
    url?: string;
  } | null;
};

const Detail: React.FC<DetailProps> = ({
  isOpen = true,
  onClose,
  detailMetadata,
}) => {
  const renderData = () => {
    return (
      <div className="data-container">
        {/* Upper Section */}
        <div className="data-item">
          <div>
            <span className="lg bold">Name: </span>
            <span className="md">{detailMetadata?.name}</span>
          </div>

          <div>
            <span className="lg bold">Catagory: </span>
            <span className="md">
              <Badge text={detailMetadata?.category || ""} color="secondary" />
            </span>
          </div>
        </div>
        <div className="data-item">
          <div>
            <span className="lg bold">Created At: </span>
            <span className="md">
              {" "}
              {typeof detailMetadata?.created === "string"
                ? detailMetadata?.created.slice(0, 4)
                : ""}
            </span>
          </div>

          <div>
            <span className="lg bold">Link: </span>
            <a
              className="md url-icon"
              href={detailMetadata?.url ?? ""}
              target="_blank"
            >
              <Tooltip tooltipText={detailMetadata?.url ?? ""}>
                <FaLink size={20} />
              </Tooltip>
            </a>
          </div>
        </div>

        <div className="detail-icons-container">
          <div className="grid-container">
            {/* Home World */}
            <div className="grid-item">
              <h3 className="lg bold">Home World</h3>
              <a
                className="homeworld-icon"
                href={detailMetadata?.homeworld ?? ""}
                target="_blank"
              >
                <Tooltip tooltipText="Home World">
                  <GiWorld size={25} />
                </Tooltip>
              </a>
            </div>

            {/* Vehicles */}
            <div className="grid-item">
              <h3 className="lg bold">Vehicles</h3>
              {!detailMetadata?.vehicles?.length ? (
                <h6>No Vehicles To Show</h6>
              ) : (
                <div className="films-icons">
                  {detailMetadata?.vehicles?.map((vehicle, idx) => {
                    return (
                      <a
                        key={vehicle}
                        href={vehicle}
                        target="_blank"
                        className="common-icons"
                      >
                        <Tooltip tooltipText={`Vehicle ${idx + 1}`}>
                          <FaCar size={25} />
                        </Tooltip>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Films */}
            <div className="grid-item">
              <h3 className="lg bold">Films</h3>
              {!detailMetadata?.films?.length ? (
                <h6>No Films To Show</h6>
              ) : (
                <div className="films-icons">
                  {detailMetadata?.films?.map((film, idx) => {
                    return (
                      <a
                        key={film}
                        href={film}
                        target="_blank"
                        className="common-icons"
                      >
                        <Tooltip tooltipText={`Film ${idx + 1}`}>
                          <GiFilmStrip size={25} />
                        </Tooltip>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Star Ships */}
            <div className="grid-item">
              <h3 className="lg bold">Star Ships</h3>
              {!detailMetadata?.starships?.length ? (
                <h6>No Star Ships To Show</h6>
              ) : (
                <div className="films-icons">
                  {detailMetadata?.starships?.map((starship, idx) => {
                    return (
                      <a
                        key={starship}
                        href={starship}
                        target="_blank"
                        className="common-icons"
                      >
                        <Tooltip tooltipText={`Star Ship ${idx + 1}`}>
                          <GiSpaceship size={25} />
                        </Tooltip>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="close-button">
          <RxCross2 onClick={onClose} size={30} />
        </div>

        {renderData()}
      </div>
    </div>
  );
};

export default Detail;
