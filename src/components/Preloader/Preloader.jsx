import React from "react";
import "./Preloader.scss";
import { useSelector } from "react-redux";

export const Preloader = () => {
  const { preloader } = useSelector((state) => state.sendDocsSlice);
  const { preloaderSel } = useSelector((state) => state.selectsSlice);
  const { preloaderAuth } = useSelector((state) => state.authSlice);
  const { preloaderHis } = useSelector((state) => state.historyIsks);
  const { preloaderArh } = useSelector((state) => state.archiveSlice);

  if (
    preloaderAuth ||
    preloaderSel ||
    preloader ||
    preloaderHis ||
    preloaderArh
  ) {
    return (
      <div className="preloader">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
};
