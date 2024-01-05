import { createContext, useEffect, useState } from "react";
import { getUserData, updateFavoritesToStorage } from "../helpers/general";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [favorites, setFavorites] = useState([]);

  const addOrRemoveFavorite = (item, add) => {
    const user = getUserData();
    setFavorites((prevFavorites) => {
      const itemName = item.name;
      if (add && !prevFavorites?.find((favItem) => favItem.name === itemName)) {
        const updatedFavourites = [...prevFavorites, item];

        updateFavoritesToStorage(user?.email, updatedFavourites);
        toast.success("Added To Favorite");
        return updatedFavourites;
      } else if (!add) {
        const updatedFavourites = prevFavorites.filter(
          (favItem) => favItem.name !== itemName
        );
        updateFavoritesToStorage(user?.email, updatedFavourites);
        toast.success("Removed From Favorite");
        return updatedFavourites;
      }
      return prevFavorites;
    });
  };

  const isItemInFavorites = (itemName) => {
    return favorites?.some((favItem) => favItem.name === itemName);
  };

  useEffect(() => {
    const user = getUserData();

    setFavorites(user?.favorites || []);
  }, [pathname]);

  const contextValue = {
    favorites,
    addOrRemoveFavorite,
    isItemInFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesProvider };
