Super Leopard core package
==============================

This provides a model for defining the elements of a report template.
This library basically prints a report by providing data to a report (template) defined in JSON.
The core library defines the format and basic behavior of the underlying report.
If you need to output a report other than web or PDF, you can create it using the core library.

Report
--------

A report contains pages and layers.

- `page`: Page object
- `layers`: Array of layer objects

Page
------

This is the object that defines the page.

- `size`: This is the size of the page. Specify the size name or size object.
- `orientation`: This specifies the paper orientation.
- `'landscape'`: Landscape orientation
- `'portrait'`: Portrait orientation
- `unit`: Specifies the unit to be used in the report.
  - `'mm'`: Millimeters
  - `'in'`: Inches
  - `'pt'`: Points
- `margin`: Specifies the margins.
    - `left`: Left margin
    - `top`: Top margin

The unit specified in `unit` is used throughout the report, but points are used for character size and line width.

Layers
---------

Layers can be placed in a single report.

- `name`: Layer name
- `shapes`: Array of drawing objects


Shape (drawing object)

Shape (drawing object) is defined internally as a TypeScript class, but it can be created from a plain object. Since report definitions are saved as plain objects, we will explain serialized plain objects here.

### Circle

Defines an object that draws a circle.

- `type`: `'circle'`
- `x`: X coordinate of the upper left corner
- `y`: Y coordinate of the upper left corner
- `diameter`: Diameter of the circle
- `fillColor`: Fill color
- `border`: Border (Border object)

### Ellipse

Defines an object that draws an ellipse.

- `type`: `'ellipse'`
- `x`: X coordinate of the upper left corner
- `y`: Y coordinate of the upper left corner
- `width`: Width
- `height`: Height
- `fillColor`: Fill color
- `border`: Border (Border object)

### Line

Defines an object that draws a straight line.

- `type`: `'line'`
- `x1`: X coordinate of starting point
- `y1`: Y coordinate of starting point
- `x2`: X coordinate of ending point
- `y2`: Y coordinate of ending point
- `border`: Border (Border object)

### Rect

Defines an object that draws a rectangle.

- `type`: `'rect'`
- `x`: X coordinate of upper left corner
- `y`: Top left Y coordinate
- `width`: Width
- `height`: Height
- `fillColor`: Fill color
- `border`: Border (Border object)

### Text

Defines an object for drawing text.

- `type`: `'text'`
- `x`: Top left X coordinate
- `y`: Top-left Y coordinate
- `width`: Width of the area
- `height`: Height of the area
- `text`: Text to display
- `align`: How to align the text horizontally
    - `'left'`: Left-aligned
    - `'center'`: Center-aligned
    - `'right'`: Right-aligned
    - `'justify'`: Justified on both sides
    - `'justify-all'`: justify all
- `valign`: how to align text vertically
- `multiLine`: multi-line text
- `linePitch`: line spacing (only valid if multiline is true)
- `fitCell`: adjust font size to fit area
- `font`: font
- `size`: Font size (in points)
- `style`: Font style (comma-separated list of the following strings)
    - `'italic'`: Italic
    - `'bold'`: Bold
    - `'underline'`: Underline
    - `'strike'`: Strike-through
- `color`: Text color
- `fillColor`: Background color (fill the area)

### Image

Defines an object for drawing an image.

- `type`: `'image'`
- `x`: X coordinate of the top left corner
- `y`: Y coordinate of the top left corner
- `width`: Width of the image
- `height`: Height of the image
- `src`: Name of the image

The application must handle the process of displaying the actual image from `src`.

### Barcode

Defines the object that will draw the barcode.

- `type`: `'barcode'`
- `x`: X coordinate of the top left corner
- `y`: Y coordinate of the top left corner
- `width`: Width of the barcode
- `height`: Height of the barcode
- `format`: Barcode format
    - `'code39'`: Code 39
    - `'code128'`: Code 128
    - `'jan'`: JAN
    - `'ean13'`: EAN-13
    - `'ean8'`: EAN-8
    - `'ean5'`: EAN-5
    - `'gs1_128'`: GS1-128
    - `'isbn'`: ISBN
    - `'itf'`: ITF
    - `'itf14'`: ITF-14
    - `'upca'`: UPC-A
    - `'upce'`: UPC-E
    - `'codabar'`: CODABAR
    - `'nw7'`: NW7
    - `'qr'`: QR Code
- `value`: Barcode value
- `options`: Barcode options
- `includeText`: Include text in barcode
- `rotate`: Rotate barcode (N: 0, R:90, I:180, L:270)

### Border

This is an object that defines a border.

- `style`: Border style
    - `'solid'`: solid
    - `'dashed'`: dashed
    - `'dotted'`: dotted
- `width`: width of border (in points)
- `color`: color of border

### Color

All specify a 6-digit hex color code starting with `#`.

Field
----------

This is an object for printing variable data on a report.
When printing, the given data is printed.
The Shape drawn by the field can be any of the above-mentioned Shapes.
In the case of text, the value passed to value is printed.
In the case of a barcode, the value is printed as a barcode.
In the case of other objects, if value is `true`, the specified Shape is drawn, and if it is `false`, it is not printed.

- `type`: `'field'`
- `name`: Field name
- `shape`: Object to display

Group
---------

You can treat multiple Shapes as a group.
The group can be printed repeatedly, not just as a single object.

- `type`: `'group'`
- `shapes`: Array of Shapes
- `repeatCount`: Number of times to repeat
- `direction`: Direction to repeat
    - `'horizontal'`
    - `'vertical'`
- `width`: Width (If not specified, it will be the width of the shapes)
- `height`: Height (if not specified, it will be the height of the shapes)

`width` / `height` are used as the size when repeating.

List
-------

Normally, a report prints one record per page, but if you want to print multiple records per page, use this list
Only one list can exist in a report.

- `type`: `'list'`
- `shapes`: Array of shapes
- `columns`: Number of times to repeat horizontally
- `rows`: Number of times to repeat vertically
- `width`: Width (if not specified, it will be the width of shapes)
- `height`: Height (if not specified, it will be the height of the shapes)
- `direction`: The direction of the first iteration

For example, if you specify `rows=10` and `columns=2`, it will create a list with 10 rows in 2 columns.
If `direction` is `'vertical'`, it will first repeat vertically, then horizontally.

License
--------

[MIT](LICENSE)
