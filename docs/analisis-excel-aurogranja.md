# Analisis Tecnico — Aurogranja2 (Excel del Cliente)

> Documento de referencia para la implementacion de los modulos de calculadoras en AuroApp.
> Archivo fuente: `Aurogranja2 Observacion Porcicultura.xlsx`

---

## 1. Resumen General

El archivo Excel contiene **6 modulos de calculadoras** para dosificacion de productos veterinarios Aurofarma, organizados por especie/area productiva. Cada modulo tiene una hoja de **calculadora** (productos + formulas) y una hoja de **datos de referencia** (parametros zootecnicos por edad/etapa).

| Modulo | Hoja Calculadora | Hoja Datos | Productos | Datos (filas) |
|--------|-----------------|------------|-----------|---------------|
| Pollo de Engorde | CALCULADORA POLLO DE ENGORDE | DATOS POLLO ENGORDE | 38 | 168 (dias 1-56, 3 sexos) |
| Gallina de Postura | CALCULADORA POSTURA | DATOS POSTURA | 20 | 100 (semanas 1-100) |
| Porcicultura | CALCULADORA PORCICULTURA | DATOS PORCICULTURA | 51 | 26 (semanas 1-26) |
| Bovinos | Calculadora Bovinos | Parametros | 45 | 5 (etapas productivas) |
| Bioseguridad | CALCULADORA BIOSEGURIDAD | (sin hoja separada) | 41 | N/A |
| Piscicultura | Calculadora Piscicultura | PARAMETROS PISCICULTURA | 9 | 9 |

Nota: Existe una hoja "Copia de CALCULADORA POLLO DE E" que es un duplicado exacto de la calculadora de pollo de engorde. Se ignora.

---

## 2. Codigo de Colores (Convencion del Excel)

Aplica a todas las hojas de calculadoras:

| Color | Hex | Significado |
|-------|-----|-------------|
| Azul claro | `#BDD6EE` | Campos que el usuario selecciona de una lista (obligatorios) |
| Azul oscuro | `#2F5496` | Campos que el usuario diligencia manualmente (obligatorios) |
| Amarillo | `#FFFF00` | Informacion visible pero NO modificable (informativa) |
| Rojo | `#FF0000` | Informacion NO visible para el usuario (solo calculos internos) |
| Verde | `#00B050` | Resultados visibles para el usuario |
| Marron | `#833C0B` | Ficha tecnica del producto (informacion de referencia) |

---

## 3. Modulo: Gallina de Postura

### 3.1 Datos de Referencia (DATOS POSTURA)

**100 registros** (semanas 1 a 100). No hay clasificacion por sexo (todas son hembras).

| Columna | Descripcion | Ejemplo (sem 20) |
|---------|-------------|-------------------|
| EDAD SEMANAS | Edad del ave en semanas (1-100) | 20 |
| PESO DEL HUEVO g | Peso del huevo en gramos (0 hasta sem 17, luego crece) | 49.6 |
| PESO CORPORAL MINIMO g | Peso minimo del ave (solo sem 1-18) | — |
| PESO CORPORAL MAXIMO g | Peso maximo del ave (todas las semanas) | 1580 |
| CONSUMO DE ALIMENTO min g | Consumo minimo de alimento g/dia/ave (solo sem 1-18) | — |
| CONSUMO DE ALIMENTO max g | Consumo maximo de alimento g/dia/ave | 101 |
| CONSUMO DE ALIMENTO sem g | Consumo semanal maximo g/ave | 707 |
| %POSTURA | Porcentaje de postura (0% hasta sem 17, pico ~96% sem 24-27) | 40.9 |
| FACTOR | Factor de crecimiento | 0.0396 |
| Alimento acumulado | Alimento acumulado en gramos | 8204 |

**Observaciones importantes:**
- De semana 1 a 18: hay datos de peso minimo Y maximo, consumo minimo Y maximo
- De semana 19 en adelante: solo hay peso maximo y consumo maximo (los minimos son `None`)
- El `%POSTURA` empieza en semana 18 (5.9%) y alcanza pico en semanas 24-27 (~96%)
- De semana 29 en adelante: consumo de alimento se estabiliza en 118 g/dia/ave
- El peso del huevo crece de 42.7g (sem 18) a 65.3g (sem 100)

**Tabla de temperatura/agua (filas 2-5 de la hoja):**

