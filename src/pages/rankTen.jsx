import React, { useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import UploadZone from "../components/UploadZone";
import CurrentImage from "../components/CurrentImage";
import SlotGrid from "../components/SlotGrid";
import QueueStrip from "../components/QueueStrip";
import { MAX_SLOTS } from "../constants";
import confetti from "canvas-confetti";
import {
  clickCrispy,
  clickMouse,
  clickPerc,
  clickShutter,
  clickSoftShutter,
} from "../assets";

function RankTen() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [slots, setSlots] = useState({});
  const [theme, setTheme] = useState("light");

  const current = images[index];
  const currentLength = Object.keys(slots).length;
  const allSlotsFilled = currentLength === MAX_SLOTS;

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    if (allSlotsFilled) triggerConfetti();
  }, [allSlotsFilled]);

  function handleUpload(files) {
    const arr = Array.from(files).slice(0, 10);
    const loaded = [];

    arr.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        loaded.push({ src: e.target.result });

        if (loaded.length === arr.length) {
          setImages(loaded);
          setIndex(0);
          setSlots({});
        }
      };
      reader.readAsDataURL(file);
    });
  }

  const sounds = [
    clickCrispy,
    clickMouse,
    clickPerc,
    clickShutter,
    clickSoftShutter,
  ];
  const soundIndex = useRef(0);
  const audioRefs = useRef(sounds.map((src) => new Audio(src)));
  const lastIndexRef = useRef(-1);

  const playSound = () => {
    let randomIndex;

    do {
      randomIndex = Math.floor(Math.random() * sounds.length);
    } while (randomIndex === lastIndexRef.current && sounds.length > 1);

    lastIndexRef.current = randomIndex;

    const audio = new Audio(sounds[randomIndex]);
    audio.currentTime = 0;
    audio.play().catch((err) => console.log("Audio error:", err));
  };

  function assignSlot(slot) {
    if (!current) return;

    playSound();

    setSlots((prev) => {
      const updated = { ...prev };

      // remove if already assigned elsewhere
      Object.keys(updated).forEach((k) => {
        if (updated[k] === index) delete updated[k];
      });

      updated[slot] = index;
      return updated;
    });

    // move forward (consume image)
    setIndex((i) => Math.min(i + 1, images.length - 1));
  }

  function reset() {
    setImages([]);
    setIndex(0);
    setSlots({});
  }

  return (
    <div className={`app ${theme}`}>
      <button onClick={reset}>Reset</button>

      <TopBar theme={theme} setTheme={setTheme} />

      {images.length === 0 ? (
        <UploadZone onUpload={handleUpload} />
      ) : (
        <section
          style={{
            display: "grid",
            placeItems: "center",
          }}
        >
          <SlotGrid
            slots={slots}
            images={images}
            onAssign={assignSlot}
            maxSlots={MAX_SLOTS}
          />
          {!allSlotsFilled && (
            <div className="uploaded-icons">
              <CurrentImage
                image={current}
                index={index}
                total={images.length}
              />

              <QueueStrip images={images} index={index} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}

export default RankTen;
