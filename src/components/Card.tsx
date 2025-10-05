import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CardColor = "red" | "blue" | "yellow" | "green";
export type CardValue = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "skip" | "reverse" | "draw2" | "wild" | "wild-draw4";

interface CardProps {
  color?: CardColor;
  value?: CardValue;
  isFlipped?: boolean;
  isHoverable?: boolean;
  onClick?: () => void;
  onDragEnd?: (event: any, info: any) => void;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  rotation?: number;
  index?: number;
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
  onDragEnd,
  delay = 0,
  className,
  style,
  rotation = 0,
  index = 0,
}: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative w-20 h-28 cursor-pointer",
        className
      )}
      style={{ ...style, rotate: rotation }}
      initial={{ 
        opacity: 0, 
        scale: 0.5,
        y: -200,
        rotate: -10
      }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: 0,
        rotate: rotation
      }}
      transition={{ 
        delay: delay / 1000,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={isHoverable ? { 
        y: -20, 
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      } : {}}
      drag={isHoverable}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={onDragEnd}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="w-full h-full rounded-xl"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
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
      </motion.div>
    </motion.div>
  );
};
