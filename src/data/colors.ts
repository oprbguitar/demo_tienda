export type ColorOption = {
  id: string;
  name: string;
  hex: string;
  garment: "camisa" | "pantalon" | "sport" | "ambos";
};

export const colors: ColorOption[] = [
  { id: "blanco-roto", name: "Blanco roto", hex: "#f2f0ea", garment: "ambos" },
  { id: "azul-cielo", name: "Azul cielo", hex: "#9fc0ee", garment: "ambos" },
  { id: "azul-marino", name: "Azul marino", hex: "#14213d", garment: "ambos" },
  { id: "terracota", name: "Terracota", hex: "#b46a4a", garment: "ambos" },
  { id: "gris-claro", name: "Gris claro", hex: "#cfd2d6", garment: "ambos" },
];
