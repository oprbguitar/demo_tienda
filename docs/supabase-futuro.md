# Preparacion para futura integracion con Supabase

## Tablas sugeridas

- `profiles`: datos del cliente.
- `garment_configs`: configuraciones de camisa, pantalon o ropa sport.
- `measurements`: medidas por usuario.
- `providers`: talleres y costureros verificados.
- `quotes`: cotizaciones por pedido.
- `orders`: pedido principal.
- `order_events`: eventos de seguimiento.

## Flujo propuesto

1. El usuario crea una configuracion de prenda.
2. La configuracion se guarda como borrador.
3. El usuario registra medidas o solicita medicion asistida.
4. Los proveedores envian cotizaciones.
5. El usuario selecciona una cotizacion.
6. El pedido avanza mediante eventos de seguimiento.

## Consideraciones

- Mantener pagos fuera del primer alcance.
- Agregar autenticacion solo cuando se necesiten pedidos reales.
- Usar roles para cliente, proveedor y administrador.
- Registrar auditoria basica en cambios de estado.
