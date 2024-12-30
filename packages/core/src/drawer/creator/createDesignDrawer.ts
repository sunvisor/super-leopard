import { ShapesDrawer } from '../ShapesDrawer';
import { TextDesignDrawer } from '../TextDesignDrawer';
import { StaticShapeDrawer } from '../StaticShapeDrawer';
import { ColorConfig, Scale, TextShape } from '../../object';
import { FieldDesignDrawer } from '../field/FieldDesignDrawer';
import { SingleShapeDrawer } from '../SingleShapeDrawer';
import { GroupDrawer } from '../GroupDrawer';
import { ListDesignDrawer } from '../list/ListDesignDrawer';
import { MeasurementInterface, StaticShapeDrawers } from '../types';
import { TextDrawer } from '../TextDrawer';


type CreateDesignDrawerParams = {
  staticShapeDrawers: StaticShapeDrawers
  measurement: MeasurementInterface;
  scale: Scale;
  fieldBorderColor: ColorConfig;
  textBorderColor: ColorConfig;
}

export function createDesignDrawer(params: CreateDesignDrawerParams): ShapesDrawer {
  const { staticShapeDrawers, measurement, scale, fieldBorderColor, textBorderColor } = params;
  const textDrawer = new TextDesignDrawer({
    textDrawer: new TextDrawer({
      textElementDrawer: params.staticShapeDrawers.text,
      rectDrawer: params.staticShapeDrawers.rect,
      measurement,
      scale
    }),
    rectDrawer: params.staticShapeDrawers.rect,
    borderColor: textBorderColor,
  });
  const staticShapeDrawer = new StaticShapeDrawer(
    {
      ...staticShapeDrawers,
      [TextShape]: textDrawer
    }
  );
  const fieldDrawer = new FieldDesignDrawer(
    staticShapeDrawer,
    fieldBorderColor,
  );
  const singleShapeDrawer = new SingleShapeDrawer(
    staticShapeDrawer,
    fieldDrawer,
  );
  const groupDrawer = new GroupDrawer(singleShapeDrawer);
  const listDrawer = new ListDesignDrawer(
    groupDrawer,
    singleShapeDrawer,
  );

  return new ShapesDrawer(
    singleShapeDrawer,
    groupDrawer,
    listDrawer,
  );
}
