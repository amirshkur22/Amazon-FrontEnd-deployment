import React, { useContext, useReducer } from "react";
import { Link } from "react-router-dom";
import amazonLogo from "../../assets/images/amazonLogo.png";
import usaFlag from "../../assets/images/usaFlag.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import navStyles from "./nav.module.css";
import LowerNav from "./LowerNav";
import { DataContext } from "../../App";
import { auth } from "../../Utility/firebase";
const Nav = () => {
  const [{ cart, user }, dispatch] = useContext(DataContext);
  const totalItem = cart?.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);

  return (
    <header className={navStyles.stickyContainer}>
      <nav className={navStyles.navBarWrapper}>
        <div className={navStyles.LeftSide}>
          <Link to="/">
            <img src={amazonLogo} alt="amazonLogo" width={100} />
          </Link>
          <div className={navStyles.SlLocationPin}>
            <span>
              <SlLocationPin />
            </span>
            <div className={navStyles.delivery}>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className={navStyles.middlePart}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <BsSearch className={navStyles.BsSearch} size={27} />
        </div>
        <div className={navStyles.rightSide}>
          <Link className={navStyles.coutrySelection} to="/">
            <img src={usaFlag} alt="" width={20} />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </Link>
          <Link to={!user && "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello, {user?.email?.split("@")[0]}</p>
                  <span onClick={()=>auth.signOut()}>Sign out</span>
                </>
              ) : (
                <>
                  <p>Hello, sign in</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>
          <Link to="/order">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
          <div className={navStyles.lastFlex}>
            <Link to="/cart" className={navStyles.verticalFlex}>
              <span className={navStyles.cartCount}>{totalItem}</span>

              <BiCart className={navStyles.BiCart} size={35} />
            </Link>
            <p className={navStyles.cart}>Cart</p>
          </div>
        </div>
      </nav>
      <LowerNav />
    </header>
  );
};

export default Nav;
