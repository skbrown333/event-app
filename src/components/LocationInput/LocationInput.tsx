import React, { FunctionComponent, useState } from "react";

/* Components */
import { AutoComplete } from "antd";

/* Services */
import GeoCodeService from "../../services/GeoCodeService";

/* Styles */
import "./_location-input.scss";

export const LocationInput: FunctionComponent = () => {
  const [searchResults, setSearhResults] = useState([]);

  async function search(value: string) {
    let data = await GeoCodeService.getPlaces(value);
    let results = data.features.map((f) => {
      f["value"] = f.place_name;
      return f;
    });
    setSearhResults(results);
  }
  return (
    <AutoComplete
      placeholder="Search..."
      options={searchResults}
      onChange={search}
      size="large"
      className="location-input"
    />
  );
};
