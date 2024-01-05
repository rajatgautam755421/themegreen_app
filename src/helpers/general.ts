import { PEOPLE, PLANETS } from "./common";

export type User = {
  email: string;
  favorites: any[];
  loggedIn: boolean;
};

export const getAllUsers = () => {
  const users: string = localStorage.getItem("users") || "";
  if (users) {
    return JSON.parse(users);
  }
  return [];
};

export const deleteUserFormStorage = (userEmail: string) => {
  let users = getAllUsers();
  users = users.filter((user: any) => user?.email !== userEmail);
  localStorage.setItem("users", JSON.stringify(users));
};

export const updateUserList = (userData: any) => {
  let users = getAllUsers();
  userData = {
    ...userData,
    favorites: userData?.favorites || [],
    loggedIn: userData?.loggedIn ?? true,
  };
  users = [...users, userData];
  localStorage.setItem("users", JSON.stringify(users));
};

export const userAlreadyExists = (userEmail: string) => {
  const users = getAllUsers();

  return users.some((user: any) => user?.email === userEmail);
};

export const handleLogin = (userEmail: string) => {
  const user = getAllUsers()?.find((user: any) => user?.email === userEmail);
  user.loggedIn = true;
  deleteUserFormStorage(userEmail);
  updateUserList(user);
};

export const handleLogout = () => {
  const user = getUserData();
  user.loggedIn = false;
  deleteUserFormStorage(user?.email);
  updateUserList(user);
  window.location.reload();
};

export const isAuthenticated = (): boolean => {
  const users = getAllUsers();
  return users.some((user: any) => user?.loggedIn);
};

export function getUserData() {
  const users = getAllUsers() || [];
  return users.find((user: any) => user?.loggedIn) || null;
}

export const updateFavoritesToStorage = (
  userEmail: string,
  updatedFavorites: object[]
) => {
  const user = [...getAllUsers()]?.find(
    (user: any) => user?.email === userEmail
  );
  user.favorites = [...updatedFavorites];
  deleteUserFormStorage(userEmail);
  console.log(user);
  updateUserList(user);
};

export const passwordMatchInLogin = (userEmail: string, password: string) => {
  const user = getAllUsers().find((user: any) => user?.email === userEmail);
  if (user?.password === password) {
    return true;
  }
  return false;
};

export const aggregatedResult = (
  queryResults: object[],
  selectValue: string,
  sliderValue: number,
  searchQuery: string,
  sortByCreated: boolean
) => {
  const filteredResults = queryResults.map((response: any) => {
    if (
      typeof response.data === "object" &&
      response.data !== null &&
      "results" in response.data
    ) {
      return (response.data as any).results;
    }
    return null;
  });

  return filteredResults
    .map((response: any[], index: number) => {
      let secondIndexLength = filteredResults[1]?.length;

      return response
        ?.slice(0, index === 0 ? (secondIndexLength >= 10 ? 8 : undefined) : 7)
        ?.map((r: object) =>
          index === 0 ? { ...r, category: PEOPLE } : { ...r, category: PLANETS }
        );
    })
    .flat(1)
    .toSorted((response1: any, response2: any) => {
      const date1: number | null = response1?.created
        ? new Date(response1.created).getTime()
        : null;
      const date2: number | null = response2?.created
        ? new Date(response2.created).getTime()
        : null;
      return sortByCreated && date1 && date2 ? date1 - date2 : 0;
    })
    .filter((response: any) => {
      if (response?.name?.toLowerCase().includes(searchQuery?.toLowerCase()))
        if (response?.films?.length >= sliderValue) {
          if (selectValue === "All") {
            return true;
          } else {
            return response?.category === selectValue;
          }
        }
      return false;
    });
};

export const filterFavoriteData = (
  data: object[],
  selectValue: string,
  sliderValue: number,
  searchQuery: string,
  sortByCreated: boolean
) => {
  return data
    .toSorted((response1: any, response2: any) => {
      const date1: number | null = response1?.created
        ? new Date(response1.created).getTime()
        : null;
      const date2: number | null = response2?.created
        ? new Date(response2.created).getTime()
        : null;
      return sortByCreated && date1 && date2 ? date1 - date2 : 0;
    })
    .filter((response: any) => {
      if (response?.name?.toLowerCase().includes(searchQuery?.toLowerCase()))
        if (response?.films?.length >= sliderValue) {
          if (selectValue === "All") {
            return true;
          } else {
            return response?.category === selectValue;
          }
        }
      return false;
    });
};
