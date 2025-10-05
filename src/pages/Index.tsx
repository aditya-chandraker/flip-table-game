import { GameTable } from "@/components/GameTable";
import { CardColor, CardValue } from "@/components/Card";

const Index = () => {
  // Sample game state
  const currentPlayerCards: { color: CardColor; value: CardValue }[] = [
    { color: "red", value: "5" },
    { color: "blue", value: "7" },
    { color: "yellow", value: "2" },
    { color: "green", value: "skip" },
    { color: "red", value: "reverse" },
    { color: "blue", value: "9" },
    { color: "yellow", value: "1" },
  ];

  const topPlayerCards: { color: CardColor; value: CardValue }[] = [
    { color: "red", value: "5" },
    { color: "blue", value: "7" },
    { color: "yellow", value: "2" },
    { color: "green", value: "3" },
    { color: "red", value: "8" },
  ];

  const leftPlayerCards: { color: CardColor; value: CardValue }[] = [
    { color: "red", value: "5" },
    { color: "blue", value: "7" },
    { color: "yellow", value: "2" },
    { color: "green", value: "3" },
  ];

  const rightPlayerCards: { color: CardColor; value: CardValue }[] = [
    { color: "red", value: "5" },
    { color: "blue", value: "7" },
    { color: "yellow", value: "2" },
    { color: "green", value: "3" },
    { color: "red", value: "8" },
    { color: "blue", value: "4" },
  ];

  const discardPile: { color: CardColor; value: CardValue } = {
    color: "red",
    value: "3",
  };

  return (
    <GameTable
      currentPlayer={currentPlayerCards}
      topPlayer={topPlayerCards}
      leftPlayer={leftPlayerCards}
      rightPlayer={rightPlayerCards}
      discardPile={discardPile}
    />
  );
};

export default Index;
