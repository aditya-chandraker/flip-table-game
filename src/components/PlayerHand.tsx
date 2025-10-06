import { Card, CardColor, CardValue } from "./Card";
import { cn } from "@/lib/utils";

interface PlayerHandProps {
  cards: { color: CardColor; value: CardValue }[];
  isCurrentPlayer?: boolean;
  position?: "bottom" | "top" | "left" | "right";
  playerName?: string;
  onCardPlay?: (index: number) => void;
  isActivePlayer?: boolean;
}

export const PlayerHand = ({
  cards,
  isCurrentPlayer = false,
  position = "bottom",
  playerName = "Player",
  onCardPlay,
  isActivePlayer = false,
}: PlayerHandProps) => {
  // Calculate natural card fanning
  const calculateCardTransform = (index: number, total: number) => {
    const centerIndex = (total - 1) / 2;
    const offset = index - centerIndex;
    
    if (isCurrentPlayer && position === "bottom") {
      // Natural fan effect with rotation and vertical arc
      const rotation = offset * 4; // degrees
      const horizontalOffset = offset * 35; // pixels
      const verticalOffset = Math.abs(offset) * 8; // arc effect
      
      return {
        x: horizontalOffset,
        y: verticalOffset,
        rotation: rotation,
        zIndex: index
      };
    } else if (position === "top") {
      // Top player - slight fan
      const rotation = offset * 3;
      const horizontalOffset = offset * 30;
      return {
        x: horizontalOffset,
        y: 0,
        rotation: rotation,
        zIndex: index
      };
    } else if (position === "left") {
      // Left player - cards held vertically, fanned out like holding in hand
      const rotation = 90 + (offset * 8); // More pronounced fan effect
      const verticalOffset = offset * 25; // Vertical spread
      const horizontalOffset = Math.abs(offset) * 12; // Arc depth toward center
      return {
        x: horizontalOffset,
        y: verticalOffset,
        rotation: rotation,
        zIndex: index
      };
    } else if (position === "right") {
      // Right player - cards held vertically, fanned out like holding in hand
      const rotation = -90 + (offset * 8); // More pronounced fan effect
      const verticalOffset = offset * 25; // Vertical spread
      const horizontalOffset = -Math.abs(offset) * 12; // Arc depth toward center
      return {
        x: horizontalOffset,
        y: verticalOffset,
        rotation: rotation,
        zIndex: index
      };
    }
    
    return { x: 0, y: 0, rotation: 0, zIndex: index };
  };

  const handleCardDragEnd = (index: number) => (event: any, info: any) => {
    // If dragged upwards significantly, play the card
    if (info.offset.y < -50 && isCurrentPlayer) {
      onCardPlay?.(index);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {!isCurrentPlayer && (
        <div className={cn(
          "text-foreground font-semibold text-sm px-3 py-1 rounded-full backdrop-blur-sm transition-all",
          isActivePlayer ? "bg-primary/40 ring-2 ring-primary shadow-lg" : "bg-background/20"
        )}>
          {playerName}
        </div>
      )}
      <div className="relative" style={{ height: isCurrentPlayer ? "140px" : "130px", width: `${cards.length * 40}px`, minWidth: "200px" }}>
        {cards.map((card, index) => {
          const transform = calculateCardTransform(index, cards.length);
          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: isCurrentPlayer ? `${index * 35}px` : `${index * 30}px`,
                top: 0,
                zIndex: transform.zIndex
              }}
            >
              <Card
                color={card.color}
                value={card.value}
                isFlipped={!isCurrentPlayer}
                isHoverable={isCurrentPlayer && isActivePlayer}
                onDragEnd={handleCardDragEnd(index)}
                delay={index * 100}
                index={index}
                rotation={transform.rotation}
                style={{
                  transform: `translateX(${transform.x}px) translateY(${transform.y}px)`,
                  opacity: isCurrentPlayer && !isActivePlayer ? 0.5 : 1,
                  pointerEvents: isCurrentPlayer && !isActivePlayer ? 'none' : 'auto'
                }}
              />
            </div>
          );
        })}
      </div>
      {isCurrentPlayer && (
        <div className={cn(
          "text-foreground font-semibold text-sm px-3 py-1 rounded-full backdrop-blur-sm transition-all",
          isActivePlayer ? "bg-primary/40 ring-2 ring-primary shadow-lg" : "bg-background/20"
        )}>
          You
        </div>
      )}
    </div>
  );
};
