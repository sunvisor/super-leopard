export type Captions = {
  operation: Operation;
  reportObject: ReportObject;
  pageProperty: PageProperty;
  staticShapeType: StaticShapeTypeName;
  shapeType: ShapeTypeName;
  editTool: EditTool;
  editModeTool: EditModeTool;
  positionProperty: PositionProperty;
  sizeProperty: SizeProperty;
  fillColorProperty: FillColorProperty;
  borderProperty: BorderProperty;
  capTool: CapTool;
  joinTool: JoinTool;
  colorPickerField: ColorPickerField;
  circleProperty: CircleProperty;
  textProperty: TextProperty;
  alignTool: AlignTool;
  fontProperty: FontProperty;
  imageProperty: ImageProperty;
  barcodeProperty: BarcodeProperty;
  barcodeRotateName: BarcodeRotateName;
  fieldProperty: FieldProperty;
  groupProperty: GroupProperty;
  listProperty: ListProperty;
  objectManipulation: ObjectManipulation;
  groupOperation: GroupOperation;
  layerOperation: LayerOperation;
}

export type CaptionsKey = keyof Captions;

export type Operation = {
  undo: string;
  redo: string;
  transform: string;
  copy: string;
  paste: string;
  cut: string;
  delete: string;
}

export type ReportObject = {
  property: string;
  layer: string;
  page: string;
  report: string;
  shape: string;
  object: string;
  editProperty: string;
}

export type PageProperty = {
  title: string;
  paperSize: string;
  custom: string;
  width: string;
  height: string;
  orientation: string;
  portrait: string;
  landscape: string;
  margin: string;
  left: string;
  top: string;
  unit: string;
  mm: string;
  in: string;
  pt: string;
}

export type StaticShapeTypeName = {
  rect: string;
  circle: string;
  ellipse: string;
  line: string;
  image: string;
  text: string;
  barcode: string;
}

export type ShapeTypeName = StaticShapeTypeName & {
  group: string;
  list: string;
  field: string;
}

export type EditTool = {
  save: string;
  rename: string;
  property: string;
}

export type EditModeTool = StaticShapeTypeName & {
  edit: string;
  field: string;
}

export type PositionProperty = {
  x: string;
  y: string;
  startPosition: string;
  endPosition: string;
}
export type SizeProperty = {
  width: string;
  height: string;
}
export type FillColorProperty = {
  fillColor: string;
}

export type CircleProperty = {
  diameter: string;
}

export type BorderProperty = {
  border: string;
  color: string;
  width: string;
  style: string;
  cap: string;
  join: string;
}

export type CapTool = {
  butt: string;
  round: string;
  square: string;
}

export type JoinTool = {
  miter: string;
  round: string;
  bevel: string;
}

export type TextProperty = {
  text: string;
  align: string;
  color: string;
  valign: string;
  multiLine: string;
  linePitch: string;
  fitCell: string;
}

export type AlignTool = {
  left: string;
  center: string;
  right: string;
  justify: string;
  justifyAll: string;
  top: string;
  middle: string;
  bottom: string;
}

export type FontProperty = {
  fontFamily: string;
  fontSize: string;
  fontStyle: string;
  bold: string;
  italic: string;
  underline: string;
  strikethrough: string;
}

export type ImageProperty = {
  upload: string;
  select: string;
  selectMessage: string;
  decide: string;
  close: string;
}

export type BarcodeProperty = {
  format: string;
  value: string;
  rotate: string;
  includeText: string;
}

export type BarcodeRotateName = {
  N: string;
  R: string;
  L: string;
  I: string;
}

export type FieldProperty = {
  name: string;
  shapeType: string;
}

export type ColorPickerField = {
  invalidColor: string;
}

export type GroupProperty = {
  repeatCount: string;
  direction: string;
  vertical: string;
  horizontal: string;
  times: string;
}

export type ListProperty = {
  rows: string;
  direction: string;
  columns: string;
}

export type ObjectManipulation = {
  bringToFront: string;
  sendToBack: string;
  bringToForward: string;
  sendToBackward: string;
  alignToTop: string;
  alignToBottom: string;
  alignToLeft: string;
  alignToRight: string;
  alignToCenter: string;
  alignToMiddle: string;
  distributeHorizontally: string;
  distributeVertically: string;
}

export type GroupOperation = {
  group: string;
  ungroup: string;
  shapesToList: string;
  listToShapes: string;
}

export type NumberErrorMessage = {
  minValue: (value: number) => string;
  maxValue: (value: number) => string;
  invalidValue: string;
}

export type LayerOperation = {
  addLayer  : string;
  removeLayer: string;
  renameLayer: string;
}
