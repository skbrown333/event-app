import React, { FunctionComponent } from "react";

/* Components */
import { CoverPhoto } from "../CoverPhoto/CoverPhoto";

/* Styles */
import "./_create-event.scss";

/**
 * Create Event page
 *
 * @example
 * <CreateEvent />
 */
export const CreateEvent: FunctionComponent = () => {
  return (
    <div id="ea-create-event">
      <CoverPhoto />
    </div>
  );
};
