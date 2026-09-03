import { Route, Routes } from "react-router-dom";
import Overview from "../Section/Overview/Overview";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import Layout from "../Section/Layout/Layout";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import CreateSall from "../Section/sall-management/Create-sall";
import MyProducts from "../Section/sall-management/MyProducts";
import Products from "../Section/sall-management/Products";
import CityGrid from "../components/Dashboard/CityGrid";
import MarketList from "../components/Dashboard/MarketList";
import MarketDetail from "../components/Dashboard/MarketDetail";
import Profile from "../Section/Profile/Profile.tsx";
import RequireSellingAccount from "../Section/Profile/RequireSellingAccount";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<CityGrid />} />
        <Route path="profile" element={<Profile />} />
        <Route path="city/:city" element={<MarketList />} />
        <Route path="city/:city/:market" element={<MarketDetail />} />

        <Route
          path="sall-product"
          element={
            <RequireSellingAccount>
              <CreateSall />
            </RequireSellingAccount>
          }
        />
        <Route path="products" element={<Products />} />
        <Route
          path="my-product"
          element={
            <RequireSellingAccount>
              <MyProducts />
            </RequireSellingAccount>
          }
        />
      </Route>
    </Routes>
  );
}