# Super Leopard - Report Generation Library
================================

**Super Leopard** is a library for generating reports.  
It allows you to insert data into a predefined template and output a **PDF**.  
Templates are structured in **JSON**, and a **GUI** is provided for editing them via a web interface.  
Super Leopard is designed to be integrated into applications, offering **flexible report generation capabilities**.

*We are currently developing it for release.*

[日本語の解説はこちら (Japanese document is here)](./docs/ja/README.md)

---

Super Leopard Features
----------------------

- **Generates PDF reports** from templates and data
- **Displays reports** on a web page using templates and data
- **Provides a web-based GUI** for editing templates

---

Project Structure
----------------------

This repository is structured using **npm workspaces**.  
The workspace structure is as follows:

```
.
├── packages
│      ├── barcode
│      ├── component
│      ├── core
│      ├── pdf
```

- **packages/core**: Core library for Super Leopard
- **packages/component**: GUI library for Super Leopard
- **packages/pdf**: Library for PDF generation
- **packages/barcode**: Library for barcode generation

---

### Core Library

The **core library** provides a model that defines each element of a report template (**Report**).  
Reports are defined in **JSON**, and their syntax is documented in the [core documentation](https://github.com/sunvisor/super-leopard/blob/main/packages/core/README.md).

However, there is no need to memorize the syntax.  
Templates can be created and edited using the **GUI** provided by the **component library**.

This library primarily **generates reports** by applying data to JSON-defined templates.  
It also defines the **format and behavior** of reports.  
If you need to output reports in formats other than **web pages or PDFs**, you can extend the core library.

---

### Barcode Library

The **barcode library** provides functionality for generating barcodes.  
It is used by both the **component** and **pdf** libraries.

---

### PDF Library

The **pdf library** provides functionality for **PDF generation**.  
It supports output via **HTTP servers** such as **Express** or **Fastify**, as well as **desktop applications** like **Electron**.  
This library utilizes **PDFKit** for PDF creation.

---

### Component Library

The **component library** provides **web-based UI components** for displaying reports and editing templates.  
Templates can be edited using a **web-based GUI**.

- Built with **React** and **MUI**
- Uses **Jotai** for state management

![report editor](https://github.com/sunvisor/super-leopard/raw/main/docs/images/report_editor.png)
