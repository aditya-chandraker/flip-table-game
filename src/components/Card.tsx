import { useState } from "react";
import { cn } from "@/lib/utils";

export type CardColor = "red" | "blue" | "yellow" | "green";
export type CardValue = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "skip" | "reverse" | "draw2" | "wild" | "wild-draw4";

interface CardProps {
  color?: CardColor;
  value?: CardValue;
  isFlipped?: boolean;
  isHoverable?: boolean;
  onClick?: () => void;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const colorClasses: Record<CardColor, string> = {
  red: "bg-gradient-to-br from-red-500 to-red-600",
  blue: "bg-gradient-to-br from-blue-500 to-blue-600",
  yellow: "bg-gradient-to-br from-yellow-400 to-yellow-500",
  green: "bg-gradient-to-br from-green-500 to-green-600",
};

export const Card = ({
  color = "red",
  value = "5",
  isFlipped = false,
  isHoverable = false,
  onClick,
  delay = 0,
  className,
  style,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative w-20 h-28 cursor-pointer transition-all duration-300 animate-card-deal",
        isHoverable && isHovered && "transform -translate-y-4",
        className
      )}
      style={{ animationDelay: `${delay}ms`, ...style }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "w-full h-full rounded-xl transition-transform duration-600 preserve-3d",
          isFlipped && "rotate-y-180"
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl shadow-lg backface-hidden border-4 border-white",
            colorClasses[color],
            "flex items-center justify-center"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-white text-3xl font-bold drop-shadow-lg">
            {value.toUpperCase()}
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-xl shadow-lg backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border-4 border-slate-600 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-white/30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-white/30"></div>
            </div>
            <div className="text-white/40 text-4xl font-bold">UNO</div>
          </div>
        </div>
      </div>
    </div>
  );
};
