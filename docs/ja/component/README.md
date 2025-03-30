Super Leopard component パッケージ
==============================

レポートの作成は、テキストエディタを使ってレポートの定義を JSON で記述して作ることができます。
しかしそれは、とても面倒で時間のかかる作業になります。
また、完成したレポートをアプリケーションに組み込んだあとも、帳票のデザインに修正を加える必要があるかもしれません。

Super Leopard の component パッケージでは、レポートを作成するための GUI コンポーネントを提供します。

このコンポーネントを使って、レポートのエディタを作成したり、アプリケーションに組み込んでエンドユーザーが直接レポートの定義を編集してもらうことができます。

コンポーネント
--------------

多くのコンポーネントで構成されていますが、メインのコンポーネントは次のようになります。

- `ReportEditor`: レポートの定義を編集するための GUI コンポーネント
- `Report`: レポートを表示するための GUI コンポーネント

その他のコンポーネントは、これら２つのコンポーネントが利用しているものです。

### ReportEditor

#### プロパティ

- `report`: (オプション) レポートの定義
- `reportId`: レポートの識別子
- `title`: レポートのタイトル
- `language`: (オプション) エディタで使用する言語
- `onSave`: レポートの定義を保存したときに呼び出されるコールバック
- `settings`: (オプション) 設定情報
- `showSaveButton`: (オプション) 保存ボタンを表示する (デフォルト: `true`)
- `additionalTools`: (オプション) 保存ボタンの前後に表示する追加ツール
    - `after`: (オプション) 保存ボタンの後に表示する追加ツール
    - `before`: (オプション) 保存ボタンの前に表示する追加ツール
- `onChangeTitle`: タイトルが変更された時に呼び出されるコールバック

![report editor](../images/report_editor.png)

### Report

#### プロパティ

レポートにデータを与え、画面にプレビューを表示します。
リスト形式のレポートで複数のページに渡る場合は、`pageNumber` で指定したページが表示されます。

- `report`: レポートの定義
- `values`: レポートに与えるデータ
- `listRecords`: レポートに与えるリストデータ
- `pageNumber`: (オプション) 表示するページの番号
- `zoom`: (オプション) 表示するスケール(%)
- `settings`: (オプション) 設定情報

フック
-------

### useReportManipulator フック

レポートを操作することができます。
ReportEditor では、画面上の操作によってレポートを操作することができます。
メニューや外部のボタンなど ReportEditor の外部からレポートを操作したい場合にこのフックを使ってレポートを操作します。

- `select(area: Box | Position)`: オブジェクトを選択する
    - `Box` を渡した場合は、矩形内のオブジェクトを選択する
    - `Position` を渡した場合は、その座標ある一番手前のオブジェクトを選択する
- `selectAll()`: 全オブジェクトを選択する
- `move(pos: Position)`: 選択されたオブジェクトを移動する
    - `pos`: 移動先の座標
- `resize(box: Box)`: 選択されたオブジェクトをリサイズする
- `box`: リサイズ後の矩形
- `movePosition(positions: PositionPair)`: 選択されたオブジェクト(`Line`)を移動する
    - `positions`: 移動先の座標のペア
- `append(shape: Shape)`: オブジェクトを追加する
    - `shape`: 追加するオブジェクト
- `remove()`: 選択されたオブジェクトを削除する
- `copy()`: 選択されたオブジェクトをクリップボードにコピーする
- `paste()`: クリップボードからコピーしたオブジェクトを貼り付ける
- `cut()`: 選択されたオブジェクトをクリップボードにコピーし、削除する
- `undo()`: 最後に行った操作を元に戻す
- `redo()`: 最後に行った操作をやり直す
- `canPaste()`: 貼り付けることができるかどうか (クリップボードに物があるか) を返す
- `canUndo`: 最後に行った操作を元に戻すことができるかどうか
- `canRedo`: 最後に行った操作をやり直すことができるかどうか
- `dirty`: 現在のレポートのが変更されたかどうか

### useReport フック

レポートの状態を取得、変更することができます。

- `report`: レポートの定義を取得する
- `setReport`: レポートの定義を変更する

### useSelection フック

選択されたオブジェクトを取得、変更することができます。

- `selection`: 選択されたオブジェクトを取得する
- `setSelection`: 選択されたオブジェクトを設定する
- `clearSelection`: 選択されたオブジェクトの選択を解除する

