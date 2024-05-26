import React from "react";
import LowerNavStyles from "./nav.module.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
const LowerNav = () => {
  return (
    <div className={LowerNavStyles.lowerNavContainer}>
      <ul className={LowerNavStyles.listConatiner}>
        <li>
          <MenuOutlinedIcon />
          <p>All</p>
        </li>
        <li>Today's Deals</li>
        <li>Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
};

export default LowerNav;
