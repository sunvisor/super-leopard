Super Leopard - 帳票作成ライブラリ
==============================

Super Leopard は、帳票を作成するためのライブラリです。
指定の形式で記述されたテンプレートに基づいて、そこにデータを加えて、PDF を出力することができます。
テンプレートのデータは、JSON で表現されますが、Web画面上で編集するための GUI を提供します。
Super Leopard は、皆様のアプリケーションに組み込んで、フレキシブルな帳票作成機能を提供することを目的としています。

現在はリリースに向けて開発中です。

Super Leopard の機能
-------------------

- テンプレートとデータから帳票を PDF を出力
- テンプレートとデータから帳票を Web 画面上に表示
- テンプレートを Web 画面上で編集

プロジェクトの構成
-------------------

このリポジトリは、npm workspace を使って構成されています。
workspace の構成は、次のようになります。

```
.
├── packages
│   ├── barcode
│   ├── component
│   ├── core
│   ├── pdf
```

- packages/core: Super Leopard のコアライブラリ
- packages/component: Super Leopard の GUI を提供するライブラリ
- packages/pdf: PDF を出力するライブラリ
- packages/barcode: バーコードを出力するライブラリ

### core ライブラリ

帳票のテンプレート (レポートと呼びます) の各要素を定義するモデルを提供します。
レポートは、JSON で定義することができます。その文法については、[core のドキュメント](core/README.md)に記載されています。
しかし、その文法を覚える必要はありません。
component ライブラリで定義されている GUI を使って生成できるからです。

このライブラリは、基本的には json で定義されたレポート (テンプレート) に対して、データを与えることで帳票を印刷します。
その基礎となるレポートの書式や基本的な動作を定義しているのがこの core ライブラリです。
Web や PDF 以外に出力する帳票が必要になった場合は、core ライブラリを使用して作成することができます。

### barcode ライブラリ

バーコードを出力するためのライブラリを提供します。
component と pdf ライブラリから使用されます。

### pdf ライブラリ

PDF を出力するためのライブラリを提供します。
Express や Fastify などの HTTP サーバーを使って、あるいは Electron などのデスクトップアプリで PDF を出力することができます。
このライブラリでは PDF の作成に PDFKit を使っています。

### component ライブラリ

帳票を Web 画面上に表示する機能と、帳票のテンプレートを編集するための GUI を提供します。
Web 画面上で、テンプレートを編集できます。
コンポーネントは、React と MUI を使って実装されています。
また、状態管理には jotai を使っています。

![report editor](./images/report_editor.png)

ライセンス
----------

MIT
