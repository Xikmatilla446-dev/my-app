import React, { useEffect } from "react";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
import PageLoader from "../PageLoader";

const LazyLoad = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return <PageLoader />;
};
export default LazyLoad;
