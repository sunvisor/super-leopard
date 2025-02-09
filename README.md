Super Leopard - Report generation library
==============================

Super Leopard is a library for creating reports.
It can add data to a template written in a specified format and output a PDF.
The template data is expressed in JSON, but a GUI is provided for editing on a web screen.
Super Leopard is intended to be incorporated into your application to provide flexible report generation functionality.

We are currently developing it for release.

[日本語の解説はこちら(Japanese document is here)](./docs/ja/README.md)

Super Leopard features
-------------------

- Outputs a PDF report from a template and data
- Displays a report on a web page from a template and data
- Edits a template on a web page

Project structure
-------------------

This repository is structured using npm workspace.
The workspace structure is as follows.

```
.
├── packages
│ ├── component
│ ├── core
│ ├── pdf
```

- packages/core: Super Leopard core library
- packages/component: Super Leopard GUI library
- packages/pdf: PDF output library

### component library

This provides a function to display forms on a web screen and a GUI for editing form templates.
You can edit templates on a web screen.
The component is implemented using React and MUI.

![report editor](docs/en/images/report_editor.png)

### pdf library

This provides a library for outputting PDF.
You can output PDF using HTTP servers such as Express or Fastify.
This library uses PDFKit for creating PDF.

### core library

This provides a model for defining each element of the report template.
The processing common to the component library and pdf library is mainly placed here.
If you need a report that outputs something other than web or PDF, you can create it using the core library.

License
-------

MIT
