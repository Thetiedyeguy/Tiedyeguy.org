import React from "react";
import UpdateRestaurant from "../components/Yelp/UpdateRestaurant";
import DropdownMenu from "../components/DropDownMenu";

const UpdatePage = () => {
  return (
    <div>
      <DropdownMenu/>
      <h1 className="text-center">Update Restaurant</h1>
      <UpdateRestaurant />
    </div>
  );
};

export default UpdatePage;
