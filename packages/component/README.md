Super Leopard component package
==============================

Reports can be created by using a text editor to write the report definition in JSON.
However, this is a very tedious and time-consuming process.
In addition, even after the completed report has been incorporated into the application, it may be necessary to make modifications to the report design.

The Super Leopard component package provides a GUI component for creating reports.

Using these components, you can create a report editor or embed it in your application so that end users can edit the report definitions directly.

Components
--------------

The main components are as follows, although there are many components in total.

- `ReportEditor`: GUI component for editing report definitions
- `Report`: GUI component for displaying reports

The other components are used by these two components.

### ReportEditor

#### Properties

- `report`: (optional) Report definition
- `reportId`: Report identifier
- `title`: Report title
- `language`: (optional) Language to use in editor
- `onSave`: Callback to be called when report definition is saved
- `settings`: (optional) Settings information
- `showSaveButton`: (optional) Show save button (default: `true`)
- `additionalTools`: (optional) Additional tools to be shown before and/or after the save button
  - `after`: (optional) Additional tools to be shown after the save button
  - `before`: (optional) Additional tools to be shown before the save button
- `onChangeTitle`: A callback that is called when the title is changed
- 
![report editor](https://github.com/sunvisor/super-leopard/raw/main/docs/images/report_editor.png)

### Report

#### Properties

This function gives data to a report and displays a preview on the screen.
If the report is in list format and spans multiple pages, the page specified by `pageNumber` will be displayed.

- `report`: Report definition
- `values`: Data to give to the report
- `listRecords`: List data to give to the report
- `pageNumber`: (optional) Number of the page to display
- `zoom`: (optional) Scale (%) to display
- `settings`: (optional) Settings information

Hooks
------

### useReportManipulator フック

You can manipulate the report.
In ReportEditor, you can manipulate the report by operating it on the screen.
If you want to manipulate the report from outside ReportEditor, such as using a menu or external button, you can use this hook to manipulate the report.

- `select(area: Box | Position)`: Select objects
    - If `Box` is passed, the objects within the rectangle are selected
    - If `Position` is passed, the object at the front with the given coordinates is selected
- `selectAll()`: Select all objects
- `move(pos: Position)`: Move the selected objects
    - `pos`: The coordinates of the destination
- `resize(box: Box)`: Resize the selected object
- `box`: The rectangle after resizing
- `movePosition(positions: PositionPair)`: Move the selected object (`Line`)
    - `positions`: The pair of coordinates to move to
- `append(shape: Shape)`: Add an object
    - `shape`: The object to add
- `remove()`: Deletes the selected object
- `copy()`: Copies the selected object to the clipboard
- `paste()`: Pastes an object copied from the clipboard
- `cut()`: Copies the selected object to the clipboard and deletes it
- `undo()`: Undoes the last action
- `redo()`: Redoes the last action
- `canPaste()`: Returns whether or not pasting is possible (whether or not there is something on the clipboard)
- `canUndo`: Returns whether or not the last operation can be undone
- `canRedo`: Returns whether or not the last operation can be re-done
- `dirty`: Returns whether or not the current report has been changed

### useReport Hook

You can get and change the status of a report.

- `report`: Get the report definition
- `setReport`: Change the report definition

### useSelection Hook

You can get and change the selected object.

- `selection`: Get the selected object
- `setSelection`: Set the selected object
- `clearSelection`: Deselect the selected object

Settings
------

Settings are passed to the `ReportEditor` `settings` property. If the `settings` property is not passed, the default settings will be used.
The following settings can be configured.
While you don't need to change the default settings for most things, `getImageUrl` and `getImageList` for `image` are essential settings when working with images.

- `boundingBox`: Bounding box settings
    - `handleSize`: Handle size
    - `stroke`: Bounding box stroke settings
- `rubberBand`: Rubber band settings
    - `stroke`: Rubber band stroke settings
    - `dragThreshold`: Threshold for determining when dragging has started
- `lineSelect`: Settings for selecting line objects
    - `minTolerance`: Minimum tolerance for selecting line objects
- `defaultShapeSize`: Default object size
    - `width`: Width
    - `height`: Height
- `designMode`: Settings for design mode
    - `textBorder`: Color of the border for text objects
    - `fieldBorder`: Color of the border for field objects
- `fontMap`: Settings for the font to be used
    - key: Font ID
    - value: Font content
        - `label`: Display name of the font
        - `family`: Font family name to be used for screen rendering
        - `weight`: String specifying the thickness of the font
            - `regular`: Normal text
            - `bold`: Bold text
        - `style`: Array of available styles `bold`, `italic`
- `image`: options related to images
    - `getImageUrl`: function to get the URL of an image, if a filename is passed it will return the actual location
    - `noImageUrl: URL of an image to display if there is no image`
    - `getImageList`: function to get a list of available images
        - returns an array of `ImageListData`
- `barcode`: options related to barcodes
    - `errorImageUrl`: URL of the image to display instead of the barcode if there is an error in the barcode content

The default `settings` are as follows

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
  fontMap: {    // standard fonts
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
    getImageUrl: (src) => src,    // returns src
    noImageUrl,                   // set base64 image
    getImageList: async () => [], // returns empty array
  },
  barcode: {
    errorImageUrl,                // set base64 image
  }
}
```

When changing the settings, you can use the spread syntax to change part of it.

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


License
--------

[MIT](LICENSE)
