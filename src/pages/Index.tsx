import { GameTable } from "@/components/GameTable";
import { CardColor, CardValue } from "@/components/Card";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [currentTurn, setCurrentTurn] = useState(0); // 0 = you, 1 = top, 2 = left, 3 = right
  const [currentPlayerCards, setCurrentPlayerCards] = useState<{ color: CardColor; value: CardValue }[]>([
    { color: "red", value: "5" },
    { color: "blue", value: "skip" },
    { color: "yellow", value: "7" },
    { color: "green", value: "reverse" },
    { color: "dark", value: "draw5" },
    { color: "blue", value: "3" },
    { color: "yellow", value: "wild" },
  ]);

  const handleDrawCard = () => {
    const colors: CardColor[] = ["red", "blue", "yellow", "green", "dark"];
    const values: CardValue[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "skip", "reverse", "draw2", "flip", "draw5", "skip-all", "wild-draw-color"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    
    setCurrentPlayerCards([...currentPlayerCards, { color: randomColor, value: randomValue }]);
    
    toast({
      title: "Card Drawn!",
      description: `You drew a ${randomColor} ${randomValue}`,
    });
  };

  const handleTurnEnd = () => {
    // If it's the player's turn and they didn't play, auto-draw
    if (currentTurn === 0) {
      handleDrawCard();
      toast({
        title: "Time's up!",
        description: "You automatically drew a card",
        variant: "destructive",
      });
    }
    
    // Move to next player
    setCurrentTurn((prev) => (prev + 1) % 4);
  };

  useEffect(() => {
    if (currentTurn !== 0) {
      // Simulate other players taking their turn
      const turnDelay = setTimeout(() => {
        setCurrentTurn((prev) => (prev + 1) % 4);
      }, 5000); // Other players take 5 seconds
      
      return () => clearTimeout(turnDelay);
    }
  }, [currentTurn]);

  const topPlayerCards: { color: CardColor; value: CardValue }[] = [
    { color: "red", value: "3" },
    { color: "blue", value: "8" },
    { color: "green", value: "skip" },
    { color: "yellow", value: "2" },
    { color: "dark", value: "flip" },
  ];

  const leftPlayerCards: { color: CardColor; value: CardValue }[] = [
    { color: "blue", value: "6" },
    { color: "yellow", value: "reverse" },
    { color: "green", value: "4" },
    { color: "red", value: "9" },
    { color: "dark", value: "skip-all" },
    { color: "yellow", value: "1" },
  ];

  const rightPlayerCards: { color: CardColor; value: CardValue }[] = [
    { color: "green", value: "7" },
    { color: "red", value: "skip" },
    { color: "dark", value: "wild-draw-color" },
    { color: "yellow", value: "0" },
  ];

  const discardPile: { color: CardColor; value: CardValue } = {
    color: "dark",
    value: "draw5",
  };

  return (
    <GameTable
      currentPlayer={currentPlayerCards}
      topPlayer={topPlayerCards}
      leftPlayer={leftPlayerCards}
      rightPlayer={rightPlayerCards}
      discardPile={discardPile}
      onDrawCard={handleDrawCard}
      currentTurn={currentTurn}
      onTurnEnd={handleTurnEnd}
    />
  );
};

export default Index;