設定
------

設定は、`ReportEditor` の `settings` プロパティに渡します。 `settings` プロパティを渡さなかった場合には、デフォルトの設定になります。
以下が設定できる項目です。
多くのものはデフォルトの設定を変更する必要はありませんが、`image` の `getImageUrl` と `getImageList` は画像を取り扱う場合には必須の設定項目となります。

- `boundingBox`: バウンディングボックスの設定
    - `handleSize`: ハンドルのサイズ
    - `stroke`: バウンディングボックスの境界線の設定
- `rubberBand`: ラバーバンドの設定
    - `stroke`: ラバーバンドの境界線の設定
    - `dragThreshold`: ドラッグが開始したと判断するしきい値
- `lineSelect`: 線オブジェクトを選択するときの設定
    - `minTolerance`: 線オブジェクトを選択するときの最小の許容誤差
- `defaultShapeSize`: デフォルトのオブジェクトのサイズ
    - `width`: 幅
    - `height`: 高さ
- `designMode`: デザインモードでの設定
    - `textBorder`: テキストオブジェクトの境界線の色
    - `fieldBorder`: フィールドオブジェクトの境界線の色
- `fontMap`: 使用するフォントの設定
    - キー: フォントID
    - 値: フォントの内容
        - `label`: フォントの表示名
        - `family`: 画面描画に使用するフォントファミリー名
        - `weight`: フォントの太さを指定する文字列
            - `regular`: 通常文字
            - `bold`: 太字文字
        - `style`: 利用できるスタイルの配列 `bold`, `italic`
- `image`: イメージに関するオプション
    - `getImageUrl`: イメージのURLを取得する関数、ファイル名を渡すと実際の場所を返す関数
    - `noImageUrl: イメージがない場合に表示する画像のURL`
    - `getImageList`: 利用できるイメージのリストを取得する関数
        - 戻り値は `ImageListData` の配列
- `barcode`: バーコードに関するオプション
    - `errorImageUrl`: バーコードの内容に誤りがあった時に代わりに表示する画像のURL

デフォルトの `settings` は次のようになります

```ts
export const defaultSettings: SettingData = {
  boundingBox: {
    handleSize: 6,
    stroke: {
      style: 'dotted', color: '#d3d3d3', width: 1,
    }
  },
  rubberBand: {
    stroke: {
      style: 'dashed', color: '#808080', width: 1,
    },
    dragThreshold: 2,
  },
  lineSelect: {
    minTolerance: 3,
  },
  defaultShapeSize: {
    width: 72,
    height: 72,
  },
  designMode: {
    textBorder: '#d3d3d3',
    fieldBorder: '#3be5e5',
  },
  fontMap: {    // 標準のフォントをセット
    TimesRoman: {
      label: 'Times Roman',
      family: 'Times New Roman',
      weight: {
        regular: 'normal',
        bold: 'bold',
      },
      style: ['bold', 'italic'],
    },
    Helvetica: {
      label: 'Helvetica',
      family: 'Helvetica',
      weight: {
        regular: 'normal',
        bold: 'bold',
      },
      style: ['bold', 'italic'],
    },
    Courier: {
      label: 'Courier',
      family: 'Courier',
      weight: {
        regular: 'normal',
        bold: 'bold',
      },
      style: ['bold', 'italic'],
    },
  },
  image: {
    getImageUrl: (src) => src,    // src をそのまま返します
    noImageUrl,                   // base64 で画像が設定されます
    getImageList: async () => [], // 空の配列を返します
  },
  barcode: {
    errorImageUrl,                // base64 で画像が設定されます
  }
}
```

設定を変更する際は、スプレッド構文を使って一部を変更することができます。

```ts
const newSettings = {
  ...defaultSettings,
  fontMap: {
    ...defaultSettings.fontMap,
    NotoSansJP: {
      label: 'Noto Sans JP',
      family: 'Noto Sans JP',
      weight: {
        regular: '400',
        bold: '700',
      },
      style: ['bold', 'italic'],
    },
  },
  image: {
    ...defaultSettings.image,
    getImageUrl: (src: string) => `/api/images/${src}`,
    getImageList: async () => [
      {
        "type": "image/jpeg",
        "name": "sample01.jpg"
      },
      {
        "type": "image/jpeg",
        "name": "sample02.jpg"
      },
    ],
  }
}
```
