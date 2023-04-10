import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {appPathTree} from "../model/routeTree";
import {Search} from "pages/Search";
import Garage from "pages/Garage";
import FavouritesAds from "pages/Favourites";
import {Advertisement} from "pages/Advertisement";
import PersonalCabinet from "pages/PersonalCabinet";
import {Model} from "pages/Model";
import {ConcreteModel} from "../../../../pages/ConcretModel";
import {Review} from "../../../../pages/Review";
import {UserProfile} from "../../../../pages/UserProfile";
import {MainPage} from "../../../../pages/Main";
import {Reviews} from "../../../../pages/Reviews";

export const Router: FC = () => {
    return <Routes>
        <Route path={appPathTree.init.getKey()} element={<MainPage/>}/>
        <Route path={appPathTree.search.getKey()} element={<Search/>}/>
        <Route path={appPathTree.garage.getKey()} element={< Garage/>}/>
        <Route path={appPathTree.reviews.getKey()} element={<Reviews/>}/>
        <Route path={appPathTree.favourites.getKey()} element={<FavouritesAds/>}/>
        <Route path={appPathTree.advertisement._key_().getKey()} element={<Advertisement/>}/>
        <Route path={appPathTree.cabinet.getKey()} element={<PersonalCabinet/>}/>
        <Route path={appPathTree.model._key_().getKey()} element={<Model/>}/>
        <Route path={appPathTree.model.concrete.getKey()} element={<ConcreteModel/>}/>
        <Route path={appPathTree.reviews._key_().getKey()} element={<Review/>}/>
        <Route path={appPathTree.user._key_().getKey()} element={<UserProfile/>}/>
    </Routes>
}