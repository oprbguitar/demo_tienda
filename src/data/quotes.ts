export type Quote = {
  id: string;
  providerId: string;
  providerName: string;
  price: number;
  deliveryDays: string;
  rating: number;
  includesFabric: boolean;
  includesAdjustment: boolean;
  zone: string;
  comment: string;
  highlighted?: boolean;
};

export const quotes: Quote[] = [
  {
    id: "q-diaz",
    providerId: "diaz",
    providerName: "Confecciones Diaz",
    price: 129.9,
    deliveryDays: "5 a 7 dias habiles",
    rating: 4.8,
    includesFabric: true,
    includesAdjustment: true,
    zone: "La Victoria",
    comment: "Mejor balance entre precio, plazo y acabado.",
    highlighted: true,
  },
  {
    id: "q-anaya",
    providerId: "anaya",
    providerName: "Sastreria Anaya",
    price: 159.9,
    deliveryDays: "7 a 10 dias habiles",
    rating: 4.9,
    includesFabric: true,
    includesAdjustment: true,
    zone: "San Borja",
    comment: "Acabado premium y ajuste muy preciso.",
  },
  {
    id: "q-roble",
    providerId: "roble",
    providerName: "Taller el Roble",
    price: 119.9,
    deliveryDays: "6 a 8 dias habiles",
    rating: 4.7,
    includesFabric: false,
    includesAdjustment: true,
    zone: "Surquillo",
    comment: "Precio competitivo para prendas de diario.",
  },
];
