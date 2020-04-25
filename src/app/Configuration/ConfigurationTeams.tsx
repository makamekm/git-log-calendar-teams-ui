import React from "react";
import { withResizeDetector } from "react-resize-detector";
import Toggle from "react-toggle";
import { observer } from "mobx-react";
import { List } from "react-content-loader";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Draggable,
  Droppable,
  DragDropContext,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";

import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownItem,
  Button,
  Input,
  DropdownMenu,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "~/components";
import { reorder } from "~/utilities";
import { ConfigurationState } from "./ConfigurationState";

export const ConfigurationTeams = observer(
  withResizeDetector(
    ({ state, width }: { state: ConfigurationState; width?: number }) => {
      const onDragEnd = React.useCallback(
        (
          { destination, source, reason }: DropResult,
          provider: ResponderProvided
        ) => {
          reorder(state.config.teams, source.index, destination.index);
        },
        [state]
      );
      return (
        <Accordion className="mb-3" initialOpen>
          <AccordionHeader className="h6 cursor-pointer">
            <div className="d-flex justify-content-center align-items-center">
              <div>
                Teams
                <span className="small ml-1 text-muted">#1.02</span>
              </div>
              <Button
                outline
                size="sm"
                className="ml-auto align-self-end"
                onClick={(e) => {
                  e.stopPropagation();
                  state.config.teams.unshift({
                    name: "",
                    invert: false,
                    users: [],
                  });
                }}
              >
                <i className="fa fa-plus mr-2"></i>Add
              </Button>
            </div>
          </AccordionHeader>
          <AccordionBody className="p-0">
            {!state.config || state.isLoadingDelay ? (
              <List className="m-4" height="200px" width="100%" />
            ) : (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <table
                      ref={provided.innerRef}
                      className="table table-striped mb-0"
                      style={{
                        maxWidth: "100%",
                        // background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                        width: "100%",
                      }}
                    >
                      <thead>
                        <tr>
                          <th className="bt-0">#</th>
                          <th className="bt-0">Name</th>
                          <th className="bt-0">Inverted</th>
                          <th className="bt-0">Users</th>
                          <th className="text-right bt-0">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.config.teams.map((team, index) => {
                          return (
                            <Draggable
                              draggableId={team.name}
                              key={team.name}
                              index={index}
                            >
                              {(providedDraggable, snapshot) => (
                                <tr
                                  ref={providedDraggable.innerRef}
                                  {...providedDraggable.draggableProps}
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
                                    className="align-middle"
                                    {...providedDraggable.dragHandleProps}
                                  >
                                    <i className="fas fa-grip-vertical"></i>
                                  </td>
                                  <td className="align-middle">
                                    <Input
                                      type="text"
                                      onChange={(e) => {
                                        team.name = e.currentTarget.value;
                                      }}
                                      value={team.name}
                                      placeholder="Name (Required & Unique)..."
                                    />
                                  </td>
                                  <td className="align-middle">
                                    <Toggle
                                      checked={team.invert}
                                      onChange={() => {
                                        team.invert = !team.invert;
                                        if (team.invert) {
                                          (team.users as any).replace([]);
                                        }
                                      }}
                                    />
                                  </td>
                                  <td
                                    className="align-middle"
                                    style={{
                                      maxWidth: "300px",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {!team.invert && (
                                      <Typeahead
                                        id="exclusions"
                                        placeholder="Add users..."
                                        multiple
                                        allowNew
                                        selected={team.users}
                                        onChange={(selected) => {
                                          selected = selected.map((s: any) =>
                                            typeof s === "string" ? s : s.label
                                          );
                                          (team.users as any).replace(selected);
                                        }}
                                        options={state.users}
                                        positionFixed
                                      />
                                    )}
                                  </td>
                                  <td className="align-middle text-right">
                                    <UncontrolledButtonDropdown>
                                      <DropdownToggle
                                        color="link"
                                        className="text-decoration-none"
                                      >
                                        <i className="fa fa-gear"></i>
                                        <i className="fa fa-angle-down ml-2"></i>
                                      </DropdownToggle>
                                      <DropdownMenu right>
                                        <DropdownItem
                                          onClick={() => {
                                            state.config.teams.splice(
                                              state.config.teams.indexOf(team),
                                              1
                                            );
                                          }}
                                        >
                                          <i className="fa fa-fw fa-trash mr-2"></i>
                                          Delete
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledButtonDropdown>
                                  </td>
                                </tr>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </tbody>
                    </table>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </AccordionBody>
        </Accordion>
      );
    }
  )
);
