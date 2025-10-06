import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardColor, CardValue } from "./Card";
import { PlayerHand } from "./PlayerHand";
import { Clock } from "lucide-react";

interface GameTableProps {
  currentPlayer: { color: CardColor; value: CardValue }[];
  topPlayer: { color: CardColor; value: CardValue }[];
  leftPlayer: { color: CardColor; value: CardValue }[];
  rightPlayer: { color: CardColor; value: CardValue }[];
  discardPile: { color: CardColor; value: CardValue };
  onDrawCard?: () => void;
  onCardPlay?: (cardIndex: number) => void;
  currentTurn: number;
  onTurnEnd?: () => void;
}

export const GameTable = ({
  currentPlayer,
  topPlayer,
  leftPlayer,
  rightPlayer,
  discardPile,
  onDrawCard,
  onCardPlay,
  currentTurn,
  onTurnEnd,
}: GameTableProps) => {
  const [isDrawPileHovered, setIsDrawPileHovered] = useState(false);
  const [turnTimer, setTurnTimer] = useState(30);

  useEffect(() => {
    setTurnTimer(30); // Reset timer when turn changes
  }, [currentTurn]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTurnTimer((prev) => {
        if (prev <= 1) {
          onTurnEnd?.();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTurnEnd]);
  
  const handleCardPlayInternal = (cardIndex: number) => {
    onCardPlay?.(cardIndex);
    setTurnTimer(30);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Table background with felt texture effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--table-felt))] via-[hsl(var(--table-felt-dark))] to-[hsl(var(--table-felt))]">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,.1) 10px, rgba(0,0,0,.1) 20px)",
          }}></div>
        </div>
      </div>

      {/* Game area */}
      <div className="relative w-full h-full flex items-center justify-center p-8">
        {/* Top player */}
        <motion.div 
          className="absolute top-8 left-1/2 transform -translate-x-1/2"
          animate={{
            filter: currentTurn === 1 ? "drop-shadow(0 0 20px rgba(66, 184, 131, 0.6))" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          <PlayerHand 
            cards={topPlayer} 
            position="top" 
            playerName="Player 2"
            isActivePlayer={currentTurn === 1}
          />
        </motion.div>

        {/* Left player */}
        <motion.div 
          className="absolute left-8 top-1/2 transform -translate-y-1/2"
          animate={{
            filter: currentTurn === 2 ? "drop-shadow(0 0 20px rgba(66, 184, 131, 0.6))" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          <PlayerHand 
            cards={leftPlayer} 
            position="left" 
            playerName="Player 3"
            isActivePlayer={currentTurn === 2}
          />
        </motion.div>

        {/* Right player */}
        <motion.div 
          className="absolute right-8 top-1/2 transform -translate-y-1/2"
          animate={{
            filter: currentTurn === 3 ? "drop-shadow(0 0 20px rgba(66, 184, 131, 0.6))" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          <PlayerHand 
            cards={rightPlayer} 
            position="right" 
            playerName="Player 4"
            isActivePlayer={currentTurn === 3}
          />
        </motion.div>

        {/* Center play area */}
        <div className="flex items-center gap-8">
          {/* Draw pile */}
          <div className="relative">
            <motion.div
              className="relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDrawCard}
              onMouseEnter={() => setIsDrawPileHovered(true)}
              onMouseLeave={() => setIsDrawPileHovered(false)}
            >
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-0"
                  style={{
                    transform: `translate(${i * 2}px, ${i * 2}px)`,
                    zIndex: i
                  }}
                >
                  <Card
                    isFlipped={true}
                  />
                </div>
              ))}
              <motion.div
                animate={isDrawPileHovered ? {
                  boxShadow: "0 0 30px rgba(66, 184, 131, 0.6)"
                } : {
                  boxShadow: "0 0 20px rgba(66, 184, 131, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <Card isFlipped={true} />
              </motion.div>
            </motion.div>
          </div>

          {/* Discard pile */}
          <div className="relative">
            <motion.div
              initial={{ scale: 1, rotate: 0 }}
              animate={{ scale: 1.1, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                color={discardPile.color}
                value={discardPile.value}
                className="shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Current player (bottom) */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            filter: currentTurn === 0 ? "drop-shadow(0 0 20px rgba(66, 184, 131, 0.6))" : "none",
          }}
          transition={{ duration: 0.3 }}
        >
          <PlayerHand 
            cards={currentPlayer} 
            isCurrentPlayer={true}
            onCardPlay={handleCardPlayInternal}
            isActivePlayer={currentTurn === 0}
          />
        </motion.div>
      </div>

      {/* Turn timer overlay */}
      <div className="absolute top-4 right-4 bg-background/20 backdrop-blur-md rounded-lg px-4 py-3 shadow-lg border-2 border-primary/30">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="text-foreground/70 text-xs font-medium mb-1">
              {currentTurn === 0 ? "Your Turn" : `Player ${currentTurn + 1}'s Turn`}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <motion.div
                className="text-2xl font-bold"
                animate={{
                  color: turnTimer <= 10 ? "hsl(var(--destructive))" : "hsl(var(--primary))",
                  scale: turnTimer <= 10 && turnTimer % 2 === 0 ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {turnTimer}s
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
