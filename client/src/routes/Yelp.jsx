import React from 'react';
import YelpHeader from '../components/YelpHeader';
import AddRestaurant from '../components/AddRestaurant';
import RestaurantList from '../components/RestaurantList';

const Yelp = () => {
  return (
    <div>
        <YelpHeader/>
        <AddRestaurant/>
        <RestaurantList/>
    </div>
  );
};

export default Yelp;