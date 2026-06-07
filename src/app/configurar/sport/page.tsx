import { Configurator } from "@/components/Configurator";
import { Header } from "@/components/Header";
import { sportOptions } from "@/data/garments";

export default function SportConfiguratorPage() {
  return (
    <div>
      <Header />
      <Configurator
        garment="sport"
        title="Configura tu ropa sport"
        subtitle="Diseña polos, poleras, joggers, casacas ligeras o shorts con telas cómodas, colores combinables y detalles pensados para uso diario."
        options={sportOptions}
        basePrice={109.9}
      />
    </div>
  );
}
