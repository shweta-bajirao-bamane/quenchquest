import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { message } from "antd";
import { resetContactState } from "./slices/contactSlice";

const GlobalNotifier = () => {
  const dispatch = useDispatch();
  const { success, error } = useSelector((state) => state.contact);

  useEffect(() => {
    if (success) {
      message.success(success);
      dispatch(resetContactState()); // clear message after showing
    }
    if (error) {
      message.error(error);
      dispatch(resetContactState()); // clear message after showing
    }
  }, [success, error, dispatch]);

  return null; // this component doesn't render anything
};

export default GlobalNotifier;
