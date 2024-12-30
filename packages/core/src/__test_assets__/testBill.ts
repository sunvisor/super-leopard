// noinspection JSUnusedGlobalSymbols

import { LayerData, ReportData, ShapeData } from '../data';


export const billTestData: ReportData = {
  page: {
    size: "A4",
    orientation: "portrait",
    unit: "mm",
    margin: {
      top: 20,
      left: 20
    }
  },
  layers: [
    {
      name: "layer1",
      shapes: [
        {
          name: "dateOfIssue",
          type: "field",
          shape: {
            type: "text",
            font: {
              family: "Helvetica",
              size: 10
            },
            color: "#000000",
            x: 140,
            y: 0,
            width: 30,
            height: 5,
            align: "right"
          }
        },
        {
          name: "customer",
          type: "field",
          shape: {
            type: "text",
            font: {
              family: "NotoSansJP",
              size: 10
            },
            color: "#000000",
            x: 0,
            y: 30,
            width: 70,
            height: 5,
            align: "right"
          }
        },
        {
          name: "subTotal",
          type: "field",
          shape: {
            type: "text",
            font: {
              family: "Helvetica",
              size: 10
            },
            color: "#000000",
            x: 130,
            y: 178,
            width: 35,
            height: 8,
            align: "right",
            valign: "middle"
          }
        },
        {
          name: "tax",
          type: "field",
          shape: {
            type: "text",
            font: {
              family: "Helvetica",
              size: 10
            },
            color: "#000000",
            x: 130,
            y: 186,
            width: 35,
            height: 8,
            align: "right",
            valign: "middle"
          }
        },
        {
          name: "total",
          type: "field",
          shape: {
            type: "text",
            font: {
              family: "Helvetica",
              size: 10
            },
            color: "#000000",
            x: 130,
            y: 194,
            width: 35,
            height: 8,
            align: "right",
            valign: "middle"
          }
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 20,
            style: "bold"
          },
          color: "#000000",
          x: 0,
          y: 10,
          text: "請　求　書",
          width: 170,
          height: 7,
          align: "center",
          valign: "middle"
        },
        {
          type: "line",
          x1: 60,
          y1: 20,
          x2: 110,
          y2: 20,
          border: {
            width: 0.25,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 60,
          y1: 20.5,
          x2: 110,
          y2: 20.5,
          border: {
            width: 0.25,
            color: "#000000"
          }
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 72,
          y: 30,
          width: 5,
          height: 5,
          text: "様"
        },
        {
          type: "text",
          font: {
            family: "Helvetica",
            size: 20
          },
          color: "#000000",
          x: 125,
          y: 40,
          text: "Sunvisor Lab.",
          width: 50,
          height: 10
        },
        {
          type: "image",
          x: 100,
          y: 40,
          src: "sunvisorlab_icon.png",
          width: 20,
          height: 20
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 0,
          y: 80,
          width: 170,
          height: 5,
          text: "下記の通りご請求申し上げます"
        },
        {
          type: "line",
          x1: 0,
          y1: 90,
          x2: 170,
          y2: 90,
          border: {
            width: 1,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 0,
          y1: 98,
          x2: 170,
          y2: 98,
          border: {
            width: 1,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 60,
          y1: 90,
          x2: 60,
          y2: 178,
          border: {
            width: 0.25,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 85,
          y1: 90,
          x2: 85,
          y2: 202,
          border: {
            width: 0.25,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 105,
          y1: 90,
          x2: 105,
          y2: 178,
          border: {
            width: 0.25,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 125,
          y1: 90,
          x2: 125,
          y2: 202,
          border: {
            width: 0.25,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 0,
          y1: 178,
          x2: 170,
          y2: 178,
          border: {
            width: 1,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 85,
          y1: 186,
          x2: 170,
          y2: 186,
          border: {
            width: 0.25,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 85,
          y1: 194,
          x2: 170,
          y2: 194,
          border: {
            width: 0.25,
            color: "#000000"
          }
        },
        {
          type: "line",
          x1: 85,
          y1: 202,
          x2: 170,
          y2: 202,
          border: {
            width: 1,
            color: "#000000"
          }
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 95,
          y: 180,
          width: 20,
          height: 5,
          text: "小計",
          align: "justify-all"
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 95,
          y: 188,
          width: 20,
          height: 5,
          text: "消費税額",
          align: "justify-all"
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 95,
          y: 196,
          width: 20,
          height: 5,
          text: "合計",
          align: "justify-all"
        },
        {
          type: "group",
          shapes: [
            {
              type: "line",
              x1: 0,
              y1: 106,
              x2: 170,
              y2: 106,
              border: {
                width: 0.25,
                style: "solid",
                cap: "butt",
                join: "miter",
                color: "#000000"
              }
            }
          ],
          repeatCount: 9,
          direction: "vertical",
          width: 170,
          height: 8
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 10,
          y: 92,
          width: 20,
          height: 5,
          text: "品　　　名"
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 70,
          y: 92,
          width: 12,
          height: 5,
          text: "納品日"
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 90,
          y: 92,
          width: 8,
          height: 5,
          text: "数量"
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 110,
          y: 92,
          width: 8,
          height: 5,
          text: "単価"
        },
        {
          type: "text",
          font: {
            family: "NotoSansJP",
            size: 10
          },
          color: "#000000",
          x: 140,
          y: 92,
          width: 8,
          height: 5,
          text: "金額"
        },
        {
          type: "list",
          height: 8,
          rows: 10,
          columns: 1,
          direction: "vertical",
          shapes: [
            {
              name: "itemName",
              type: "field",
              shape: {
                type: "text",
                font: {
                  family: "NotoSansJP",
                  size: 10
                },
                color: "#000000",
                x: 0,
                y: 98,
                width: 58,
                height: 8,
                valign: "middle"
              }
            },
            {
              name: "dateOfDelivery",
              type: "field",
              shape: {
                type: "text",
                font: {
                  family: "Helvetica",
                  size: 10
                },
                color: "#000000",
                x: 62,
                y: 98,
                width: 21,
                height: 8,
                valign: "middle"
              }
            },
            {
              name: "amount",
              type: "field",
              shape: {
                type: "text",
                font: {
                  family: "Helvetica",
                  size: 10
                },
                color: "#000000",
                x: 88,
                y: 98,
                width: 15,
                height: 8,
                align: "right",
                valign: "middle"
              }
            },
            {
              name: "unitPrice",
              type: "field",
              shape: {
                type: "text",
                font: {
                  family: "Helvetica",
                  size: 10
                },
                color: "#000000",
                x: 107,
                y: 98,
                width: 15,
                height: 8,
                align: "right",
                valign: "middle"
              }
            },
            {
              name: "price",
              type: "field",
              shape: {
                type: "text",
                font: {
                  family: "Helvetica",
                  size: 10
                },
                color: "#000000",
                x: 130,
                y: 98,
                width: 35,
                height: 8,
                align: "right",
                valign: "middle"
              }
            }
          ]
        }
      ]
    }
  ]
}

export const billTestShapesData: ShapeData[] = billTestData.layers[0].shapes as ShapeData[];

// noinspection JSUnusedGlobalSymbols
export const billTestLayerData: LayerData = billTestData.layers[0] as LayerData;

export const billValues = {
  dateOfIssue: '2024-01-01',
  customer: '株式会社 AAA',
  subTotal: '1,000,000',
  tax: '100,000',
  total: '1,100,000',
}

export const billListRecords = [
  {
    itemName: '0012345 商品AAA',
    dateOfDelivery: '2023-12-01',
    unitPrice: '100,000',
    amount: 1,
    price: '100,000',
  },
  {
    itemName: '0012346 商品BBB',
    dateOfDelivery: '2023-12-05',
    unitPrice: '200,000',
    amount: 1,
    price: '200,000',
  },
  {
    itemName: '0012347 商品CCC',
    dateOfDelivery: '2023-12-10',
    unitPrice: '350,000',
    amount: 2,
    price: '700,000',
  },
];

export function dummyBillRecords(count: number) {
  const records = [];
  for (let i = 0; i < count; i++) {
    records.push({
      itemName: `${100000 + i} 商品${i + 1}`,
      dateOfDelivery: '2023-12-01',
      unitPrice: '100,000',
      amount: 1,
      price: '100,000',
    });
  }
  return records;
}
