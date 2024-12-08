import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UpdatePage from './routes/UpdatePage';
import DetailPage from './routes/DetailPage';
import Home from './routes/Home'
import Yelp from './routes/Yelp';
import Games from './routes/Games';
import { ContextProvider } from './context/Context';

const App = () => {
    return (
        <ContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                        <Route exact path = "/" Component={Home}/>
                        <Route exact path = "/yelp" Component={Yelp}/>
                        <Route exact path = "/games" Component={Games}/>
                        <Route exact path = "/yelp/restaurants/:id/update" Component={UpdatePage}/>
                        <Route exact path = "/yelp/restaurants/:id" Component={DetailPage}/>
                    </Routes>
                </Router>
            </div>
        </ContextProvider>
    )
};

export default App;