import { useNavigate } from "@reach/router";
import React from "react";

export const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/123", { replace: true })}>
        New Game
      </button>
    </>
  );
};
