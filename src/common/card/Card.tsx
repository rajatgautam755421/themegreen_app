import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { SECONDARY_COLOR } from "../../helpers/common";
import { useFavorites } from "../../hooks/useFavourite";
import Badge from "../badge/Badge";
import "./card.scss";

type CardProps = {
  data: any;
  showAddToFavourite?: boolean;
  onModalMetadatChange?: (newValue: null | object) => void;
};

const Card: React.FC<CardProps> = ({
  data,
  showAddToFavourite = true,
  onModalMetadatChange,
}) => {
  const { addOrRemoveFavorite, isItemInFavorites } = useFavorites();
  return (
    <div
      className="card"
      onClick={() => onModalMetadatChange && onModalMetadatChange(data)}
    >
      <div className="p-1">
        <Badge text={data?.category} />
      </div>
      {showAddToFavourite && (
        <div
          className="favourite"
          onClick={(e) => {
            e.stopPropagation();
            addOrRemoveFavorite(data, !isItemInFavorites(data?.name));
          }}
        >
          {!isItemInFavorites(data?.name) ? (
            <CiHeart size={30} />
          ) : (
            <FaHeart size={30} color={SECONDARY_COLOR} />
          )}
        </div>
      )}

      <div className="card-content">
        <h3 className="card-title">{data?.name}</h3>
        <p className="card-description">{data?.description}</p>
      </div>
    </div>
  );
};

export default React.memo(Card);
