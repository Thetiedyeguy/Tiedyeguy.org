import React from 'react';
import Header from '../components/Header';
import LinkList from '../components/LinkList';
import DropdownMenu from "../components/DropDownMenu";

const Home = () => {
  return (
    <div>
        <DropdownMenu/>
        <Header/>
        <LinkList/>
    </div>
  );
};

export default Home;