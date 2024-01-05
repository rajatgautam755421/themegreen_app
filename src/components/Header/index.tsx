import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDashboard, AiOutlineHome } from "react-icons/ai";
import { CiFilter } from "react-icons/ci";
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "../../common/tooltip/Tooltip";
import {
  getUserData,
  handleLogout,
  isAuthenticated,
} from "../../helpers/general";
import Filter from "../filter";
import "./header.scss";
import { SECONDARY_COLOR } from "../../helpers/common";

type HeaderProps = {
  selectValue: string;
  onSelectValueChange: (value: string) => void;
  sliderValue: number;
  onSliderValueChange: (value: number) => void;
  disableFilter: boolean;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  onSortByCreatedValueChange: (value: boolean) => void;
  sortByCreated: boolean;
};

const Header: React.FC<HeaderProps> = ({
  selectValue,
  onSelectValueChange,
  sliderValue,
  onSliderValueChange,
  disableFilter,
  searchQuery,
  onSearchQueryChange,
  sortByCreated,
  onSortByCreatedValueChange,
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [filterOptions, setFilterOptions] = useState<object | null>(null);
  const [headerheight, setHeaderHeight] = useState<number | null>();
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }

    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className="header" ref={headerRef}>
        {/* Home Icon */}
        <Link to={"/"}>
          <div className="icon home-icon">
            <Tooltip tooltipText="Home">
              <AiOutlineHome
                size={30}
                color={pathname === "/" ? SECONDARY_COLOR : "white"}
              />
            </Tooltip>
          </div>
        </Link>

        {/* Dashboard Icon */}

        {isAuthenticated() && (
          <Link to={"/dashboard"}>
            <div className="icon dashboard-icon">
              <Tooltip tooltipText="Dashboard">
                <AiOutlineDashboard
                  size={30}
                  color={pathname === "/dashboard" ? SECONDARY_COLOR : "white"}
                />
              </Tooltip>
            </div>
          </Link>
        )}

        {/* Search Bar */}
        <div className={`search-bar ${disableFilter && "disable-filter"}`}>
          <input
            type="text"
            placeholder="Search By Name..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
          />
          <div className="icon">
            <Tooltip tooltipText="Filter">
              <CiFilter
                size={30}
                color={filterOptions ? SECONDARY_COLOR : "white"}
                className="filter-icon"
                onClick={() =>
                  setFilterOptions((prevOption) =>
                    Boolean(prevOption) ? null : {}
                  )
                }
              />
            </Tooltip>
          </div>

          <div className="icon">
            <Tooltip tooltipText={isAuthenticated() ? `Logout` : "Login"}>
              {isAuthenticated() ? (
                <IoIosLogOut
                  size={25}
                  onClick={() => {
                    handleLogout();
                  }}
                />
              ) : (
                <IoIosLogIn
                  size={25}
                  onClick={() => {
                    navigate("login");
                  }}
                />
              )}
            </Tooltip>
          </div>
        </div>
      </header>
      {filterOptions && (
        <Filter
          open={filterOptions !== null}
          headerHeight={headerheight}
          selectValue={selectValue}
          sliderValue={sliderValue}
          onSliderValueChange={onSliderValueChange}
          onSelectValueChange={onSelectValueChange}
          disableFilter={disableFilter}
          sortByCreated={sortByCreated}
          onSortByCreatedValueChange={onSortByCreatedValueChange}
        />
      )}
    </>
  );
};

export default React.memo(Header);
