import React from "react";
import classNames from "classnames";
import { withResizeDetector } from "react-resize-detector";
import { observer, useObserver } from "mobx-react";
import {
  Draggable,
  Droppable,
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

import { reorder } from "~/utilities";

export interface ConfigurationTableProps<T = any> {
  items: ({
    name: string;
  } & T)[];
  header: any;
  render: (item: T) => any;
  renderAdditional?: (item: T, style: React.CSSProperties, className) => any;
}

export const ConfigurationTable = withResizeDetector(
  observer(
    ({
      items,
      width,
      header,
      render,
      renderAdditional,
    }: ConfigurationTableProps & {
      width?: number;
    }) => {
      const onDragEnd = React.useCallback(
        (
          { destination, source, reason }: DropResult,
          provider: ResponderProvided
        ) => {
          reorder(items, source.index, destination.index);
        },
        [items]
      );
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) =>
              useObserver(() => (
                <table
                  ref={provided.innerRef}
                  className="s-table"
                  style={{
                    maxWidth: "100%",
                    width: "100%",
                  }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      {header}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      return (
                        <Draggable
                          draggableId={item.id}
                          key={item.id}
                          index={index}
                        >
                          {(providedDraggable, snapshot) =>
                            useObserver(() => (
                              <>
                                <tr
                                  ref={providedDraggable.innerRef}
                                  {...providedDraggable.draggableProps}
                                  className={classNames({
                                    odd: index % 2 === 0,
                                    even: index % 2 === 1,
                                  })}
                                  style={{
                                    ...providedDraggable.draggableProps.style,
                                    width: snapshot.isDragging
                                      ? width
                                      : undefined,
                                    display: snapshot.isDragging
                                      ? "table"
                                      : undefined,
                                  }}
                                >
                                  <td
                                    className="align-middle text-center"
                                    {...providedDraggable.dragHandleProps}
                                  >
                                    <i className="fas fa-grip-vertical mt-2"></i>
                                  </td>
                                  {render(item)}
                                </tr>
                                {renderAdditional &&
                                  renderAdditional(
                                    item,
                                    {
                                      ...providedDraggable.draggableProps.style,
                                      display: snapshot.isDragging
                                        ? "none"
                                        : undefined,
                                    },
                                    classNames({
                                      odd: index % 2 === 0,
                                      even: index % 2 === 1,
                                    })
                                  )}
                              </>
                            ))
                          }
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </tbody>
                </table>
              ))
            }
          </Droppable>
        </DragDropContext>
      );
    }
  )
) as React.FC<ConfigurationTableProps>;
