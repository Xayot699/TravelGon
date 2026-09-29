import {Routes,Route} from "react-router-dom";
import {HomePage} from "../../features/home/pages/HomePage";
import {ToursPage} from "../../features/tours/pages/ToursPage";
import {TourPage} from "../../features/tours/pages/TourPage";
import {BookingsPage} from "../../features/bookings/pages/BookingsPage";
import {AuthPage} from "../../features/auth/pages/AuthPage";
import {AdminPage} from "../../features/admin/pages/AdminPage";
import {SiteLayout} from "../../shared/layout/SiteLayout";

export function AppRouter(){
 return <Routes>
   <Route path="/admin" element={<AdminPage/>}/>
   <Route path="*" element={<SiteLayout><Routes>
     <Route path="/" element={<HomePage/>}/>
     <Route path="/tours" element={<ToursPage/>}/>
     <Route path="/tours/:id" element={<TourPage/>}/>
     <Route path="/bookings" element={<BookingsPage/>}/>
     <Route path="/auth" element={<AuthPage/>}/>
   </Routes></SiteLayout>}/>
 </Routes>
}