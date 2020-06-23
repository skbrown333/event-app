import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

/* Components */
import { Button } from "antd";
import UilPlus from "@iconscout/react-unicons/icons/uil-plus";

/* Styles */
import "./_header.scss";

/**
 * Header component
 *
 * @example
 * <Header />
 */
export const Header: FunctionComponent = () => {
  return (
    <header id="ea-header" className="header">
      <Link to="/event/create" className="header__create-button">
        <Button type="primary" icon={<UilPlus color="#FFF" />} size="large">
          Create Event
        </Button>
      </Link>
    </header>
  );
};
