// noinspection JSUnusedGlobalSymbols

/**
 * Japanese Captions
 *
 * Created by sunvisor on 2024/02/15.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import {
  AlignTool,
  BarcodeProperty, BarcodeRotateName,
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
  TextProperty
} from '../CaptionsType';

const operation: Operation = {
  undo: '元に戻す',
  redo: 'やり直す',
  delete: '削除',
  copy: 'コピー',
  paste: '貼り付け',
  cut: '切り取り',
  transform: '変形',
}

const reportObject: ReportObject = {
  report: 'レポート'  ,
  page: 'ページ',
  layer: 'レイヤー',
  property: 'プロパティ',
  shape: '図形',
  object: 'オブジェクト',
  editProperty: 'プロパティを編集する',
}

const pageProperty: PageProperty = {
  title: 'ページ情報',
  paperSize: '用紙サイズ',
  custom: 'カスタム...',
  width: 'ページ幅',
  height: 'ページ高',
  orientation: '用紙の向き',
  portrait: '縦向き',
  landscape: '横向き',
  margin: '余白',
  top: '上余白',
  left: '左余白',
  unit: '単位',
  mm: 'ミリメートル (mm)',
  in: 'インチ (in)',
  pt: 'ポイント (pt)',
}

const staticShapeType = {
  rect: '矩形',
  circle: '円',
  ellipse: '楕円',
  line: '直線',
  image: '画像',
  text: '文字',
  barcode: 'バーコード',
}

const shapeType: ShapeTypeName = {
  ...staticShapeType,
  group: 'グループ',
  list: 'リスト',
  field: 'フィールド',
}

const editTool: EditTool = {
  save: '保存',
  rename: '名前を変更',
  property: 'プロパティ',
}

const editModeTool: EditModeTool = {
  edit: '編集',
  field: 'フィールド',
  ...staticShapeType,
}

const positionProperty: PositionProperty = {
  x: "X位置",
  y: "Y位置",
  startPosition: "開始",
  endPosition: "終了",
}

const sizeProperty: SizeProperty = {
  width: "幅",
  height: "高さ",
}

const fillColorProperty: FillColorProperty = {
  fillColor: "塗り色",
}

const borderProperty: BorderProperty = {
  border: "線",
  color: "線色",
  width: "線幅",
  style: "線種",
  cap: "端点",
  join: "角",
}

const capTool: CapTool = {
  butt: "直線",
  round: "丸",
  square: "四角",
}

const joinTool: JoinTool = {
  miter: "角結合",
  round: "丸結合",
  bevel: "斜結合",
}

const colorPickerField: ColorPickerField = {
  invalidColor: '不正な色コード',
}

const circleProperty: CircleProperty = {
  diameter: "直径",
}

const textProperty: TextProperty = {
  text: '文字',
  align: '揃え',
  valign: '縦揃え',
  color: '文字色',
  multiLine: '複数行',
  linePitch: '行間',
  fitCell: '範囲に合わせる',
}

const alignTool: AlignTool = {
  left: '左揃え',
  center: '中央揃え',
  right: '右揃え',
  justify: '両端揃え',
  justifyAll: '全体揃え',
  top: '上揃え',
  middle: '中央揃え',
  bottom: '下揃え',
}

const fontProperty: FontProperty = {
  fontFamily: "フォント",
  fontSize: "サイズ",
  fontStyle: "スタイル",
  bold: "太字",
  italic: "斜体",
  underline: "下線",
  strikethrough: "打ち消し線",
}

const imageProperty: ImageProperty = {
  upload: '画像をアップロードする',
  select: '画像を選択する',
  selectMessage: '使用する画像を選択してください',
  decide: '確定する',
  close: '閉じる',
}

const barcodeProperty: BarcodeProperty = {
  format: '形式',
  value: '値',
  rotate: '回転',
  includeText: '文字を表示',
}

const barcodeRotateName: BarcodeRotateName = {
  N: 'なし',
  L: '時計回り',
  R: '反時計回り',
  I: '180度回転',
}

const fieldProperty: FieldProperty = {
  name: 'フィールド名',
  shapeType: '図形タイプ',
}

const groupProperty: GroupProperty = {
  direction: '繰り返す方向',
  repeatCount: '繰り返し回数',
  vertical: '縦方向',
  horizontal: '横方向',
  times: '回',
}

const listProperty: ListProperty =  {
  direction: '方向',
  rows: '行数',
  columns: '列数',
}

const objectManipulation: ObjectManipulation = {
  toFront: '最前面へ',
  toBack: '最背面へ',
  toForward: '前へ',
  toBackward: '後へ',
  bringToFront: '最前面へ移動',
  sendToBack: '最背面へ移動',
  bringToForward: 'ひとつ前へ移動',
  sendToBackward: 'ひとつ後へ移動',
  alignToTop: '上揃え',
  alignToBottom: '下揃え',
  alignToLeft: '左揃え',
  alignToRight: '右揃え',
  alignToCenter: '中央揃え',
  alignToMiddle: '中央揃え',
  distributeHorizontally: '横方向に分布',
  distributeVertically: '縦方向に分布',
}

const groupOperation: GroupOperation = {
  group: 'グループ化',
  ungroup: 'グループ解除',
  shapesToList: 'リスト化',
  listToShapes: 'リスト解除',
}

const layerOperation: LayerOperation = {
  addLayer: 'レイヤーを追加',
  removeLayer: 'レイヤーを削除',
  renameLayer: 'レイヤー名を変更',
}

const numberErrorMessage: NumberErrorMessage = {
  minValue: value => `値は${value}以上でなければなりません`,
  maxValue: value => `値は${value}以下でなければなりません`,
  invalidValue: '不正な値です',
}

export const captions: Captions = {
  operation,
  reportObject,
  pageProperty,
  staticShapeType,
  shapeType,
  editTool,
  editModeTool,
  positionProperty,
  sizeProperty,
  fillColorProperty,
  borderProperty,
  capTool,
  joinTool,
  colorPickerField,
  circleProperty,
  textProperty,
  alignTool,
  fontProperty,
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

