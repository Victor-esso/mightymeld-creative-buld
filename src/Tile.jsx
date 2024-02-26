export function Tile({ content: Content, flip, state }) {
  switch (state) {
    case "start":
      return (
        <Back
          className="bg-indigo-g-300 text-center border border-[rgba(231,234,255,1)] shadow-[0_23px_13px_-17px_rgba(255,255,255,0.8),0_11px_13px_-6px_#a8b4f7,inset_0_5px_10px_5px_rgba(255,255,255,0.25),inset_0_4px_9px_rgba(168,180,247,0.74)]"
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front className="bg-indigo-g-500 shadow-[inset_0_4px_8px_4px_rgba(49,46,129,0.7)] text-white p-2">
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched className="text-indigo-200 p-2">
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip }) {
  return <div onClick={flip} className={className}></div>;
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