| Rango Temperatura | Relacion Agua:Alimento | Factor |
|-------------------|----------------------|--------|
| 4-19 C | 1.7:1 | 1.7 |
| 20-25 C | 2.0:1 | 2.0 |
| 26-36 C | 2.5:1 | 2.5 |
| >37 C | 5.0:1 | 5.0 |

### 3.2 Calculadora de Productos (CALCULADORA POSTURA)

**20 productos**. Estructura de columnas:

| Col | Letra | Campo | Color | Tipo |
|-----|-------|-------|-------|------|
| 1 | A | Indicacion de Uso | Azul claro | Seleccion lista |
| 2 | B | Producto | Azul claro | Seleccion lista |
| 3 | C | Forma de administracion | Amarillo | Informativo |
| 4 | D | Dias de tratamiento sugeridos | Amarillo | Informativo |
| 5 | E | Edad en semanas | Azul oscuro | Input manual |
| 6 | F | Dias de tratamiento | Azul oscuro | Input manual |
| 7 | G | Numero de Aves | Azul oscuro | Input manual |
| 8 | H | Peso corporal del Ave (g) | Azul oscuro | Input manual |
| 9 | I | Consumo Alimento dia/ave (g) | Azul oscuro | Input manual |
| 10 | J | Consumo agua dia/ave (mL) | Amarillo | **Calculado: J = I x 2** |
| 11 | K | Dosis Practica | Amarillo | Informativo |
| 12 | L | Consumo alimento diario total (Kg) | Amarillo | Calculado |
| 13 | M | Consumo agua diario total (L) | Amarillo | Calculado |
| 14 | N | Cantidad diaria de producto | Verde | **Resultado** |
| 15 | O | Cantidad total producto REQUERIDO | Verde | **Resultado** |
| 16 | P | Presentaciones disponibles | Verde | Resultado |
| 17 | Q | Dosis por peso de Ave | Rojo | Calculo interno |
| 18 | R | Concentracion | Rojo | Calculo interno |
| 19 | S | Principio activo | Marron | Ficha tecnica |
| 20 | T | Composicion garantizada | Marron | Ficha tecnica |
| 21 | U | Indicaciones de uso | Marron | Ficha tecnica |
| 22 | V | Dosis (texto) | Marron | Ficha tecnica |
| 23 | W | Tiempo de retiro | Marron | Ficha tecnica |
| 24 | X | Precauciones / Advertencias | Marron | Ficha tecnica |
| 25 | Y | Contraindicaciones | Marron | Ficha tecnica |

### 3.3 Formulas de Calculo — Postura

**Formulas base (aplican a todos):**
- `J = I x 2` (consumo agua = consumo alimento x 2)
- `L = (G x I) / 1000` (consumo alimento diario total en Kg)
- `M = (G x J) / 1000` (consumo agua diario total en L)
- `O = N x F` (total tratamiento = cantidad diaria x dias)

**Tipos de calculo para columna N (cantidad diaria):**

| Tipo | Formula N | Productos |
|------|-----------|-----------|
| agua_directa | N = M x K | AMINOACIDOS VIT, AUROFARVIT ORAL, BETAMINT, CHICKTONIC, LIVATEX |
| premix | N = (L x K) / 1000 | AUROESENCIAL, AUROQUINOL, BACITRACINA DE ZINC, ENRAMICINA, HEPAXYN, PANTOX, PREVOX, PRO-HEALTH, YUCHASHID-POLVO |
| alimento_directo | N = K x L | AUROLITOS |
| dosis_por_ave | N = (K x G) / 1000 | HIDRACHICK |
| dosis_por_ave_directo | N = K x G | NOVABRONCOL |
| concentracion | N = Q x G donde Q = H x (K/1000) / R | Q-MUTIN (R=80) |
| dosis_por_peso_floralac | N = Q x G donde Q = (K/1000) x H | FLORALAC (Q=0.316) |

**Diferencias con Pollo de Engorde:**
- La edad se mide en **semanas** (1-100) en vez de dias (1-56)
- No hay selector de sexo (solo hembras)
- Los campos de entrada (E, F, G, H, I) son los mismos
- Las formulas son las mismas 6 tipos + 1 variante (FLORALAC)
- La columna J sigue siendo `I x 2`

### 3.4 Catalogo de Productos — Postura (20 productos)

