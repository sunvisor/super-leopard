// noinspection JSUnusedGlobalSymbols

/**
 * TextDrawer Story
 *
 * Created by sunvisor on 2023/12/01.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { AlignType, TextData, TextShape, ValignType } from '@sunvisor/super-leopard-core';
import { draw, TextProps } from '../../__test_assets__';

type Story = StoryObj<TextProps>

const meta: Meta<TextProps> = {
  title: 'svg/TextDrawer/Single',
};

const baseData: TextData = {
  type: TextShape,
  x: 10,
  y: 10,
  width: 180,
  height: 6,
  text: '',
  font: {
    family: 'Courier',
    size: 12
  },
  color: '#000000',
};

const Template: Story = {
  render: () => (
    <div style={{
      width: '200mm',
      height: '200mm',
      border: '1px solid black',
      boxShadow: '5px 5px 3px 3px lightgray',
      backgroundColor: 'lightgoldenrodyellow',
    }} data-testid="test">
    </div>
  ),
};

export const SimpleText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: 'シンプル Simple Text',
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const ItalicText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: 'イタリック Italic Text',
      font: {
        family: 'Courier',
        style: 'italic',
        size: 12
      },
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const BoldText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: 'ボルド Bold Text',
      font: {
        family: 'Courier',
        style: 'bold',
        size: 12
      },
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const UnderlineText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: 'アンダーライン Underline Text',
      font: {
        family: 'Courier',
        style: 'underline',
        size: 12
      },
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const StrikeText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: '打ち消し線 Strike Text',
      font: {
        family: 'Courier',
        style: 'strike',
        size: 12
      },
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const FullDecorationText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: '全ての装飾 Full Decoration Text',
      font: {
        family: 'Courier',
        style: 'BIUS',
        size: 12
      },
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const TooLongText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      width: 50,
      text: '長過ぎる文字列は切れて表示される',
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const AlignLeftText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: '左寄せ Align Left Text',
      align: AlignType.LEFT
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const AlignCenterText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: '中央揃え Align Center Text',
      align: AlignType.CENTER
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const AlignRightText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: '右寄せ Align Right Text',
      align: AlignType.RIGHT
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const AlignJustifyText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: '両端揃え Align Justify Text',
      font: {
        family: 'Helvetica',
        size: 12
      },
      fillColor: '#ffffff',
      align: AlignType.JUSTIFY,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const AlignJustifyAllText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: '均等割付 Align Justify All Text',
      font: {
        family: 'Helvetica',
        size: 12
      },
      fillColor: '#ffffff',
      align: AlignType.JUSTIFY_ALL,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const VerticalAlignTopText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 180,
      text: '上寄せ Vertical Align Top Text',
      valign: ValignType.TOP
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const VerticalAlignMiddleText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 180,
      text: '縦中央 Vertical Align Middle Text',
      valign: ValignType.MIDDLE
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const VerticalAlignBottomText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 180,
      text: '下寄せ Vertical Align Bottom Text',
      valign: ValignType.BOTTOM
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const BothCenterAlignText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 180,
      text: '縦横中央 Both Center Align Text',
      align: AlignType.CENTER,
      valign: ValignType.MIDDLE
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const RedText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 10,
      text: '赤い文字 Red Text',
      font: {
        family: 'NotoSerifJP',
        size: 24
      },
      color: '#ff0000',
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const RedBackSimpleText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 9,
      text: '赤背景のシンプルな文字 Red Back Simple Text',
      font: {
        family: 'NotoSansJP',
        size: 20
      },
      color: '#eee',
      fillColor: '#ff0000',
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const RedBackAlignJustifyText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 9,
      text: '赤背景の均等割付 Red Back Justify-All Text',
      font: {
        family: 'Helvetica',
        size: 20
      },
      color: '#eee',
      fillColor: '#ff0000',
      align: AlignType.JUSTIFY_ALL
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const RedBackValignMiddleText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 20,
      text: '赤背景の上下中央 Red Back Valign Middle Text',
      font: {
        family: 'Helvetica',
        size: 20
      },
      color: '#eee',
      fillColor: '#ff0000',
      align: AlignType.CENTER,
      valign: ValignType.MIDDLE,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const FitCellTextShort: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      width: 80,
      height: 10,
      text: '範囲内に収める Fit Cell Text',
      align: AlignType.CENTER,
      valign: ValignType.MIDDLE,
      fillColor: '#ffffff',
      fitCell: true
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const FitCellTextLong: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      width: 80,
      height: 10,
      text: '範囲内に収める Fit Cell Text 少し長すぎる文字列',
      align: AlignType.JUSTIFY,
      valign: ValignType.MIDDLE,
      multiLine: false,
      fitCell: true
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const Opacity: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      text: '半透明',
      height: 10,
      font: {
        family: 'Helvetica',
        size: 20
      },
      color: '#eee',
      fillColor: '#ff0000',
      align: AlignType.CENTER,
    },
    opacity: 0.5,
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export default meta;
