import React, { useContext } from "react";

import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import { AuthContext } from "../../Store/context";
import { failed, success } from "../../helpers/toastify";
import { ToastContainer } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../firbase/config";
import { useNavigate, NavLink } from "react-router-dom";

function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const Out = async () => {
    try {
      await signOut(auth);
      success("singOut successfully");
      console.log("singOuted successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      failed(error.message);
    }
  };
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        {user ? (
          user.displayName
        ) : (
          <div className="loginPage">
            <NavLink to={"/login"}>
              <button className="login-btn"> Login</button>
            </NavLink>
            <hr />
          </div>
        )}
        {user && (
          <div>
            <button className="logOut" onClick={Out}>
              Log out
            </button>
          </div>
        )}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <NavLink to={"/create"}>
              <span>SELL</span>
            </NavLink>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

const MemoizedHeader = React.memo(Header);

export default MemoizedHeader;
