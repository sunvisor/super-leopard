/**
 * English Captions
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { Translation } from './ja';


const operation = {
  undo: "Undo",
  redo: "Redo",
  cut: "Cut",
  copy: "Copy",
  paste: "Paste",
  transform: "Transform",
  delete: "Delete",
  close: 'Close',
}

const reportObject= {
  report: "Report",
  layer: "Layer",
  shape: "Shape",
  page: "Page",
  property: "Property",
  object: "Object",
  editProperty: "Edit Property",
}

const pageProperty= {
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

const staticShapeType= {
  rect: "Rectangle",
  circle: "Circle",
  ellipse: "Ellipse",
  line: "Line",
  image: "Image",
  text: "Text",
  barcode: "Barcode",
}

const shapeType= {
  ...staticShapeType,
  group: "Group",
  list: "List",
  field: "Field",
}
const editTool= {
  save: 'Save',
  rename: 'Rename',
  property: 'Property',
}

const editModeTool= {
  edit: "Edit",
  field: "Field",
  lock: 'Stay in add mode after adding',
  unlock: 'Return to select mode after adding',
  ...staticShapeType,
}

const positionProperty= {
  x: "X",
  y: "Y",
  startPosition: "Start",
  endPosition: "End",
}

const sizeProperty= {
  width: "Width",
  height: "Height",
}

const fillColorProperty= {
  fillColor: "Fill Color",
}

const borderProperty= {
  border: "Border",
  color: "Border Color",
  width: "Border Width",
  style: "Border Style",
  cap: "Cap",
  join: "Join",
}

const capTool= {
  butt: "Butt",
  round: "Round",
  square: "Square",
}

const joinTool= {
  miter: "Miter",
  round: "Round",
  bevel: "Bevel",
}

export const colorPickerField= {
  invalidColor: 'Invalid color code',
}


const circleProperty= {
  diameter: "直径",
}

const textProperty= {
  text: 'Text',
  align: 'Align',
  valign: 'Vertical Align',
  color: 'Color',
  multiLine: 'Multiline',
  linePitch: 'Line Pitch',
  fitCell: 'Fit to Cell',
}

const alignTool= {
  left: 'Left',
  center: 'Center',
  right: 'Right',
  justify: 'Justify',
  justifyAll: 'Justify All',
  top: 'Top',
  middle: 'Middle',
  bottom: 'Bottom',
}

const fontProperty= {
  fontFamily: "Font",
  fontSize: "Size",
  fontStyle: "Style",
  bold: "Bold",
  italic: "Italic",
  underline: "Underline",
  strikethrough: "Strikethrough",
}

const imageProperty= {
  upload: "Upload Image",
  select: "Select Image",
  selectMessage: "Please Select image",
  decide: "Decide",
}

const barcodeProperty= {
  format: "Format",
  value: "Value",
  rotate: 'Rotate',
  includeText: 'Include Text',
}

const barcodeRotateName= {
  N: 'None',
  L: 'Clockwise',
  R: 'Anti-Clockwise',
  I: 'Invert',
}

const fieldProperty= {
  name: 'Field Name',
  shapeType: 'Shape Type',
}

const groupProperty= {
  repeatCount: 'Repeat Count',
  direction: 'Repeat Direction',
  horizontal: 'Horizontal',
  vertical: 'Vertical',
  times: 'Times',
}

const listProperty=  {
  direction: 'Direction',
  rows: 'Rows',
  columns: 'Columns',
}

const objectManipulation= {
  toFront: 'Front',
  toBack: 'Back',
  toForward: 'Forward',
  toBackward: 'Backward',
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

const groupOperation= {
  group: 'Group',
  ungroup: 'Ungroup',
  shapesToList: 'Shapes to List',
  listToShapes: 'List to Shapes',
}

const layerOperation= {
  addLayer: 'Add Layer',
  removeLayer: 'Remove Layer',
  renameLayer: 'Rename Layer',
}

const numberErrorMessage= {
  minValue: (value: number) => `The value must be greater than or equal to ${value}.`,
  maxValue: (value: number) => `The value must be less than or equal to ${value}.`,
  invalidValue: 'Invalid number.',
}

export const en: Translation = {
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
  numberErrorMessage,
}
