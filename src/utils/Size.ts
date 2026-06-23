import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Base de diseño (iPhone 14/15: 390 x 844) */
const BASELINE_WIDTH = 390;
const BASELINE_HEIGHT = 844;

/**
 * heightPercentageToDP — porcentaje del alto de pantalla a DP.
 * Ej: hp(2) -> 2% del alto.
 */
export function hp(percentage: number): number {
  const value = (percentage * SCREEN_HEIGHT) / 100;
  return PixelRatio.roundToNearestPixel(value);
}

/**
 * widthPercentageToDP — porcentaje del ancho de pantalla a DP.
 */
export function wp(percentage: number): number {
  const value = (percentage * SCREEN_WIDTH) / 100;
  return PixelRatio.roundToNearestPixel(value);
}

/**
 * Escala lineal respecto al ancho baseline.
 * Útil para tipografías y espaciados que deben crecer en tablets.
 */
export function scale(size: number): number {
  return (SCREEN_WIDTH / BASELINE_WIDTH) * size;
}

/**
 * Escala moderada (50% de scale, 50% de tamaño base).
 * Evita que en tablets los elementos crezcan en exceso.
 */
export function moderateScale(size: number, factor = 0.5): number {
  return size + (scale(size) - size) * factor;
}

export const isTablet = (): boolean => {
  const aspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  return SCREEN_WIDTH >= 600 && aspectRatio < 1.6;
};

export const screen = {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
  baselineWidth: BASELINE_WIDTH,
  baselineHeight: BASELINE_HEIGHT,
};
