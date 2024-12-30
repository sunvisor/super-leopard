/**
 * CreateShapesDrawer
 *
 * Created by sunvisor on 2025/01/29.
 * Copyright (C) Sunvisor Lab. 2025.
 */
import { MeasurementInterface, StaticShapeDrawers } from '../types';
import { StaticShapeDrawer } from '../StaticShapeDrawer';
import { SingleShapeDrawer } from '../SingleShapeDrawer';
import { GroupDrawer } from '../GroupDrawer';
import { ShapesDrawer } from '../ShapesDrawer';
import { FieldDataDrawer } from '../field/FieldDataDrawer';
import { ListDataDrawer } from '../list/ListDataDrawer';
import { TextDrawer } from '../TextDrawer';
import { Scale, TextShape } from '../../object';


type CreateDataDrawerParams = {
  staticShapeDrawers: StaticShapeDrawers;
  measurement: MeasurementInterface;
  scale: Scale;
}

export function createDataDrawer(params: CreateDataDrawerParams): ShapesDrawer {
  const { measurement, scale } = params;
  const textDrawer = new TextDrawer({
    textElementDrawer: params.staticShapeDrawers.text,
    rectDrawer: params.staticShapeDrawers.rect,
    measurement,
    scale
  });
  const staticShapeDrawers = {
    ...params.staticShapeDrawers,
    [TextShape]: textDrawer,
  }
  const staticShapeDrawer = new StaticShapeDrawer(staticShapeDrawers);
  const fieldDrawer = new FieldDataDrawer(staticShapeDrawer);
  const singleShapeDrawer = new SingleShapeDrawer(
    staticShapeDrawer,
    fieldDrawer,
  );
  const groupDrawer = new GroupDrawer(singleShapeDrawer);
  const listDrawer = new ListDataDrawer(groupDrawer, singleShapeDrawer);

  return new ShapesDrawer(
    singleShapeDrawer,
    groupDrawer,
    listDrawer,
  );
}
