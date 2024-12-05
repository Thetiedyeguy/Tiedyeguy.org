import React from 'react';
import YelpHeader from '../components/Yelp/YelpHeader';
import AddRestaurant from '../components/Yelp/AddRestaurant';
import RestaurantList from '../components/Yelp/RestaurantList';
import DropdownMenu from '../components/DropDownMenu';

const Yelp = () => {
  return (
    <div>
        <DropdownMenu/>
        <YelpHeader/>
        <AddRestaurant/>
        <RestaurantList/>
    </div>
  );
};

export default Yelp;