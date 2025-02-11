import { PdfDocumentInterface } from '../pdfDriver/PdfDriverInterface';


export const mockDoc: PdfDocumentInterface = {
  addPage: vi.fn(),
  font: vi.fn(),
  circle: vi.fn(),
  ellipse: vi.fn(),
  rect: vi.fn(),
  line: vi.fn(),
  text: vi.fn(),
  image: vi.fn(),
  measureHeight: vi.fn(),
  measureWidth: vi.fn(),
  registerFont: vi.fn(),
  open: vi.fn(),
  close: vi.fn(),
}
