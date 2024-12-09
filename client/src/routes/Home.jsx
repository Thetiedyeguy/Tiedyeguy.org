import React from 'react';
import Header from '../components/Header';
import LinkList from '../components/LinkList';
import DropdownMenu from "../components/DropDownMenu";
import Contacts from '../components/Contacts';

const Home = () => {
  return (
    <div>
        <DropdownMenu/>
        <Header/>
        <LinkList/>
        <Contacts/>
    </div>
  );
};

export default Home;