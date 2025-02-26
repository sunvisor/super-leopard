Super Leopard pdf package
=========================

This package provides functionality for creating PDFs.
It will fill a defined report with data and output it as a PDF.

The entry point used for PDF output is `createReportDrawer`.
Call this function to create a Report Drawer.
The returned object implements the `ReportDrawerInterface`.
Passing data to the `draw` method will output a PDF.

createReportDrawer
------------------- 

`createReportDrawer` creates an object that outputs PDF, and returns an object implementing the `ReportDrawerInterface`.

```ts 
const drawer = createReportDrawer({
  report,
  getImagePath,
  loadErrorImage,
  fonts,
});
```

`report`: an object containing the report definition 
`getImagePath`: an image 

`loadErrorImage`: function to return the image to display in case of barcode errors 
`fonts`: `PdfFont` object containing the definition of fonts 

### getImagePath 

If the report data contains image output, specify a function to return where that image actually If the data in the report includes an image, specify a function to return the actual location of the image. The argument of the function is the value of the `src` property specified in the report.
Typically, you would pass a function similar to the following.

```ts 
function getImagePath(src: string): string { 
  return `/var/report/images/${src}` 
} 
``` 

### loadErrorImage 

Function to return an image to display if the data passed to the barcode is an error to return an image to be displayed if the data passed to the barcode is an error.
Usually, you will pass a function like the following.

```ts 
function loadErrorImage(): string {
  return `/var/report/images/barcode_error.svg`;
}
``` 

### font

By default, only standard PDF fonts are available, but if you prepare font files and register them However, if you prepare a font file and register it, you will be able to use that font.
To do so, you must create an instance of the `PdfFont` class and pass it to ``createReportDrawer``.

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

`PdfFont` has an ` AdditionalFontMap` to register additional fonts.
The key is the font name and the value is an object containing the font definition.
The definition should contain objects of the following structure for each of `normal`, `bold`, `italic`, and `boldItalic`.

```ts 
type AdditionalFontMapItem = {
  name: string;
  fileName: string;
  options?: {
    oblique?: boolean;
  }
}
``` 

These definitions define which font to use and how to output it if bold or italic is specified.

If only standard fonts are to be used, additionalFontMap can be passed as an empty object.

Creating a PDF
------------ 

You could create a drawer using `createReportDrawer`.
To create a PDF with the generated drawer use the `document` property.

```ts 
const stream = fs.createWriteStream('/path/to/output.pdf'); 
const doc = drawer.document; 
doc.open(stream); 
drawer.draw({ values, listRecords }); 
doc.close(); 
``` 

 The PDF will be output using the data passed in `values` and `listRecords`.
The `draw` method prints a single page. If there are multiple pages of data, it will iterate through them and output them.

```ts 
// output example 
doc.open(stream); 
records.forEach((values) => { 
  const listRecords = getListRecord(values.id); 
  drawer.draw({ values, listRecords });
}); 
doc.close(); 
```
