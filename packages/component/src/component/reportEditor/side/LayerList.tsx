/**
 * LayerList
 *
 * Created by sunvisor on 2024/03/01.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import LayerListItem from './LayerListItem';
import { LayerData } from '@sunvisor/super-leopard-core';
import { Box, List } from '@mui/material';

type Props = {
  layers: LayerData[];
  activeLayerIndex: number;
  onChangeOrder: (layers: LayerData[], activeLayerIndex: number) => void;
  onChangeActiveLayer: (index: number) => void;
  onRemoveLayer: (index: number) => void;
  onRenameLayer: (index: number, name: string) => void;
}

export type LayerItem = {
  id: number;
  name: string;
  active: boolean;
  index: number;
}

function expandLayers(layers: LayerData[], activeLayerIndex: number): LayerItem[] {
  const newLayers = layers.map((layer, index) => ({
    id: index + 1,
    name: layer.name,
    active: index === activeLayerIndex,
    index,
  }));
  return newLayers.reverse();
}

export default function LayerList(props: Props) {
  const {
    layers, activeLayerIndex,
    onChangeOrder, onChangeActiveLayer, onRemoveLayer, onRenameLayer,
  } = props;
  const layerItems: LayerItem[] = useMemo(
    () => expandLayers(layers, activeLayerIndex),
    [layers, activeLayerIndex]
  );
  const [items, setItems] = useState<LayerItem[]>([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over === null) return;
      if (active.id !== over.id) {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        const activeIndex = newItems.findIndex(item => item.active);
        setItems(newItems);
        onChangeOrder(arrayMove(layers, items[oldIndex].index, items[newIndex].index), items[activeIndex].index);
      }
    }, [items, layers, onChangeOrder]
  );

  const handleSelect = useCallback(
    (item: LayerItem) => {
      onChangeActiveLayer(item.index);
    }, [onChangeActiveLayer]
  );

  const handleRemove = useCallback(
    (item: LayerItem) => {
      onRemoveLayer(item.index);
    }, [onRemoveLayer]
  );

  const handleRename = useCallback(
    (item: LayerItem, name: string) => {
      onRenameLayer(item.index, name);
    }, [onRenameLayer]
  )

  useEffect(() => {
    setItems(layerItems);
  }, [layerItems]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        <List>
          <SortableContext
            items={items}
            strategy={verticalListSortingStrategy}
          >
            {items.map(item => <LayerListItem
              key={item.id}
              item={item}
              onSelect={handleSelect}
              onRemove={handleRemove}
              onRename={handleRename}
            />)}
          </SortableContext>
        </List>
      </Box>
    </DndContext>
  );
}
