import React from "react";
import { v4 as uid } from "uuid";
import faker from "faker/locale/en_US";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";

import { ProjectsList } from "~/wip/ProjectsDashboards/ProjectsList";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export class DraggableProjects extends React.Component {
  state = {
    projects: [
      {
        id: uid(),
        title: faker.commerce.productName(),
        badgeColor: "success",
        badgeTitle: "Active",
        progressValue: "76",
        completeValue: "13",
        myTasksValue: "35",
        daysDueValue: "6",
      },
      {
        id: uid(),
        title: faker.commerce.productName(),
        badgeColor: "danger",
        badgeTitle: "Suspended",
        progressValue: "23",
        completeValue: "6",
        myTasksValue: "87",
        daysDueValue: "15",
      },
      {
        id: uid(),
        title: faker.commerce.productName(),
        badgeColor: "secondary",
        badgeTitle: "Archived",
        progressValue: "4",
        completeValue: "98",
        myTasksValue: "21",
        daysDueValue: "7",
      },
      {
        id: uid(),
        title: faker.commerce.productName(),
        badgeColor: "warning",
        badgeTitle: "Paused",
        progressValue: "63",
        completeValue: "98",
        myTasksValue: "21",
        daysDueValue: "7",
      },
    ],
  };

  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const projects = reorder(
      this.state.projects,
      result.source.index,
      result.destination.index
    );

    this.setState({
      projects,
    });
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="list-group list-group-flush"
              ref={provided.innerRef}
            >
              {_.map(this.state.projects, ({ id, ...project }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="list-group-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        borderLeft:
                          snapshot.isDragging &&
                          "1px solid rgba(0, 0, 0, 0.125)",
                        borderRight:
                          snapshot.isDragging &&
                          "1px solid rgba(0, 0, 0, 0.125)",
                      }}
                    >
                      <ProjectsList {...project} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}