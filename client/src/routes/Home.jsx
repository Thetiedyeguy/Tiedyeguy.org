import React from 'react';
import LinkList from '../components/LinkList';
import DropdownMenu from "../components/DropDownMenu";
import Contacts from '../components/Contacts';

const Home = () => {
  return (
    <div>
        <DropdownMenu/>
        <LinkList/>
        <Contacts/>
    </div>
  );
};

export default Home;