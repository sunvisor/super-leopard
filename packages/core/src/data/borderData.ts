import { ColorData } from './colorData';
import { BorderConfigValue } from '../object';

export type BorderData = {
  color?: ColorData;
} & BorderConfigValue;
