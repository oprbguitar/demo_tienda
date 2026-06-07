import { Configurator } from "@/components/Configurator";
import { Header } from "@/components/Header";
import { pantsOptions } from "@/data/garments";

export default function PantsConfiguratorPage() {
  return (
    <div>
      <Header />
      <Configurator
        garment="pantalon"
        title="Configura tu pantalón"
        subtitle="Define tipo, corte, tiro, pretina, tela, color y ajustes especiales para una prenda cómoda y bien terminada."
        options={pantsOptions}
        basePrice={149.9}
      />
    </div>
  );
}
