export * from './setting';
export { createEditingLayerDrawer } from './layer/EditingLayerDrawer';
export { createLayerDrawer, DrawModeType, type DrawModeValue } from './layer';
export { AppendShapeRubberBand } from './rubberBand/AppendShapeRubberBand';
export type { OnMoveHandler } from './rubberBand/MoveRubberBand';
export type { OnSelectHandler } from './rubberBand/SelectRubberBand';
export type { OnResizeHandler } from './rubberBand/ResizeRubberBand';
export type { OnMovePositionHandler } from './rubberBand/LineRubberBand';
export { HandleKind, type HandleType } from './boundingBox/BoundingBox';
export { EditRubberBand } from './rubberBand/EditRubberBand';
export { NO_IMAGE } from './rubberBand/append/CreateImage';

/**
 * return the actual path of the image file
 */
export type GetSvgImagePath = (src: string) => string;
