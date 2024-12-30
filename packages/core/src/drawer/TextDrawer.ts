/**
 * TextDrawer
 *
 * Created by sunvisor on 2025/02/06.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { Rect, RectShape, Scale, Text } from '../object';
import { DrawerParams, MeasurementInterface, RectDrawerInterface, TextDrawerInterface } from './types';
import { textAdjuster } from '../textAdjuster';


type TextDrawerProps = {
  textElementDrawer: TextDrawerInterface;
  rectDrawer: RectDrawerInterface;
  measurement: MeasurementInterface;
  scale: Scale;
}

/**
 * After processing the text with textAdjuster, call the specific Drawer
 */
export class TextDrawer implements TextDrawerInterface {

  private readonly textElementDrawer: TextDrawerInterface;
  private readonly rectDrawer: RectDrawerInterface;
  private readonly measurement: MeasurementInterface;
  private readonly scale: Scale;

  constructor(props: TextDrawerProps) {
    this.textElementDrawer = props.textElementDrawer;
    this.rectDrawer = props.rectDrawer;
    this.measurement = props.measurement;
    this.scale = props.scale;
  }

  draw(text: Text, params?: DrawerParams): void {
    const shapes = textAdjuster({
      text,
      scale: this.scale,
      measureHeight: (text: Text) => this.measurement.measureHeight(text),
      measureWidth: (text: Text) => this.measurement.measureWidth(text),
    });
    shapes.each(item => {
      if (item.type === RectShape) {
        this.rectDrawer.draw(item as Rect, params);
        return;
      }
      this.textElementDrawer.draw((item as Text), params);
    });
  }

}
