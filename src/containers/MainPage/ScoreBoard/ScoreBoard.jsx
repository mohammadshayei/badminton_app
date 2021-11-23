import React from "react";
import { useTheme } from "../../../styles/ThemeProvider";
import FooterScoreBoard from "./FooterScoreBoard/FooterScoreBoard";
import PlayerBlock from "./PlayerBlock/PlayerBlock";
import DetailScoreBoard from "./DetailScoreBoard/DetailScoreBoard";
import "./ScoreBoard.scss";

const ScoreBoard = (props) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div
      className="scoreboard-container"
      style={{
        background: `linear-gradient(200deg,${theme.primary},${theme.primary_variant})`,
        color: theme.on_primary,
      }}
    >
      <PlayerBlock
        titleTop={"بازیکن شماره 1"}
        score="11"
        scoreColor="blue"
        isBall={true}
        player={"1"}
      />
      <DetailScoreBoard time="09:21" teamBScore={0} teamAScore={1} />
      <PlayerBlock
        titleTop={"بازیکن شماره 2"}
        score="20"
        scoreColor="black"
        isBall={false}
        player={"2"}
      />
      <FooterScoreBoard />
    </div>
  );
};

export default ScoreBoard;
