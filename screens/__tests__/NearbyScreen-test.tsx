import React from "react";
import { renderWithRedux } from "../../services/TestHelper";
import NearbyScreen from "../NearbyScreen";
import "../../common/String.extension";

test(`NearbyScreen`, async () => {
  renderWithRedux(<NearbyScreen />);
});
