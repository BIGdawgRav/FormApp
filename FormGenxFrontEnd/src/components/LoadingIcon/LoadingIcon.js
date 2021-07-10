import React from "react";
import { TraceSpinner} from "react-spinners-kit";

function LoadingIcon() {
  return (
    <div className="d-flex container h-100 justify-content-center align-items-center vh-100">
      <div className="">
      return <TraceSpinner size={30} color="primary" loading={true} />
      </div>
    </div>
  );
}

export default LoadingIcon;
