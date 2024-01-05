import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundry";
import Header from "../components/Header";
import Auth from "../components/auth";
import Dashboard from "../components/dashboard";
import DataListing from "../components/data-listing";
import Detail from "../components/detail";
import { useMultipleApiData } from "../helpers/api";
import { API_URL, PEOPLE, PLANETS } from "../helpers/common";
import { aggregatedResult, filterFavoriteData } from "../helpers/general";
import { useFavorites } from "../hooks/useFavourite";

type TotalAvailableCount = {
  [PEOPLE]: number | undefined;
  [PLANETS]: number | undefined;
};

const AppRoutes = () => {
  const { pathname } = useLocation();
  const { favorites } = useFavorites();
  const [selectValue, setSelectvalue] = useState<string>("All");
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortByCreated, setSortByCreated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailMetadata, setDetailMetadata] = useState<object | null>(null);
  const [totalAvailableCount, setTotalAvailableCount] =
    useState<TotalAvailableCount>({
      [PEOPLE]: 0,
      [PLANETS]: 0,
    });

  const queryResults = useMultipleApiData(
    [
      {
        key: "People",
        endpoint: `${API_URL}people/?page=${currentPage}`,
        dependency: currentPage,
      },
      {
        key: "Planets",
        endpoint: `${API_URL}planets?page=${currentPage}`,
        dependency: currentPage,
      },
    ].filter((query) => {
      if (currentPage > 1) {
        const key = query.key as keyof TotalAvailableCount;
        const availableCount = totalAvailableCount[key] ?? 0;

        return currentPage <= Math.ceil(availableCount / 10);
      }
      {
        return true;
      }
    })
  );

  const isLoading: boolean = useMemo(() => {
    return queryResults.some((result) => result.status === "loading");
  }, [queryResults]);

  const isError: boolean = useMemo(() => {
    return queryResults.some((result) => result.status === "error");
  }, [queryResults]);

  if (isError) {
    throw new Error();
  }

  const aggregatedData = useMemo(() => {
    return aggregatedResult(
      queryResults,
      selectValue,
      sliderValue,
      searchQuery,
      sortByCreated
    );
  }, [queryResults, selectValue, sliderValue, searchQuery]);

  const updatedFavourites = useMemo(() => {
    return filterFavoriteData(
      favorites,
      selectValue,
      sliderValue,
      searchQuery,
      sortByCreated
    );
  }, [selectValue, sliderValue, searchQuery, sortByCreated, favorites]);

  const onSliderValueChange = useCallback(
    (newValue: number) => {
      return setSliderValue(newValue);
    },
    [sliderValue]
  );

  const onSelectValueChange = useCallback(
    (newValue: string) => {
      return setSelectvalue(newValue);
    },
    [selectValue]
  );

  const onSearchQueryChange = useCallback(
    (query: string) => {
      return setSearchQuery(query);
    },
    [searchQuery]
  );

  const onSortByCreatedValueChange = useCallback(
    (newValue: boolean) => {
      setSortByCreated(newValue);
    },
    [sortByCreated]
  );

  const onModalMetadatChange = useCallback(
    (value: object | null) => {
      return setDetailMetadata(value);
    },
    [detailMetadata]
  );

  // Seeding the users

  useLayoutEffect(() => {
    const users = localStorage.getItem("users");
    if (!users) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (!totalAvailableCount?.[PEOPLE] || !totalAvailableCount?.[PLANETS]) {
      setTotalAvailableCount({
        ...totalAvailableCount,
        [PEOPLE]: queryResults[0]?.data?.count,
        [PLANETS]: queryResults[1]?.data?.count,
      });
    }
  }, [isLoading]);

  return (
    <>
      <Toaster />
      {!pathname.includes("login") && (
        <Header
          sliderValue={sliderValue}
          selectValue={selectValue}
          onSliderValueChange={onSliderValueChange}
          onSelectValueChange={onSelectValueChange}
          disableFilter={pathname.includes("/dashboard") ? false : isLoading}
          searchQuery={searchQuery}
          onSearchQueryChange={onSearchQueryChange}
          sortByCreated={sortByCreated}
          onSortByCreatedValueChange={onSortByCreatedValueChange}
        />
      )}
      <Detail
        isOpen={Boolean(detailMetadata)}
        detailMetadata={detailMetadata}
        onClose={() => {
          onModalMetadatChange(null);
        }}
      />

      <Routes>
        <Route
          element={
            <>
              <ErrorBoundary>
                <Auth />
              </ErrorBoundary>
            </>
          }
          path="/login"
        />

        <Route
          element={
            <>
              <ErrorBoundary>
                <DataListing
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  aggregatedData={aggregatedData}
                  isLoading={isLoading}
                  onModalMetadatChange={onModalMetadatChange}
                  totalAvailableCount={totalAvailableCount}
                />
              </ErrorBoundary>
            </>
          }
          path="/"
        />

        <Route
          element={
            <>
              <ErrorBoundary>
                <Dashboard
                  updatedFavourites={updatedFavourites}
                  onModalMetadatChange={onModalMetadatChange}
                />
              </ErrorBoundary>
            </>
          }
          path="/dashboard"
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
