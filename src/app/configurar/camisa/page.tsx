import { Configurator } from "@/components/Configurator";
import { Header } from "@/components/Header";
import { shirtOptions } from "@/data/garments";

export default function ShirtConfiguratorPage() {
  return (
    <div>
      <Header />
      <Configurator
        garment="camisa"
        title="Configura tu camisa"
        subtitle="Elige uso, tela, color, corte y detalles de confección para recibir cotizaciones comparables de talleres de Lima."
        options={shirtOptions}
        basePrice={129.9}
      />
    </div>
  );
}
