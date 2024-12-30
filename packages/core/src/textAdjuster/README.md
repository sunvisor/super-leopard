テキストの調整
==============

このモジュールは、テキストの調整を行うためのモジュールです。


`multiline: false` の場合
------------

- 返されるのは単一の Text オブジェクトです。

### `fitCell: false` の場合

- テキストが指定された幅に収まらない場合、末端をカットオフして、テキストが指定された幅に収まるように調整します。

### `fitCell: true` の場合

- テキストが指定された幅に収まらない場合、フォントサイズを調整して、テキストが指定された幅に収まるように調整します。


`multiline: true` の場合
------------

- テキストが指定された幅に収まらない場合、テキストを折り返して、複数の Text オブジェクト のコレクション(`Shapes`) を返します。

### `fitCell: false` の場合

- テキストが指定された高さに収まらない場合、末端をカットオフして、テキストが指定された幅と高さに収まるように調整します。

### `fitCell: true` の場合

- テキストが指定された高さに収まらない場合、フォントサイズを調整して、テキストが指定された幅と高さに収まるように調整します。
- フォントサイズを変更すると１行に収まる文字数も変わるので、折り返し処理はフォントサイズを変更するたびに行われます。

Text Adjustment
==============

This module is for adjusting text.


When `multiline: false`
------------

- A single Text object is returned.

### When `fitCell: false`

- If the text does not fit within the specified width, the text is cut off at the end to make it fit within the specified width.

### When `fitCell: true`

- If the text does not fit within the specified width, the font size is adjusted so that the text fits within the specified width.


When `multiline: true`
------------

- If the text does not fit within the specified width, the text is wrapped and a collection of multiple Text objects (`Shapes`) is returned.

### When `fitCell: false`

- If the text does not fit within the specified height, the ends are cut off and the text is adjusted to fit within the specified width and height.

### `fitCell: true`

- If the text does not fit within the specified height, the font size is adjusted to fit within the specified width and height.
- Since the number of characters that fit on one line also changes when the font size is changed, the wrapping process is performed each time the font size is changed.
