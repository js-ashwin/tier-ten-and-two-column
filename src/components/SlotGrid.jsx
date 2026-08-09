export default function SlotGrid({ slots, images, onAssign, maxSlots }) {
  return (
    <div className="slots">
      {Array.from({ length: maxSlots }, (_, i) => i + 1).map((slot) => {
        const hasImage = slots[slot] !== undefined;
        const img = hasImage ? images[slots[slot]]?.src : null;

        return (
          <div
            key={slot}
            className={`slot ${hasImage ? "filled" : "empty"}`}
            onClick={() => onAssign(slot)}
          >
            {/* IMAGE STATE */}
            {hasImage && <img src={img} alt="" />}

            {/* EMPTY STATE */}
            {!hasImage && <span className="slot-number">{slot}</span>}

            {/* CORNER LABEL ONLY WHEN FILLED */}
            {hasImage && <span className="corner-label">{slot}</span>}
          </div>
        );
      })}
    </div>
  );
}
