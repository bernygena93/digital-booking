/** @format */

import { Route, Switch, BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";
import "../src/styles.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Drawer from "./components/Navbar/Drawer";
import Home from "./pages/Home";
import GlobalState from "./context/GlobalState";
import FilteredProductPage from "./pages/FilteredProductPage";
import ScrollToTop from "./components/ScrollToTop";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import VerificationRequest from "./pages/VerificationRequest";
import SuccessfulValidation from "./pages/SuccessfulValidation";
import AdminProduct from "./pages/AdminProduct";
import ResultMessage from "./pages/ResultMessage";
import NotFound from "./pages/NotFound";
import UserBookings from "./pages/UserBookings";
import "./styles.css";
import AdministrationPanel from "./pages/AdministrationPanel";

library.add(fab, fas, far);

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggle = (previous) => !previous;

  const drawerToggleClickHandler = () => {
    setDrawerOpen(toggle);
  };

  return (
    <>
      <GlobalState>
        <BrowserRouter>
          <ScrollToTop />
          <div className="container">
            <Navbar drawerToggle={drawerToggleClickHandler} />

            <Drawer
              drawerToggle={drawerToggleClickHandler}
              drawerOpen={drawerOpen}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/booking/:id/:type" component={ResultMessage} />
              <Route path="/booking/:id" component={Booking} />
              <Route path="/product/:id/:name" component={ProductDetail} />
              <Route path="/admin-product/:id" component={AdminProduct} />{" "}
              <Route
                path="/products/:filter/:type/:id"
                component={FilteredProductPage}
              />
              <Route path="/verification" component={VerificationRequest} />
              <Route
                path="/verifycode/:code"
                component={SuccessfulValidation}
              />
              <Route exact path="/bookings" component={UserBookings} />
              <Route
                exact
                path="/administration-panel/:data"
                component={AdministrationPanel}
              />
              <Route exact path="/**" component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </GlobalState>
    </>
  );
}

export default App;
