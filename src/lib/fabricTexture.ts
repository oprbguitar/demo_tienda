export function getFabricTextureStyle(colorHex: string, fabricName = "") {
  const fabric = fabricName.toLowerCase();
  const base = colorHex;
  const softLight = "rgba(255,255,255,.52)";
  const hardLight = "rgba(255,255,255,.72)";
  const dark = "rgba(7,18,47,.16)";

  if (fabric.includes("oxford")) {
    return {
      backgroundColor: base,
      backgroundImage: `linear-gradient(90deg, ${softLight} 1px, transparent 1px), linear-gradient(0deg, ${dark} 1px, transparent 1px), linear-gradient(135deg, transparent, rgba(255,255,255,.34))`,
      backgroundSize: "14px 14px, 14px 14px, 100% 100%",
    };
  }

  if (fabric.includes("lino")) {
    return {
      backgroundColor: base,
      backgroundImage: `linear-gradient(90deg, ${softLight} 1px, transparent 2px), linear-gradient(0deg, rgba(7,18,47,.12) 1px, transparent 3px), linear-gradient(135deg, ${hardLight}, transparent 42%, rgba(7,18,47,.08))`,
      backgroundSize: "22px 100%, 100% 18px, 100% 100%",
    };
  }

  if (fabric.includes("chambray")) {
    return {
      backgroundColor: base,
      backgroundImage: `linear-gradient(90deg, rgba(255,255,255,.38) 2px, transparent 2px), linear-gradient(0deg, rgba(7,18,47,.18) 1px, transparent 1px), linear-gradient(135deg, rgba(255,255,255,.42), transparent)`,
      backgroundSize: "10px 10px, 10px 10px, 100% 100%",
    };
  }

  if (fabric.includes("gabardina") || fabric.includes("drill") || fabric.includes("twill")) {
    return {
      backgroundColor: base,
      backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,.42) 0 3px, rgba(7,18,47,.12) 3px 5px, transparent 5px 12px), linear-gradient(135deg, rgba(255,255,255,.34), transparent 55%)`,
      backgroundSize: "18px 18px, 100% 100%",
    };
  }

  if (fabric.includes("jersey") || fabric.includes("french") || fabric.includes("felpa") || fabric.includes("rib")) {
    return {
      backgroundColor: base,
      backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,.34) 0 2px, transparent 2px 8px), radial-gradient(circle at 30% 35%, rgba(255,255,255,.42) 0 1px, transparent 2px), linear-gradient(135deg, rgba(255,255,255,.25), transparent)`,
      backgroundSize: "14px 100%, 12px 12px, 100% 100%",
    };
  }

  if (fabric.includes("dry") || fabric.includes("supplex") || fabric.includes("piqué") || fabric.includes("pique")) {
    return {
      backgroundColor: base,
      backgroundImage: `radial-gradient(circle, rgba(255,255,255,.5) 0 1px, transparent 2px), radial-gradient(circle, rgba(7,18,47,.12) 0 1px, transparent 2px), linear-gradient(135deg, rgba(255,255,255,.28), transparent)`,
      backgroundPosition: "0 0, 6px 6px, 0 0",
      backgroundSize: "12px 12px, 12px 12px, 100% 100%",
    };
  }

  return {
    backgroundColor: base,
    backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,.36) 0 2px, transparent 2px 10px), linear-gradient(135deg, rgba(255,255,255,.38), transparent)`,
    backgroundSize: "16px 16px, 100% 100%",
  };
}
