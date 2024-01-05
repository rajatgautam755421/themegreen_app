import React, { useLayoutEffect } from "react";
import toast from "react-hot-toast";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useLocation } from "react-router-dom";
import Card from "../../common/card/Card";
import Loader from "../../common/loader/Loader";
import { PEOPLE, PLANETS } from "../../helpers/common";
import { getUserData, isAuthenticated } from "../../helpers/general";
import "./data-listing.scss";

type DataListingProps = {
  aggregatedData: object[];
  isLoading: boolean;
  currentPage: number;
  setCurrentPage: (newValue: number) => void;
  onModalMetadatChange?: (newValue: null | object) => void;
  totalAvailableCount: {
    [PEOPLE]?: number;
    [PLANETS]?: number;
  };
};

const DataListing: React.FC<DataListingProps> = ({
  aggregatedData,
  isLoading,
  currentPage,
  setCurrentPage,
  onModalMetadatChange,
  totalAvailableCount = {},
}) => {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.state?.welcome === true) {
      toast.success(`Welcome ${getUserData()?.email}`);
    }

    return () => {
      location.state = null;
    };
  }, []);

  return (
    <>
      <div className="page-padding">
        {!aggregatedData?.length && !isLoading && (
          <h3 className="no-results">No Results To Show.</h3>
        )}
        <div className="card-container">
          {isLoading &&
            Array(15)
              .fill(0)
              .map(() => (
                <div className="card">
                  <Loader />
                </div>
              ))}
          {aggregatedData &&
            !isLoading &&
            aggregatedData.map((data: any) => {
              return (
                <Card
                  data={data}
                  showAddToFavourite={isAuthenticated()}
                  key={data?.name}
                  onModalMetadatChange={onModalMetadatChange}
                />
              );
            })}
        </div>
        {!isLoading && aggregatedData?.length && (
          <div className="data-pagination">
            <ResponsivePagination
              navClassName="active-page"
              current={currentPage}
              total={
                totalAvailableCount[PEOPLE]
                  ? Math.ceil(totalAvailableCount[PEOPLE] / 10)
                  : 0
              }
              onPageChange={(newPage) => {
                setCurrentPage(newPage);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(DataListing);