| # | Producto | Indicacion | Forma Admin | Dias Sugeridos | Dosis | Tipo Calculo | Concentracion | Presentaciones |
|---|----------|------------|-------------|----------------|-------|--------------|---------------|----------------|
| 1 | AMINOACIDOS VIT | Vitaminas, Minerales y Aminoacidos | En agua | 3 a 5 | 2.0 | agua_directa | — | 50 mL, 1 L, 5 L |
| 2 | AUROESENCIAL | Integridad intestinal | Premix | Ciclo completo | 500.0 | premix | — | 25 Kg |
| 3 | AUROFARVIT ORAL | Vitaminas, Minerales y Aminoacidos | En agua | 5 a 7 | 3.0 | agua_directa | — | 120 mL, 1 L, 4 L |
| 4 | AUROLITOS | Vitaminas, Minerales y Aminoacidos | En agua | 7 a 10 | 1.0 | alimento_directo | — | 1 Kg |
| 5 | AUROQUINOL | Promotores de crecimiento | Premix | Ciclo completo | 50.0 | premix | — | 25 Kg |
| 6 | AUROVITEL | Vitaminas, Minerales y Aminoacidos | En agua | 3 a 5 | 0.1 | agua_directa | — | 10 g, 20 g, 1 Kg |
| 7 | BACITRACINA DE ZINC | (sin indicacion) | Premix | Ciclo completo | 330.0 | premix | — | 25 Kg |
| 8 | BETAMINT | Vitaminas, Minerales y Aminoacidos | En agua | 3 a 5 | 1.0 | agua_directa | — | 1 L |
| 9 | CHICKTONIC | Vitaminas, Minerales y Aminoacidos | En agua | 5 a 7 | 1.0 | agua_directa | — | 1 L |
| 10 | ENRAMICINA | Promotores de crecimiento | Premix | Ciclo completo | 63.0 | premix | — | 25 Kg |
| 11 | FLORALAC | (sin indicacion) | Premix | 5 | 0.2 | dosis_por_peso_floralac | — | 10 g, 25 g, 100 g, 500 g |
| 12 | HEPAXYN | Hepatoprotector | Premix | Ciclo completo | 350.0 | premix | — | 1 Kg, 25 Kg |
| 13 | HIDRACHICK | (sin indicacion) | En agua | 1 A 2 | 66.67 | dosis_por_ave | — | 35 g, 1 Kg, 25 Kg |
| 14 | LIVATEX | Hepatoprotector | En agua | 5 A 7 | 1.0 | agua_directa | — | 1 L |
| 15 | NOVABRONCOL | (sin indicacion) | Premix | 3 a 5 | 0.5 | dosis_por_ave_directo | — | 1 L, 4 L, 20 L |
| 16 | PANTOX | Atrapante micotoxinas | Premix | Ciclo completo | 1000.0 | premix | — | 25 Kg |
| 17 | PREVOX | Antioxidante | Premix | Ciclo completo | 125.0 | premix | — | 25 Kg |
| 18 | PRO-HEALTH | Integridad intestinal | Premix | Ciclo completo | 62.5 | premix | — | 25 Kg |
| 19 | Q-MUTIN | Antimicrobianos | Premix | 7 | 25.0 | concentracion | 80 | 25 Kg |
| 20 | YUCHASHID-POLVO | Integridad intestinal | Premix | Ciclo completo | 100.0 | premix | — | 25 Kg |

---

## 4. Modulo: Porcicultura

### 4.1 Datos de Referencia (DATOS PORCICULTURA)

**26 registros** (semanas 1 a 26). Incluye etapa productiva.

| Columna | Descripcion |
|---------|-------------|
| EDAD EN SEMANAS | 1-26 |
| PESO KILOS | Peso del cerdo en kg |
| CONSUMO DE ALIMENTO POR DIA KG | kg/dia (sem 1 sin dato, sem 2 = 0.014 kg) |
| CONSUMO DE AGUA LITROS ANIMAL DIA | L/dia |
| Consumo acumulado Kg | Acumulado semanal |
| ETAPA PRODUCTIVA | LACTANCIA (1-3), PRECEBO (4-8), LEVANTE (9-14), ENGORDE (15-26) |

**Etapas productivas:**

| Etapa | Semanas | Peso (kg) |
|-------|---------|-----------|
| LACTANCIA | 1-3 | 2.7-6.1 |
| PRECEBO | 4-8 | 7.6-18.5 |
| LEVANTE | 9-14 | 22.0-43.1 |
| ENGORDE | 15-26 | 49.5-110 |

