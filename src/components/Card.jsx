
import { useRef } from "react";
import "./Card.css";

function Card({ src, name, type, onClick, onLongPress }) {
  const timerRef = useRef(null);
  const longPressedRef = useRef(false);

  const startPress = (e) => {
    if (e.type === "pointerdown" && e.button !== 0) return;

    clearTimeout(timerRef.current);
    longPressedRef.current = false;

    if (!onLongPress) return;

    timerRef.current = setTimeout(() => {
      longPressedRef.current = true;
      onLongPress();
    }, 500);
  };

  const cancelPress = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  const handleClick = (e) => {
    if (longPressedRef.current) {
      longPressedRef.current = false;
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    onClick?.();
  };

  return (
    <div
      className={`card ${type || ""}`}
      onPointerDown={startPress}
      onPointerUp={cancelPress}
      onPointerLeave={cancelPress}
      onPointerCancel={cancelPress}
      onContextMenu={(e) => e.preventDefault()}
      style={{ touchAction: "pan-y" }}
    >
      <img
        src={src}
        alt={name}
        onClick={handleClick}
        draggable={false}
      />
    </div>
  );
}

export default Card;
