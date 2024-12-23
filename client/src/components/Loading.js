import React, { memo } from "react";
import { HashLoader } from "react-spinners";
const Loading = () => {
  return (
    <HashLoader
      color="#000"
      loading={true}
      size={100}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default memo(Loading);