### 4.2 Calculadora (CALCULADORA PORCICULTURA)

**51 productos**. Columnas principales:

| Col | Campo | Tipo |
|-----|-------|------|
| A | Indicacion de Uso | Seleccion |
| B | Producto | Seleccion |
| C | Dias de tratamiento sugeridos | Informativo |
| D | Dias de tratamiento | Input |
| E | Numero de Cerdos | Input |
| F | Consumo Alimento dia/cerdo (kg) | Input |
| G | Peso corporal del Cerdo (kg) | Input |
| H | Consumo agua dia/cerdo (L) | Input |
| I | Presentaciones | Informativo |
| J | Dosis Practica | Informativo |
| K | Cantidad total producto REQUERIDO | Resultado |
| L | DOSIS DIARIA POR CERDO | Resultado |
| M-S | Ficha tecnica | Referencia |

**Diferencia clave con aves:** El consumo de agua NO se calcula como I x 2. Es un campo de entrada independiente (H).

### 4.3 Formulas Porcicultura

Las formulas son distintas a las de aves. Se necesita analizar las formulas de la hoja con `data_only=False` para documentarlas. La estructura de columnas es diferente (el orden cambia respecto a aves).

---

## 5. Modulo: Bovinos

### 5.1 Datos de Referencia (Parametros)

Solo **5 registros** por etapa productiva:

| Etapa | MS % peso vivo | Agua % peso vivo | Dosis NOVABRONCOL |
|-------|---------------|------------------|-------------------|
| Ternero | 2.5% | 10% | 25 |
| Levante | 2.5% | 10% | 50 |
| Ceba | 2.4% | 9% | 50 |
| Horro | 2.0% | 9% | 50 |
| Vaca leche | 3.5% | 12% | 50 |

El consumo de materia seca y agua se calcula como porcentaje del peso vivo.

### 5.2 Calculadora (Calculadora Bovinos)

**45 productos**. Columnas:

| Col | Campo |
|-----|-------|
| A | Producto |
| B | Dias tratamiento sugerido |
| C | Dias tratamiento (input) |
| D | N bovinos (input) |
| E | Etapa productiva (seleccion) |
| F | Peso promedio kg (input) |
| G | Consumo MS sugerido kg/animal/dia (calculado) |
| H | Consumo agua sugerido L/animal/dia (calculado) |
| I | Dosis |
| J | Producto diario por animal |
| K | Total producto requerido |
| L-S | Ficha tecnica |

**Diferencias clave:**
- Usa **etapa productiva** (5 opciones) en vez de edad numerica
- El consumo de MS y agua se calcula a partir del peso y los porcentajes de la tabla Parametros
- Incluye productos inyectables (ANAPIRAN, AUROCEF, ANTIMASTITIS S, etc.) ademas de orales y premix
- El peso se mide en **kg** (no gramos)

---

## 6. Modulo: Bioseguridad

### 6.1 Estructura

**41 productos**. Este modulo es completamente diferente a los demas:

| Col | Campo |
|-----|-------|
| A | Indicaciones de uso |
| B | Producto |
| C | Tipo de produccion (G. Porcicola, G. Avicola, etc.) |
| D | M (metros cuadrados) |
| E | Dosis de Uso |
| F | Dias de tratamiento sugerido |
| G | Presentacion |
| H | Cantidad total de Solucion (L) |
| I | Cantidad total de Agua (L) |
| J | Cantidad total de producto (Kg o L) |
| K | Constante Aplicacion |
| L | Factor de uso: m, m2 o m3 |
| M-S | Ficha tecnica |

**Diferencias clave:**
- No usa parametros zootecnicos (edad, peso, consumo)
- Usa **metros cuadrados** como input principal
- Tipo de produccion como selector (porcicola, avicola, etc.)
- Los productos son desinfectantes, detergentes, insecticidas, etc.
- No tiene hoja de datos de referencia separada

---

## 7. Modulo: Piscicultura

### 7.1 Datos de Referencia (PARAMETROS PISCICULTURA)

**9 registros** con tipo de calculo explicito:

