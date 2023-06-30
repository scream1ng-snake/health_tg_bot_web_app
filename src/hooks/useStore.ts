import React from "react";
import { StoreContext } from "../store/StoreProvider";

export const useStore = () => React.useContext(StoreContext);