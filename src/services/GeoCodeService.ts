import axios from "axios";

class GeoCodeService {
  getPlaces = async (search: string) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
      search
    )}.json`;
    const res = await axios.get(url, {
      params: {
        access_token: process.env.REACT_APP_MAPBOX_API_KEY,
      },
    });
    return res.data;
  };
}

export default new GeoCodeService();
