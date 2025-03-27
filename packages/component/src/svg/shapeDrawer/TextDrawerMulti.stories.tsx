// noinspection JSUnusedGlobalSymbols

/**
 * TextDrawer Story
 *
 * Created by sunvisor on 2023/12/01.
 * Copyright (C) Sunvisor Lab. 2023.
 */
import { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { AlignType, TextData, TextShape, ValignType } from "@sunvisor/super-leopard-core";
import { draw, TextProps } from '@/__test_assets__';

type Story = StoryObj<TextProps>

const meta: Meta<TextProps> = {
  title: 'svg/TextDrawer/Multi',
};

const longText = 'A large list of construction parameters, like any large parameter list, is a CodeSmell. Usually when I see these I find that many of the parameters are DataClumps and should be replaced by their own object. Having said that it\'s not unusual for constructor methods to have more parameters than other methods - but they are a good place to spot data clumps.\nコンストラクタのパラメータがたくさんあったら、その他のパラメータと同じく、コードの臭いだ。この状況を目にしたら、パラメータをDataClumpだと見なして、オブジェクトに置き換える。コンストラクタのパラメータの数が他のメソッドよりも多いのはよくあることだ、 なんて言われるけれど、ここはDataClumpが見つかるいい場所なのだ。';


const baseData: TextData = {
  type: TextShape,
  x: 10,
  y: 10,
  width: 180,
  height: 100,
  text: longText,
  font: {
    family: 'NotoSansJP',
    size: 12
  },
  color: '#000000',
  fillColor: '#ffffff',
  multiLine: true
}

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

export const MultilineText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      align: AlignType.LEFT,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const MultilineTextJustify: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      align: AlignType.JUSTIFY,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const MultilineTextJustifyAll: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      align: AlignType.JUSTIFY_ALL,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const MultilineTextCenter: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      align: AlignType.CENTER,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const MultilineTextRight: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      align: AlignType.RIGHT,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const MultilineTextMiddle: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      align: AlignType.LEFT,
      valign: ValignType.MIDDLE,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const MultilineTextBottom: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      align: AlignType.LEFT,
      valign: ValignType.BOTTOM,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const MultilineOverflow: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 30,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}
export const MultilineTextLinePitch: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 56,
      align: AlignType.LEFT,
      multiLine: true,
      linePitch: 7,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const MultilineFitCellText: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 20,
      align: AlignType.JUSTIFY,
      valign: ValignType.MIDDLE,
      fitCell: true,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export const MultilineFitCellTextShort: Story = {
  ...Template,
  args: {
    text: {
      ...baseData,
      height: 20,
      text: 'コンストラクタによる初期化を使う場合は、 生成メソッドに必要なコラボレータをすべて渡して、 常に妥当な状態のオブジェクトを作るようにしなければならない。',
      align: AlignType.CENTER,
      valign: ValignType.MIDDLE,
      fitCell: true,
    }
  },
  play: async ({ canvasElement, args }) => {
    const el = draw(canvasElement, args);
    await expect(el.querySelector('text')).toBeInTheDocument();
  }
}

export default meta;
