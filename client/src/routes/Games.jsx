import React from "react";
import GameContent from "../components/Games/GameContent";
import DropdownMenu from "../components/DropDownMenu";

const Games = () => {
  return (
    <div>
      <DropdownMenu/>
      <h1 className="text-center">Games</h1>
      <GameContent/>
    </div>
  );
};

export default Games;