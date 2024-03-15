import React from "react";
import { useEffect } from "react";
import useAuth from "hooks/useAuth";
import Navbar from "Components/Navbar";
function Video() {
  const { userAuthenticate } = useAuth();
  useEffect(() => {
    userAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Navbar></Navbar>
    </div>
  );
}

export default Video;
