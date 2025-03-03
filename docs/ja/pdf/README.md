Super Leopard pdf パッケージ
=========================

このパッケージでは、PDF を作成するための機能を提供します。
定義されたレポートにデータを流し込んで、PDF として出力します。

PDF 出力のために使うエントリーポイントは、`createReportDrawer` です。
この関数を呼び出して、Report Drawer を作成します。
返されるオブジェクトは、`ReportDrawerInterface` を実装しています。
`draw` メソッドにデータを渡すと、PDF を出力します。

createReportDrawer
-------------------

`createReportDrawer` は、PDF を出力するオブジェクトを生成するための関数で、`ReportDrawerInterface` を実装したオブジェクトを返します。

```ts
const drawer = createReportDrawer({
  report,
  getImagePath,
  loadErrorImage, // オプション
  fonts,
});
```

`report`: レポートの定義を格納したオブジェクト
`getImagePath`: 画像のパスを返す関数
`loadErrorImage`: (オプション) バーコードのエラーの際に表示する画像を返す関数
`fonts`: フォントの定義を格納した `PdfFont` オブジェクト

### getImagePath

レポートのデータの中に画像の出力を含む場合、その画像が実際にどこにあるのかを返す関数を指定します。関数の引数にはレポートの中で指定された `src` プロパティの値が渡されます。
通常は次のような関数を渡すことになります。

```ts
function getImagePath(src: string): string {
  return `/var/report/images/${src}`
}
```

### loadErrorImage

バーコードに渡したデータがエラーの場合に表示する画像を返す関数を指定します。
指定しなかった場合は、ライブラリが用意した画像が表示されます。
通常は次のような関数を渡すことになります。

```ts
function loadErrorImage(): string {
  return `/var/report/images/barcode_error.svg`;
}
```

### font

標準では、PDF の標準フォントだけが利用できますが、フォントファイルを用意して登録すれば、そのフォントを使うことができるようになります。
そのためには、`PdfFont` クラスのインスタンスを作成して、`createReportDrawer` に渡す必要があります。

```ts
const additionalFontMap: AdditionalFontMap = {
  'NotoSerifJP': {
    normal: {
      name: 'NotoSerifJP-Regular',
      fileName: 'NotoSerifJP-Regular.otf',
    },
    bold: {
      name: 'NotoSerifJP-Bold',
      fileName: 'NotoSerifJP-Bold.otf',
    },
    italic: {
      name: 'NotoSerifJP-Regular',
      fileName: 'NotoSerifJP-Regular.otf',
      options: { oblique: true }
    },
    boldItalic: {
      name: 'NotoSerifJP-Bold',
      fileName: 'NotoSerifJP-Bold.otf',
      options: { oblique: true }
    },
  },
}

const fonts = new PdfFont({
  fontPath: '/path/to/fonts',
  additionalFontMap 
});
```

#### additionalFontMap

`PdfFont` には、追加のフォントを登録するための `AdditionalFontMap` を用意しています。
キーをフォント名とし、値をフォントの定義を格納したオブジェクトとします。
定義は、`normal`, `bold`, `italic`, `boldItalic` それぞれについて次の構造のオブジェクトを格納します。

```ts
type AdditionalFontMapItem = {
  name: string;
  fileName: string;
  options?: {
    oblique?: boolean;
  }
}
```

これらの定義は、bold や italic が指定された場合、どのフォントを使って、どんな風に出力するかを定義するものです。

標準のフォントのみを使用する場合は、additionalFontMap を空のオブジェクトとして渡すことができます。

データ形式
-----------

レポートに `field` が存在する場合、`values ` データを渡すことで、その `field` に対応するデータを出力します。
データは、key-value ペアの形式になっていて、`key` には `field` の `name` を、`value` にはそこに出力する値を指定します。

```json
{
  "id": 1,
  "customer": "sample",
  "price": 100
}
```

レポートに `list` が存在する場合、`listRecords` に渡された配列が出力されます、`list` は繰り返されるので、複数のデータが出力されます。

```json
[
  {
    "id": 1,
    "product": "sample1",
    "price": 100
  },
  {
    "id": 2,
    "product": "sample2",
    "price": 200
  }
]
```

PDF の作成
------------

`createReportDrawer` を使って drawer を作成できました。
生成された drawer を使って PDF を作成するには、`draw` メソッドを使います。

```ts
const stream = fs.createWriteStream('/path/to/output.pdf');
drawer.open(stream);
drawer.draw({ values, listRecords });
drawer.close();
```

`values` や `listRecords` で渡したデータを使って PDF が出力されます。

`draw` メソッドは 1ページを印刷します。複数ページのデータがある場合は、それをイテレートして出力します。

```ts
// 出力例
doc.open(stream);
records.forEach((values) => {
  const listRecords = getListRecord(values.id);
  drawer.draw({ values, listRecords });
});
doc.close();
```
