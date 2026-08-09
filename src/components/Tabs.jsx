import React, { useState } from "react";

function getComponentAndLabel(item, idx) {
  if (!item) return { Comp: null, label: `Tab ${idx + 1}`, props: undefined };

  if (typeof item === "function") {
    const fn = item;
    return {
      Comp: fn,
      label: fn.displayName || fn.name || `Tab ${idx + 1}`,
      props: undefined,
    };
  }

  if (React.isValidElement(item)) {
    const elem = item;
    const label = elem.type?.displayName || elem.type?.name || `Tab ${idx + 1}`;
    const Comp = () => elem;
    return { Comp, label, props: undefined };
  }

  // object form: { component, props?, label? }
  if (typeof item === "object" && "component" in item) {
    const { component, props, label } = item;
    const lbl =
      label ||
      (component && (component.displayName || component.name)) ||
      `Tab ${idx + 1}`;
    return { Comp: component, label: lbl, props };
  }

  return { Comp: null, label: `Tab ${idx + 1}`, props: undefined };
}

export default function Tabs({ components, initialIndex = 0 }) {
  const [active, setActive] = useState(
    Math.max(0, Math.min(initialIndex, components.length - 1)),
  );

  if (!components || components.length === 0) return null;

  return (
    <div className="tabs-container">
      <div
        className="tabs-buttons"
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        {components.map((item, i) => {
          const { label } = getComponentAndLabel(item, i);
          const activeStyle = {
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer",
            background: i === active ? "#111827" : "#494949",
            color: i === active ? "#fff" : "#010c25",
            border: i === active ? "1px solid yellow" : "none",
            outline: "none",
          };

          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={activeStyle}
              aria-pressed={i === active}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="tabs-components">
        {(() => {
          const item = components[active];
          if (!item) return null;
          const { Comp, props } = getComponentAndLabel(item, active);
          if (!Comp) return null;
          return <Comp {...(props || {})} />;
        })()}
      </div>
    </div>
  );
}
