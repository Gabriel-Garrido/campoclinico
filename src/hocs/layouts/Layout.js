import React, { useEffect } from "react";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import { connect } from "react-redux";
import { loadUser, refreshAccessToken } from "redux/actions/auth/auth";

function Layout({ children, isAuthenticated, user, loadUser, refreshAccessToken }) {
  useEffect(() => {
    if (isAuthenticated && !user) {
      loadUser();
    }

    if (!isAuthenticated && localStorage.getItem("refresh")) {
      refreshAccessToken();
    }
  }, [isAuthenticated, user, loadUser, refreshAccessToken]);

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { loadUser, refreshAccessToken })(Layout);
