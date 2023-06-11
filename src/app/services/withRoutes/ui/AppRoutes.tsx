import React, {FC} from "react";
import {Route, Routes} from "react-router-dom";
import {appPathTree} from "../model/routeTree";
import {Search} from "pages/Search";
import Garage from "pages/Garage";
import FavouritesAds from "pages/Favourites";
import {Advertisement} from "pages/Advertisement";
import PersonalCabinet from "pages/PersonalCabinet";
import {Review} from "pages/Review";
import {UserProfile} from "pages/UserProfile";
import {MainPage} from "pages/Main";
import {Reviews} from "pages/Reviews";
import {CarGeneration} from "pages/CarGeneration/ui/CarGeneration";
import {CarBrend} from "pages/CarBrend";
import {CarModel} from "pages/CarModel";
import {CarCharacteristics} from "pages/CarCharacteristics/ui/CarCharacteristics";
import {Compare} from "pages/Compare";
import {CreateReview} from "pages/CreateReview/ui/CreateReview";
import {CreateAdvertisement} from "pages/CreateAdvertisement";
import {Chat} from "pages/Chat";
import {MyReviews} from "pages/MyReviews";
import {Test} from "pages/Test";
import {Administration, AdministrationDataManagement, AdministrationUserManagement} from "pages/Administration";
import {SaveTestResults} from "pages/SavedTestResults";


export const Router: FC = () => {
    return <Routes>
        <Route path={appPathTree.init.getKey()} element={<MainPage/>}/>
        <Route path={appPathTree.search.getKey()} element={<Search/>}/>
        <Route path={appPathTree.garage.getKey()} element={< Garage/>}/>
        <Route path={appPathTree.reviews.getKey()} element={<Reviews/>}/>
        <Route path={appPathTree.favourites.getKey()} element={<FavouritesAds/>}/>
        <Route path={appPathTree.advertisement._key_().getKey()} element={<Advertisement/>}/>
        <Route path={appPathTree.cabinet.getKey()} element={<PersonalCabinet/>}/>
        <Route path={appPathTree.car.generation._key_().getKey()} element={<CarGeneration/>}/>
        <Route path={appPathTree.car.brend._key_().getKey()} element={<CarBrend/>}/>
        <Route path={appPathTree.car.model._key_().getKey()} element={<CarModel/>} />
        <Route path={appPathTree.car.technical.getKey()} element={<CarCharacteristics/>}/>
        <Route path={appPathTree.reviews._key_().getKey()} element={<Review/>}/>
        <Route path={appPathTree.user._key_().getKey()} element={<UserProfile/>}/>
        <Route path={appPathTree.compare.getKey()} element={<Compare/>}/>
        <Route path={appPathTree.reviews.create.getKey()} element={<CreateReview/>}/>
        <Route path={appPathTree.advertisement.create.getKey()} element={<CreateAdvertisement/>}/>
        <Route path={appPathTree.chat.getKey()} element={<Chat/>}/>
        <Route path={appPathTree.chat._key_().getKey()} element={<Chat/>}/>
        <Route path={appPathTree.reviews.me.getKey()} element={<MyReviews/>}/>
        <Route path={appPathTree.test.getKey()} element={<Test/>}/>
        <Route path={appPathTree.administration.getKey() } element={<Administration/>}/>
        <Route path={appPathTree.administration.dataOperation.getKey()} element={<AdministrationDataManagement/>} />
        <Route path={appPathTree.administration.userManagement.getKey()} element={<AdministrationUserManagement/>} />
        <Route path={appPathTree.saved_tests.getKey()} element={<SaveTestResults/>}/>
    </Routes>
}