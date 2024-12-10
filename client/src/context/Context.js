import React, { useEffect, useState, createContext, useContext } from "react";
import UserFinder from "../apis/UserFinder";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [user, setUser] = useState(null);

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      UserFinder
        .get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser(response.data.data.user))
        .catch((error) => console.error('Error fetching user profile:', error));
    }
  }, []);

  return (
    <Context.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        user,
        setUser,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const useUser = () => useContext(Context);
