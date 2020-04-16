import React from "react";
import _ from "lodash";
import classNames from "classnames";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uid } from "uuid";
import {
  Card,
  CardHeader,
  CardTitle,
  AvatarAddonIcon,
  AvatarImage,
} from "~/components";
import { randomAvatar, randomArray } from "~/utilities";
import { reorder, move } from "./utilities";
import "./common.scss";

const generateItem = () => ({
  id: uid(),
  avatarUrl: randomAvatar(),
  status: randomArray(["success", "warning", "danger"]),
});

const getListClass = (isDraggedOver) =>
  classNames("list", {
    "list--drag-over": isDraggedOver,
  });

const RowList = (props: {
  listId?: string;
  items?: any[];
  title?: string;
  className?: string;
}) => (
  <Card className={props.className}>
    <CardHeader className="bg-none">
      <CardTitle className="h6 mb-0">{props.title}</CardTitle>
    </CardHeader>
    <Droppable droppableId={props.listId} direction="horizontal">
      {(provided, snapshot) => (
        <div
          className={`card-body d-flex ${getListClass(
            snapshot.isDraggingOver
          )}`}
          style={{ overflowX: "auto" }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {_.map(props.items, (item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  className="px-3"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <AvatarImage
                    key={`avatar-${item.id}`}
                    size="lg"
                    className="d-block"
                    src={item.avatarUrl}
                    addOns={[
                      <AvatarAddonIcon
                        className="fa fa-circle"
                        color="white"
                        key="avatar-icon-bg"
                      />,
                      <AvatarAddonIcon
                        className="fa fa-circle"
                        color={item.status}
                        key="avatar-icon-fg"
                      />,
                    ]}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </Card>
);

const initialState = {
  listAItems: _.times(_.random(3, 8), generateItem),
  listBItems: _.times(_.random(3, 8), generateItem),
  listCItems: _.times(_.random(3, 8), generateItem),
};

export class HorizontalLists extends React.Component<{
  className?: string;
}> {
  state = _.clone(initialState);

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // Handle List Items
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.state[`${source.droppableId}Items`],
        source.index,
        destination.index
      );

      this.setState({
        [`${source.droppableId}Items`]: items,
      });
    } else {
      const result = move(
        this.state[`${source.droppableId}Items`],
        this.state[`${destination.droppableId}Items`],
        source,
        destination
      );

      this.setState(_.mapKeys(result, (val, key) => `${key}Items`));
    }
  };

  recoverInitialState() {
    this.setState(initialState);
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <RowList
            listId="listA"
            items={this.state.listAItems}
            title="All Candidates"
          />
          <RowList
            listId="listB"
            items={this.state.listBItems}
            title="Candidates Interview"
            className="mt-4"
          />
          <RowList
            listId="listC"
            items={this.state.listCItems}
            title="Candidates Testing"
            className="mt-4"
          />
        </DragDropContext>
      </div>
    );
  }
}