import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TwoColumnsCalude() {
  const [step, setStep] = useState("form");
  const [csvText, setCsvText] = useState("");

  const [leftHeading, setLeftHeading] = useState("Left Column");
  const [rightHeading, setRightHeading] = useState("Right Column");

  const [inputs, setInputs] = useState(Array(10).fill(""));
  const [opened, setOpened] = useState({});

  const handleChange = (i, value) => {
    const copy = [...inputs];
    copy[i] = value;
    setInputs(copy);
  };

  const parseCSV = (text) => {
    const values = text
      .replace(/\n/g, ",")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean)
      .slice(0, 10);

    setInputs((prev) => {
      const copy = [...prev];

      for (let i = 0; i < 10; i++) {
        copy[i] = values[i] || "";
      }

      return copy;
    });
  };

  const buildData = () => {
    const left = inputs.slice(0, 5);
    const right = inputs.slice(5, 10);
    return { left, right };
  };

  if (step === "form") {
    return (
      <div className="min-h-screen bg-neutral-100 p-10 font-sans">
        <h1 className="text-3xl font-semibold mb-6">Create Your UI</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            className="p-3 rounded-xl border"
            placeholder="Left Column Heading"
            value={leftHeading}
            onChange={(e) => setLeftHeading(e.target.value)}
          />
          <input
            className="p-3 rounded-xl border"
            placeholder="Right Column Heading"
            value={rightHeading}
            onChange={(e) => setRightHeading(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {inputs.map((val, i) => (
            <input
              key={i}
              className="p-3 rounded-xl border"
              placeholder={`Text ${i + 1}`}
              value={val}
              onChange={(e) => handleChange(i, e.target.value)}
            />
          ))}
        </div>
        <br />
        <textarea
          className="w-full h-40 p-3 border rounded-xl font-mono"
          placeholder="Paste CSV here: first 5 left, then 5 right column data, comma seperated"
          style={{
            width: "100%",
          }}
          value={csvText}
          onChange={(e) => {
            const val = e.target.value;
            setCsvText(val);
            parseCSV(val);
          }}
          onPaste={(e) => {
            setTimeout(() => {
              parseCSV(e.target.value);
            }, 0);
          }}
        />
        <br />

        <button
          onClick={() => setStep("ui")}
          className="mt-6 px-6 py-3 bg-black text-white rounded-xl"
        >
          Generate UI
        </button>
      </div>
    );
  }

  const { left, right } = buildData();

  return (
    <div className="app-red-green bg-neutral-100 p-10 font-sans">
      <div className="grid grid-cols-2 gap-10">
        {/* LEFT */}
        <div>
          <h2 className="top-Heading text-xl font-semibold mb-4">
            {leftHeading}
          </h2>

          <div className="space-y-4">
            {left.map((text, i) => (
              <Card
                key={i}
                text={text}
                side="left"
                opened={opened[i]}
                onClick={() => setOpened((prev) => ({ ...prev, [i]: true }))}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="top-Heading text-xl font-semibold mb-4">
            {rightHeading}
          </h2>

          <div className="space-y-4">
            {right.map((text, i) => {
              const index = i + 5;
              return (
                <Card
                  key={index}
                  text={text}
                  side="right"
                  opened={opened[index]}
                  onClick={() =>
                    setOpened((prev) => ({ ...prev, [index]: true }))
                  }
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ text, side, opened, onClick }) {
  const direction = side === "left" ? -320 : 320;

  const glowColor =
    side === "left" ? "rgba(239, 68, 68, 0.35)" : "rgba(34, 197, 94, 0.35)";

  const bgGlow =
    side === "left"
      ? "radial-gradient(circle at left, rgba(239,68,68,0.25), transparent 70%)"
      : "radial-gradient(circle at right, rgba(34,197,94,0.25), transparent 70%)";

  return (
    <div className="relative h-24 overflow-hidden rounded-2xl">
      {/* Glow background (IMPORTANT FIX) */}
      <div
        className="absolute inset-0 blur-2xl opacity-60 pointer-events-none"
        style={{ background: bgGlow }}
      />

      {/* Revealed text */}
      <AnimatePresence>
        {opened && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="underneath-text absolute inset-0 flex items-center px-6 text-lg font-medium"
            style={{
              color: side === "left" ? "#ef4444" : "#199d49",
              textShadow: `0 0 18px ${glowColor}`,
              height: "3.3rem",
              background: side === "left" ? "#ef44441b" : "#22c55e1f",
              borderRadius: "0.5rem",
            }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clickable card */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="card"
            onClick={onClick}
            whileHover={{
              scale: 1.03,
            }}
            initial={{ opacity: 1 }}
            exit={{
              x: direction,
              opacity: 0,
              filter: "blur(6px)",
            }}
            transition={{
              type: "tween",
              stiffness: 50,
              damping: 16,
            }}
            className="absolute inset-0 cursor-pointer rounded-2xl 
                       bg-white/70 backdrop-blur-xl 
                       border border-white/40 
                       flex items-center px-6"
          >
            <div
              style={{
                color: side === "left" ? "#ef4444" : "#22c55e",
                textShadow: `0 0 18px ${glowColor}`,
                height: "2.3rem",
                background: side === "left" ? "#ef44443f" : "#22c55e4f",
                borderRadius: "0.5rem",
              }}
              className="overlay-mask text-neutral-500 font-medium"
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
