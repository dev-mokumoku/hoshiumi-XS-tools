
import BoardArea from "./BoardArea";

export default function OpponentBoard({
  deck,
  hand,
  playArea,
  trashArea,
  tacticsArea,
  tacticsDeck,
  pp,
  setHand,
  onHandLongPressToTrash,
  onPlayLongPressToTrash,
  onTrashLongPressToHand,

  drawStartingHand,
  drawCard,
  resetGame,
  moveSelectedToTrash,
  linkAssault,
  endTurn,
  endRound,
  onLinkAssaultTrash,

  playCard,
  returnToHand,

  moveTacticToArea,
  moveTacticToPlayArea,
  onOpenTactics,

  increasePP,
  decreasePP,
}) {
  return (
    <BoardArea
      deck={deck}
      hand={hand}
      playArea={playArea}
      trashArea={trashArea}
      tacticsArea={tacticsArea}
      tacticsDeck={tacticsDeck}
      pp={pp}
      setHand={setHand}
      onHandLongPressToTrash={onHandLongPressToTrash}
      onPlayLongPressToTrash={onPlayLongPressToTrash}
      onTrashLongPressToHand={onTrashLongPressToHand}

      drawStartingHand={drawStartingHand}
      drawCard={drawCard}
      resetGame={resetGame}
      moveSelectedToTrash={moveSelectedToTrash}
      linkAssault={linkAssault}
      endTurn={endTurn}
      endRound={endRound}
      onLinkAssaultTrash={onLinkAssaultTrash}

      playCard={playCard}
      returnToHand={returnToHand}

      moveTacticToArea={moveTacticToArea}
      moveTacticToPlayArea={moveTacticToPlayArea}
      onOpenTactics={onOpenTactics}

      increasePP={increasePP}
      decreasePP={decreasePP}
    />
  );
}
