// noinspection JSUnusedGlobalSymbols

/**
 * English Captions
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  AlignTool,
  BarcodeProperty,
  BarcodeRotateName,
  BorderProperty,
  Captions,
  CapTool,
  CircleProperty,
  ColorPickerField,
  EditModeTool,
  EditTool,
  FieldProperty,
  FillColorProperty,
  FontProperty,
  GroupOperation,
  GroupProperty,
  ImageProperty,
  JoinTool,
  LayerOperation,
  ListProperty,
  NumberErrorMessage,
  ObjectManipulation,
  Operation,
  PageProperty,
  PositionProperty,
  ReportObject,
  ShapeTypeName,
  SizeProperty,
  StaticShapeTypeName,
  TextProperty
} from '../CaptionsType';


const operation: Operation = {
  undo: "Undo",
  redo: "Redo",
  cut: "Cut",
  copy: "Copy",
  paste: "Paste",
  transform: "Transform",
  delete: "Delete",
}

const reportObject: ReportObject = {
  report: "Report",
  layer: "Layer",
  shape: "Shape",
  page: "Page",
  property: "Property",
  object: "Object",
  editProperty: "Edit Property",
}

const pageProperty: PageProperty = {
  title: 'Page Settings',
  paperSize: 'Paper Size',
  custom: 'custom...',
  width: 'Page Width',
  height: 'Page Height',
  orientation: 'Orientation',
  portrait: 'Portrait',
  landscape: 'Landscape',
  margin: 'Margin',
  top: 'Top Margin',
  left: 'Left Margin',
  unit: 'Unit',
  mm: 'Millimeter (mm)',
  in: 'Inch (in)',
  pt: 'Point (pt)',
}

const staticShapeType: StaticShapeTypeName = {
  rect: "Rectangle",
  circle: "Circle",
  ellipse: "Ellipse",
  line: "Line",
  image: "Image",
  text: "Text",
  barcode: "Barcode",
}

const shapeType: ShapeTypeName = {
  ...staticShapeType,
  group: "Group",
  list: "List",
  field: "Field",
}
const editTool: EditTool = {
  save: 'Save',
  rename: 'Rename',
  property: 'Property',
}

const editModeTool: EditModeTool = {
  edit: "Edit",
  field: "Field",
  ...staticShapeType,
}

const positionProperty: PositionProperty = {
  x: "X",
  y: "Y",
  startPosition: "Start",
  endPosition: "End",
}

const sizeProperty: SizeProperty = {
  width: "Width",
  height: "Height",
}

const fillColorProperty: FillColorProperty = {
  fillColor: "Fill Color",
}

const borderProperty: BorderProperty = {
  border: "Border",
  color: "Border Color",
  width: "Border Width",
  style: "Border Style",
  cap: "Cap",
  join: "Join",
}

const capTool: CapTool = {
  butt: "Butt",
  round: "Round",
  square: "Square",
}

const joinTool: JoinTool = {
  miter: "Miter",
  round: "Round",
  bevel: "Bevel",
}

export const colorPickerField: ColorPickerField = {
  invalidColor: 'Invalid color code',
}


const circleProperty: CircleProperty = {
  diameter: "直径",
}

const textProperty: TextProperty = {
  text: 'Text',
  align: 'Align',
  valign: 'Vertical Align',
  color: 'Color',
  multiLine: 'Multiline',
  linePitch: 'Line Pitch',
  fitCell: 'Fit to Cell',
}

const alignTool: AlignTool = {
  left: 'Left',
  center: 'Center',
  right: 'Right',
  justify: 'Justify',
  justifyAll: 'Justify All',
  top: 'Top',
  middle: 'Middle',
  bottom: 'Bottom',
}

const fontProperty: FontProperty = {
  fontFamily: "Font",
  fontSize: "Size",
  fontStyle: "Style",
  bold: "Bold",
  italic: "Italic",
  underline: "Underline",
  strikethrough: "Strikethrough",
}

const imageProperty: ImageProperty = {
  upload: "Upload Image",
  select: "Select Image",
  selectMessage: "Please Select image",
  decide: "Decide",
  close: 'Close',
}

const barcodeProperty: BarcodeProperty = {
  format: "Format",
  value: "Value",
  rotate: 'Rotate',
  includeText: 'Include Text',
}

const barcodeRotateName: BarcodeRotateName = {
  N: 'None',
  L: 'Clockwise',
  R: 'Anti-Clockwise',
  I: 'Invert',
}

const fieldProperty: FieldProperty = {
  name: 'Field Name',
  shapeType: 'Shape Type',
}

const groupProperty: GroupProperty = {
  repeatCount: 'Repeat Count',
  direction: 'Repeat Direction',
  horizontal: 'Horizontal',
  vertical: 'Vertical',
  times: 'Times',
}

const listProperty: ListProperty =  {
  direction: 'Direction',
  rows: 'Rows',
  columns: 'Columns',
}

const objectManipulation: ObjectManipulation = {
  bringToFront: 'Bring to Front',
  sendToBack: 'Send to Back',
  bringToForward: 'Bring Forward',
  sendToBackward: 'Send Backward',
  alignToTop: 'Align to Top',
  alignToBottom: 'Align to Bottom',
  alignToLeft: 'Align to Left',
  alignToRight: 'Align to Right',
  alignToCenter: 'Align to Center',
  alignToMiddle: 'Align to Middle',
  distributeHorizontally: 'Distribute Horizontally',
  distributeVertically: 'Distribute Vertically',
}

const groupOperation: GroupOperation = {
  group: 'Group',
  ungroup: 'Ungroup',
  shapesToList: 'Shapes to List',
  listToShapes: 'List to Shapes',
}

const layerOperation: LayerOperation = {
  addLayer: 'Add Layer',
  removeLayer: 'Remove Layer',
  renameLayer: 'Rename Layer',
}

export const numberErrorMessage: NumberErrorMessage = {
  minValue: value => `The value must be greater than or equal to ${value}.`,
  maxValue: value => `The value must be less than or equal to ${value}.`,
  invalidValue: 'Invalid number.',
}

export const captions: Captions = {
  operation,
  reportObject,
  pageProperty,
  staticShapeType,
  shapeType,
  editTool,
  positionProperty,
  sizeProperty,
  fillColorProperty,
  borderProperty,
  capTool,
  joinTool,
  colorPickerField,
  circleProperty,
  textProperty,
  fontProperty,
  alignTool,
  editModeTool,
  imageProperty,
  barcodeProperty,
  barcodeRotateName,
  fieldProperty,
  groupProperty,
  listProperty,
  objectManipulation,
  groupOperation,
  layerOperation,
}
