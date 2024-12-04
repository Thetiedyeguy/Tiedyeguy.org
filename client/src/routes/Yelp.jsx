import React from 'react';
import YelpHeader from '../components/Yelp/YelpHeader';
import AddRestaurant from '../components/Yelp/AddRestaurant';
import RestaurantList from '../components/Yelp/RestaurantList';

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