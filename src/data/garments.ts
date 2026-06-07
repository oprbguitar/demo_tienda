export type GarmentType = "camisa" | "pantalon" | "sport";

const activeColors = ["Azul cielo", "Blanco roto", "Azul marino", "Terracota", "Gris claro"];

export const shirtOptions = {
  uso: ["Oficina", "Casual", "Semiformal", "Verano"],
  corte: ["Slim", "Semi slim", "Regular", "Relajado"],
  tela: ["Popelina de algodón", "Oxford", "Chambray", "Lino", "Algodón pima", "Algodón con elastano"],
  color: activeColors,
  cuello: ["Clásico", "Italiano", "Mao", "Botón oculto"],
  manga: ["Larga", "Corta", "Remangable"],
  puño: ["Simple", "Doble botón", "Ajustado"],
  bolsillo: ["Sin bolsillo", "Un bolsillo", "Bolsillo discreto"],
  espalda: ["Lisa", "Con pinzas", "Pliegue central"],
  largo: ["Para usar dentro", "Para usar fuera", "Mixto"],
};

export const pantsOptions = {
  tipo: ["Semiformal", "Formal", "Casual", "Chino"],
  corte: ["Recto", "Slim", "Semi slim", "Relajado"],
  tiro: ["Bajo moderado", "Medio", "Alto"],
  pretina: ["Sin pasador", "Con pasador", "Con gancho interno", "Botón oculto"],
  cierre: ["Botón", "Cierre común", "Gancho metálico"],
  bolsillos: ["Inclinados", "Laterales clásicos", "Ocultos", "Traseros con botón", "Traseros sin botón"],
  basta: ["Recta", "Angosta", "Con doblez", "Invisible"],
  tela: ["Gabardina", "Drill", "Lino grueso", "Twill", "Algodón peinado", "Gabardina stretch"],
  color: activeColors,
  ajuste: ["Menos ancho en basta", "Más espacio en muslo", "Cintura ajustada", "Sin exceso en cadera"],
};

export const sportOptions = {
  prenda: ["Jogger", "Polo", "Polera", "Casaca ligera", "Short"],
  uso: ["Entrenamiento suave", "Diario", "Viaje", "Fin de semana"],
  corte: ["Regular", "Oversize moderado", "Slim cómodo", "Relajado"],
  tela: ["Jersey de algodón", "Dry fit", "French terry", "Piqué", "Rib algodón", "Supplex", "Drill liviano", "Felpa ligera"],
  color: activeColors,
  cuello: ["Redondo", "V", "Polo camisero", "Capucha", "Cuello alto"],
  manga: ["Corta", "Larga", "Ranglán", "Sin manga"],
  acabado: ["Basta recta", "Pretina rib", "Puño rib", "Cierre completo", "Bolsillo kanguro"],
  ajuste: ["Más movilidad", "Más fresco", "Más estructura", "Mayor elasticidad"],
};

export const orderStatuses = [
  "Pedido creado",
  "Cotización seleccionada",
  "Medidas confirmadas",
  "Tela confirmada",
  "En corte",
  "En confección",
  "En revisión",
  "Listo para entrega",
  "Entregado",
];
