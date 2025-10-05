import { Card, CardColor, CardValue } from "./Card";

interface PlayerHandProps {
  cards: { color: CardColor; value: CardValue }[];
  isCurrentPlayer?: boolean;
  position?: "bottom" | "top" | "left" | "right";
  playerName?: string;
}

export const PlayerHand = ({
  cards,
  isCurrentPlayer = false,
  position = "bottom",
  playerName = "Player",
}: PlayerHandProps) => {
  const positionClasses = {
    bottom: "flex-row justify-center",
    top: "flex-row justify-center",
    left: "flex-col items-start",
    right: "flex-col items-end",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {!isCurrentPlayer && (
        <div className="text-foreground font-semibold text-sm bg-background/20 px-3 py-1 rounded-full backdrop-blur-sm">
          {playerName}
        </div>
      )}
      <div className={`flex gap-2 ${positionClasses[position]}`}>
        {cards.map((card, index) => (
          <div
            key={index}
            className="transition-transform"
            style={{
              transform: isCurrentPlayer
                ? `translateX(${(index - cards.length / 2) * 2}px)`
                : "none",
            }}
          >
            <Card
              color={card.color}
              value={card.value}
              isFlipped={!isCurrentPlayer}
              isHoverable={isCurrentPlayer}
              delay={index * 100}
            />
          </div>
        ))}
      </div>
      {isCurrentPlayer && (
        <div className="text-foreground font-semibold text-sm bg-background/20 px-3 py-1 rounded-full backdrop-blur-sm">
          You
        </div>
      )}
    </div>
  );
};