| Producto | TipoCalc | Dosis | Unidad |
|----------|----------|-------|--------|
| PHYTOFISH | FOOD_KGTON | 1.0 | kg/ton alimento |
| ECOMARINE | WATER_TAB10 | 3.0 | tabletas/10 ton agua |
| Q-FLORFEN | FOOD_GKG | 10.0 | g/kg alimento |
| HEPAXYN | FOOD_KGTON | 1.0 | kg/ton alimento |
| DOLICAL | FOOD_KGTON | 2.0 | kg/ton alimento |
| TILAVAC S3 | PER_FISH | 1.0 | dosis/pez |
| AUROESENCIAL | FOOD_KGTON | 1.0 | kg/ton alimento |
| CALCIO FISH | WATER_MGLKG | 50.0 | mg/L agua |
| NOVABRONCOL | FOOD_GKG | 2.0 | g/kg alimento |

### 7.2 Calculadora (Calculadora Piscicultura)

**9 productos**. Columnas:

| Col | Campo |
|-----|-------|
| A | Producto |
| B | Dias tratamiento recomendado |
| C | Especie (TILAPIA, etc.) |
| D | Dias Tratamiento (input) |
| E | Biomasa kg (input) |
| F | % Consumo/dia (input) |
| G | Volumen agua ton (input) |
| H | N peces (input) |
| I | Dosis |
| J | Unidad |
| K | Producto/dia (resultado) |
| L | Total tratamiento (resultado) |
| M-S | Ficha tecnica |

**Diferencias clave:**
- Usa **biomasa** en vez de numero/peso individual
- Inputs: biomasa, % consumo, volumen de agua, numero de peces
- Tipos de calculo propios: FOOD_KGTON, WATER_TAB10, FOOD_GKG, PER_FISH, WATER_MGLKG
- Es el unico modulo con tipos de calculo nombrados explicitamente en la hoja de parametros

---

## 8. Relaciones y Dependencias entre Hojas

