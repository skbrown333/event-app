import React, { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";

/* Components */
import { Button, Avatar } from "antd";
import UilPlus from "@iconscout/react-unicons/icons/uil-plus";

/* Store */
import { Context } from "../../store/Store";

/* Styles */
import "./_header.scss";
import { LocationInput } from "../LocationInput/LocationInput";

/**
 * Header component
 *
 * @example
 * <Header />
 */
export const Header: FunctionComponent = () => {
  const [context] = useContext(Context);

  return (
    <header id="ea-header" className="header">
      <LocationInput />
      <Link to="/event/create" className="header__create-button">
        <Button type="primary" icon={<UilPlus color="#FFF" />} size="large">
          Create Event
        </Button>
      </Link>
      {context.user && context.user.photoURL ? (
        <Avatar src={context.user.photoURL} size="large"></Avatar>
      ) : (
        <Avatar
          style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          size="large"
        >
          U
        </Avatar>
      )}
    </header>
  );
};
