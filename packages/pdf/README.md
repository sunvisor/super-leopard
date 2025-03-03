# Super Leopard pdf Package
=========================

**Super Leopard pdf Package** provides functionality for generating PDFs.  
It fills a predefined report with data and outputs it as a PDF.

The main entry point for PDF output is `createReportDrawer`.  
Call this function to create a Report Drawer.  
The returned object implements the `ReportDrawerInterface`.  
Passing data to the `draw` method will generate a PDF.

---

## **createReportDrawer**

`createReportDrawer` creates an object that outputs PDFs and returns an object implementing the `ReportDrawerInterface`.

```ts
const drawer = createReportDrawer({
  report,
  getImagePath,
  loadErrorImage, // optional
  fonts,
});
```

- **`report`**: An object containing the report definition.
- **`getImagePath`**: A function that returns the path to an image.
- **`loadErrorImage`** *(optional)*: A function that returns an image to display in case of barcode errors.
- **`fonts`**: A `PdfFont` object containing font definitions.

---

## **getImagePath**

If the report data includes an image, specify a function that returns the actual location of the image.  
The argument of the function is the value of the `src` property specified in the report.  
Typically, you would pass a function like the following:

```ts
function getImagePath(src: string): string {
  return `/var/report/images/${src}`;
}
```

---

## **loadErrorImage**

Function that returns an image to display if the barcode data is invalid.  
If not specified, the library provides a default error image.  
Usually, you will pass a function like the following:

```ts
function loadErrorImage(): string {
  return `/var/report/images/barcode_error.svg`;
}
```

---

## **Font Configuration**

By default, only standard PDF fonts are available. However, if you prepare and register font files, you can use additional fonts.  
To do so, you must create an instance of the `PdfFont` class and pass it to `createReportDrawer`.

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
      options: { oblique: true },
    },
    boldItalic: {
      name: 'NotoSerifJP-Bold',
      fileName: 'NotoSerifJP-Bold.otf',
      options: { oblique: true },
    },
  },
};

const fonts = new PdfFont({
  fontPath: "/path/to/fonts",
  additionalFontMap,
});
```

### **AdditionalFontMap**

`PdfFont` has an `AdditionalFontMap` to register additional fonts.  
The key is the font name, and the value is an object containing the font definition.  
The definition should contain objects of the following structure for each of `normal`, `bold`, `italic`, and `boldItalic`.

```ts
type AdditionalFontMapItem = {
  name: string;
  fileName: string;
  options?: {
    oblique?: boolean;
  };
};
```

These definitions specify which font to use and how to render it when bold or italic styling is applied.  
To see how `AdditionalFontMap` is actually defined, please refer to the definition of `additionalFontMap` in `src/__test_assets__/textTestHelper.ts`.

If you only want to use standard fonts, `additionalFontMap` can be passed as an empty object.

---

## **Creating a PDF**

You can create a drawer using `createReportDrawer`.  
To generate a PDF using the created drawer, call the `draw` method.

```ts
const stream = fs.createWriteStream('/path/to/output.pdf');
drawer.open(stream);
drawer.draw({ values, listRecords });
drawer.close();
```

- **`open` method**: Binds the stream that outputs the PDF and the `drawer`.
- **`draw` method**: Outputs the PDF.
- **`close` method**: Ends the PDF generation process.

The PDF is generated using the data passed in `values` and `listRecords`.  
The `draw` method prints one page. If you have data for multiple pages, you need to iterate through it and output it as follows.

```ts
// Output example
doc.open(stream);
records.forEach((values) => {
  const listRecords = getListRecord(values.id);
  drawer.draw({ values, listRecords });
});
doc.close();
```

If the number of records in `listRecords` exceeds the number defined in the report's `list`, a page will be added to the output. In this case, the same `values` will be used.
