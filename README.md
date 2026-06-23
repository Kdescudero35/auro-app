# AuroApp

Aplicación móvil agropecuaria para cálculo de dosificación, integridad animal y generación de cotizaciones comerciales.

## Stack

- **Expo SDK 56** (React Native 0.85, React 19.2) — New Architecture habilitada.
- **Expo Router 6** — file-based routing con typed routes.
- **TypeScript strict** + path aliases (`@/`, `@features/`, `@theme/`, etc.).
- **React Hook Form + Zod** — formularios validados.
- **Zustand** (persist con AsyncStorage) — estado global del carrito y tema.
- **TanStack React Query** — búsqueda predictiva con caching.
- **Expo Print + Sharing** — generación y compartición de PDFs.
- **React Native Paper** disponible para componentes ad-hoc (no usado por defecto).
- **react-native-toast-message** — notificaciones in-app.

## Arquitectura

Feature-modules con separación estricta entre UI, dominio y datos:

```
src/
├── app/                       # Expo Router (file-based)
│   ├── _layout.tsx            # Providers + Header global
│   ├── index.tsx              # Redirect a /(tabs)/calculadoras
│   └── (tabs)/
│       ├── _layout.tsx        # Bottom tabs con badge dinámico
│       ├── calculadoras/
│       │   ├── _layout.tsx    # Stack interno
│       │   ├── index.tsx      # Grid de 6 calculadoras
│       │   └── [id].tsx       # Calculadora dinámica
│       └── cotizador/
│           └── index.tsx
│
├── features/
│   ├── calculators/           # Motor de dosificación + UI
│   ├── products/              # Catálogo + servicio
│   ├── quotations/            # Carrito + form cliente + tabla
│   ├── pdf/                   # expo-print + template HTML
│   └── shared/components/     # Header, Card, Button, Input, etc.
│
├── store/                     # Zustand stores con persist
├── theme/                     # Paleta dark/light + tokens + ThemeProvider
└── utils/                     # Size, format, confirm
```

Cada feature mantiene su propio `components/`, `hooks/`, `screens/`, `types/` y `utils/`. La lógica de negocio vive en `utils/` (motor de cálculo puro, sin React) y los datos en `services/` (hoy estáticos, mañana HTTP — la firma no cambia).

## Setup

```bash
npm install
npx expo install --fix
npm start
```

Luego abre el dev client en iOS Simulator, Android Emulator o un dispositivo físico con Expo Go.

> Si `npx expo install --fix` no resuelve todas las versiones (puede pasar entre minor versions de SDK 56), ejecuta `npx expo doctor` y aplica las sugerencias.

### Assets

El `app.json` referencia `./assets/icon.png`, `splash.png`, `adaptive-icon.png` y `favicon.png`. Reemplaza estos archivos por los oficiales antes de un build de producción.

## Comandos

```bash
npm start          # Expo dev server
npm run ios        # build & run iOS
npm run android    # build & run Android
npm run web        # web preview
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint
npm run format     # Prettier
```

## Motor de dosificación

`src/features/calculators/utils/calculations.ts` implementa el motor sin acoplarse a React. Selecciona la fórmula según `product.unidad`:

| Unidad   | Fórmula                                                           |
| -------- | ----------------------------------------------------------------- |
| `g/Ton`  | `(alimentoKg × dosis × días) / 1000` → resultado en `g`           |
| `ml/Ton` | `(alimentoKg × dosis × días) / 1000` → resultado en `ml`          |
| `g/L`    | `aguaL × dosis × días` → resultado en `g`                         |
| `ml/L`   | `aguaL × dosis × días` → resultado en `ml`                        |

Las fórmulas son sustituibles sin tocar UI.

## Persistencia

Zustand con `persist + createJSONStorage(AsyncStorage)`:

- `auroapp.theme` → preferencia de tema.
- `auroapp.quotation` → items del carrito, cliente, finca, vendedor.

## Backend futuro

`productsService` simula una promesa de red de 120 ms. Para conectar la API real, basta con reemplazar el cuerpo de cada método manteniendo la firma — el resto del árbol no se entera.

## Notas de diseño

- Paleta única definida en `src/theme/colors.ts` (`palette.dark` y `palette.light`).
- Componentes no codifican colores en `StyleSheet.create` — toman valores de `useTheme()`.
- Tipografía: System con pesos 400/600/700/800; tamaños via `theme.typography.size`.
- Espaciado y radii en `tokens.ts` (grid de 4 px).
- Tablet-ready vía `react-native-safe-area-context` + helpers en `utils/Size.ts`.
