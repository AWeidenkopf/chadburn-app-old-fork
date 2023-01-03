import React from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

export const Landing = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/${uuidv4()}`, { replace: true });
  };

  return (
    <>
      <button onClick={onClick}>New Game</button>
    </>
  );
};
