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

Report Editor
-------------

### Properties

- `report`: (optional) Report definition
- `reportId`: Report identifier
- `title`: Report title
- `language`: (optional) Language to use in editor
- `onSave`: Callback to be called when report definition is saved
- `settings`: (optional) Settings information

![report editor](../../docs/en/images/report_editor.png)

Report
-------

### Properties

This function gives data to a report and displays a preview on the screen.
If the report is in list format and spans multiple pages, the page specified by `pageNumber` will be displayed.

- `report`: Report definition
- `values`: Data to give to the report
- `listRecords`: List data to give to the report
- `pageNumber`: (optional) Number of the page to display
- `zoom`: (optional) Scale (%) to display
- `settings`: (optional) Settings information
