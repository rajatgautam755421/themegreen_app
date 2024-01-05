import React from "react";
import Card from "../../common/card/Card";
import withAuth from "../hoc/withAuth";
import { getUserData } from "../../helpers/general";

type DashboardProps = {
  updatedFavourites: object[];
  onModalMetadatChange: (value: null | object) => void;
};

const Dashboard: React.FC<DashboardProps> = ({
  updatedFavourites,
  onModalMetadatChange,
}) => {
  return (
    <div className="page-padding">
      <h2 className="favorite-header">{getUserData()?.email}'s Favorites</h2>
      {!updatedFavourites?.length && (
        <h3 className="no-results">No Results To Show.</h3>
      )}
      <div className="card-container">
        {updatedFavourites?.map((favorite: any) => {
          return (
            <Card
              data={favorite}
              showAddToFavourite={true}
              key={favorite?.name}
              onModalMetadatChange={onModalMetadatChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