| Desde | Hacia | Relacion |
|-------|-------|----------|
| CALCULADORA POSTURA (col E) | DATOS POSTURA | Busca datos zootecnicos por edad en semanas |
| CALCULADORA POSTURA (Q-MUTIN, PANTOX, PREVOX, PRO-HEALTH) | DATOS POSTURA (col K-M) | VLOOKUP para factor agua/temperatura |
| CALCULADORA POSTURA (YUCHASHID) | DATOS POLLO ENGORDE | Referencia cruzada erronea (#REF!) |
| CALCULADORA PORCICULTURA (col F, H) | DATOS PORCICULTURA | Busca consumo/peso por edad en semanas |
| Calculadora Bovinos (col G, H) | Parametros | Calcula consumo MS/agua segun etapa productiva y peso |
| Calculadora Piscicultura | PARAMETROS PISCICULTURA | Tipo de calculo y dosis por producto |

---

## 9. Reglas de Negocio Identificadas

1. **Consumo de agua en aves** (Postura y Pollo Engorde): siempre `consumoAgua = consumoAlimento x 2`
2. **Consumo de agua en cerdos**: es un campo de entrada independiente, NO se calcula
3. **Consumo en bovinos**: se calcula como `peso x %MS` (alimento) y `peso x %agua` (agua), segun etapa productiva
4. **"Ciclo completo"** en dias de tratamiento: indica uso continuo durante toda la produccion. En postura, se traduce a valores como 700 dias (100 semanas)
5. **Edad en semanas** (Postura): rango 1-100. En Pollo Engorde es dias 1-56
6. **Productos compartidos entre modulos**: muchos productos aparecen en multiples modulos (AMINOACIDOS VIT, AUROESENCIAL, etc.) pero con dosis y formulas diferentes
7. **Productos sin indicacion de uso**: BACITRACINA DE ZINC, FLORALAC, HIDRACHICK, NOVABRONCOL no tienen valor en la columna "Indicacion de Uso" en postura

---

## 10. Casos Especiales y Excepciones

1. **FLORALAC (Postura)**: usa una formula unica `N = Q x G` donde `Q = (K/1000) x H`. Es una variante de `dosis_por_peso` diferente a la de Q-MUTIN
2. **NOVABRONCOL (Postura)**: su forma de administracion dice "Premix" pero la formula es `N = K x G` (dosis por ave directa), no una formula premix
3. **YUCHASHID-POLVO (Postura)**: tiene `#REF!` en la columna Q (Dosis por peso de Ave), causado por una referencia cruzada rota a DATOS POLLO ENGORDE. Esto no afecta el calculo porque usa formula premix `N = (L x K) / 1000`
4. **Semanas 19+ en DATOS POSTURA**: los campos de peso minimo y consumo minimo pasan a ser `None`. Solo se usa el maximo
5. **AUROQUINOL y otros "Ciclo completo"** en postura: usan edad=100 semanas y dias=700, lo que representa el ciclo productivo completo de la gallina

---

## 11. Observaciones Tecnicas para el Desarrollo

### 11.1 Reutilizacion de la arquitectura de Pollo de Engorde

El modulo de **Gallina de Postura** es el mas similar al de Pollo de Engorde ya implementado:
- Misma estructura de columnas (A-Y)
- Mismos tipos de calculo (6 tipos + 1 variante FLORALAC)
- Misma formula de consumo de agua (I x 2)
- Misma estructura de ficha tecnica (cols S-Y)

**Se puede reutilizar directamente:**
- `calculations.ts` (calculateDosage con los 6 tipos)
- La interfaz `PolloEngordeProduct` renombrada/generalizada
- Los componentes de UI (Form, ProductSearch, DosageResult, CalculatedParams)
- El flujo de cotizacion y PDF

**Cambios necesarios:**
- Datos de referencia: semanas 1-100 (sin sexo) en vez de dias 1-56 (con sexo)
- Nuevos campos en datos: pesoHuevo, %postura, pesoMin, pesoMax, consumoMin, consumoMax
- El campo de edad cambia de dias a semanas, rango 1-100
- Agregar variante FLORALAC al engine de calculo

### 11.2 Modulos con arquitectura diferente

- **Porcicultura**: estructura de columnas diferente, consumo de agua es input, etapas productivas
- **Bovinos**: usa etapa productiva + peso para derivar consumos (tabla Parametros), incluye inyectables
- **Bioseguridad**: completamente diferente (m2, sin zootecnia)
- **Piscicultura**: usa biomasa, tipos de calculo propios (FOOD_KGTON, WATER_TAB10, etc.)

### 11.3 Posible generalizacion del engine de calculo

Los modulos de aves (Pollo + Postura) comparten engine. Los demas necesitan engines especificos. Se recomienda:
1. Implementar Postura reutilizando el engine actual
2. Luego generalizar si se detectan patrones compartidos con porcicultura/bovinos

---

## 12. Riesgos y Dudas para Validar con el Cliente

| # | Item | Detalle |
|---|------|---------|
| 1 | YUCHASHID-POLVO #REF! | La formula de Q referencia DATOS POLLO ENGORDE con #REF!. Confirmar si la dosis por peso aplica o se ignora (el calculo principal N usa premix y funciona correctamente) |
| 2 | Productos sin indicacion | BACITRACINA DE ZINC, FLORALAC, HIDRACHICK, NOVABRONCOL no tienen "Indicacion de Uso" en postura. Asignar categoria o dejar vacio? |
| 3 | Peso min/max postura | Se usa el peso maximo o un promedio? Actualmente el campo H (input) permite cualquier valor |
| 4 | Consumo min/max postura | Se auto-completa con el maximo al seleccionar edad? O se muestra rango? |
| 5 | NOVABRONCOL forma admin | Dice "Premix" pero la formula es dosis por ave directa. Confirmar forma de administracion correcta |
| 6 | Linea genetica postura | No se especifica raza/linea en DATOS POSTURA (a diferencia de ROSS AP 308 en engorde). Confirmar si es Lohmann Brown, Hy-Line, etc. |
| 7 | Temperatura postura | La tabla de relacion agua:alimento por temperatura existe en DATOS POSTURA pero no se usa en las formulas (J siempre = I x 2). Es informativa o se debe implementar? |

---

## 13. Recomendaciones para la Implementacion

1. **Prioridad de implementacion sugerida**: Postura > Porcicultura > Bovinos > Piscicultura > Bioseguridad (de menor a mayor esfuerzo de desarrollo)
2. **Generalizar tipos**: crear una interfaz base `CalculatorProduct` que comparta los campos comunes entre modulos, con extensiones especificas por modulo
3. **Catalogo compartido**: varios productos aparecen en multiples modulos. Considerar un catalogo maestro con las fichas tecnicas y catalogos especificos por modulo con las dosis/formulas
4. **PDF**: el template de cotizacion puede reutilizarse para todos los modulos, solo cambia la especialidad
5. **Navegacion**: agregar las nuevas calculadoras al listado de la pantalla principal de calculadoras
