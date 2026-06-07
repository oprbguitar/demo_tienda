export type Provider = {
  id: string;
  name: string;
  district: string;
  specialty: string;
  rating: number;
  orders: number;
  quality: number;
  fit: number;
  punctuality: number;
  communication: number;
  fastDelivery: boolean;
  bestFinish: boolean;
  bestPrice: boolean;
  comment: string;
};

export const providers: Provider[] = [
  {
    id: "diaz",
    name: "Confecciones Diaz",
    district: "La Victoria",
    specialty: "Camisas de oficina",
    rating: 4.8,
    orders: 128,
    quality: 4.8,
    fit: 4.7,
    punctuality: 4.6,
    communication: 4.8,
    fastDelivery: true,
    bestFinish: false,
    bestPrice: true,
    comment: "Buen acabado y recomendaciones claras sobre telas frescas.",
  },
  {
    id: "anaya",
    name: "Sastreria Anaya",
    district: "San Borja",
    specialty: "Sastreria masculina",
    rating: 4.9,
    orders: 96,
    quality: 4.9,
    fit: 4.9,
    punctuality: 4.7,
    communication: 4.8,
    fastDelivery: false,
    bestFinish: true,
    bestPrice: false,
    comment: "Excelente precision de ajuste para camisas y pantalones.",
  },
  {
    id: "roble",
    name: "Taller el Roble",
    district: "Surquillo",
    specialty: "Pantalones chinos y formales",
    rating: 4.7,
    orders: 74,
    quality: 4.7,
    fit: 4.6,
    punctuality: 4.8,
    communication: 4.5,
    fastDelivery: true,
    bestFinish: false,
    bestPrice: true,
    comment: "Entrega puntual y ajustes posteriores sin complicaciones.",
  },
  {
    id: "miraflores-fit",
    name: "Miraflores Fit Studio",
    district: "Miraflores",
    specialty: "Cortes slim y semi slim",
    rating: 4.6,
    orders: 63,
    quality: 4.6,
    fit: 4.8,
    punctuality: 4.4,
    communication: 4.7,
    fastDelivery: false,
    bestFinish: true,
    bestPrice: false,
    comment: "Muy buena lectura de contextura y preferencias modernas.",
  },
];
