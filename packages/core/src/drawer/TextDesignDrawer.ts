/**
 * TextDesignDrawer
 *
 * Created by sunvisor on 2025/02/05.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { DrawerParams, RectDrawerInterface, TextDrawerInterface } from './types';
import { Shape, Text } from '../object';
import createBoundingBox from './creator/createBoundingBox';
import { ColorData } from '../data';

type TextDesignDrawerParams = {
  textDrawer: TextDrawerInterface;
  rectDrawer: RectDrawerInterface;
  borderColor: ColorData;
}

export class TextDesignDrawer implements TextDrawerInterface {

  private readonly textDrawer: TextDrawerInterface;
  private readonly rectDrawer: RectDrawerInterface;
  private readonly borderColor: ColorData;
  constructor(
    { textDrawer, rectDrawer, borderColor }: TextDesignDrawerParams
  ) {
    this.textDrawer = textDrawer;
    this.rectDrawer = rectDrawer;
    this.borderColor = borderColor;
  }

  draw(text: Text, params?: DrawerParams) {
    this.textDrawer.draw(text, params);
    this.drawBoundingBox(text, params);
  }

  private drawBoundingBox(shape: Shape, params?: DrawerParams): void {
    const rect = createBoundingBox(shape.bbox, this.borderColor);
    this.rectDrawer.draw(rect, params);
  }
}
