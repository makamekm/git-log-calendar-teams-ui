import React from "react";
import { Container, Button } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { HeaderDemo } from "~/app/HeaderDemo";
import { MultipleVerticalLists } from "./components/MultipleVerticalLists";
import { DraggableTable } from "./components/DraggableTable";
import { HorizontalLists } from "./components/HorizontalLists";

export class DragAndDropElements extends React.Component {
  multipleVerticalListsRef = React.createRef<MultipleVerticalLists>();
  draggableTableRef = React.createRef<DraggableTable>();
  horizontalLists = React.createRef<HorizontalLists>();

  onResetState = () => {
    this.multipleVerticalListsRef.current.recoverInitialState();
    this.draggableTableRef.current.recoverInitialState();
    this.horizontalLists.current.recoverInitialState();
  };

  render() {
    return (
      <Container>
        <div className="d-flex">
          <div>
            <HeaderMain
              title="Drag &amp; Drop Elements"
              className="mb-5 mt-4"
            />
          </div>
          <Button
            onClick={this.onResetState}
            className="ml-auto align-self-center"
            color="primary"
            outline
          >
            Reset Layout
          </Button>
        </div>

        <div className="mb-5">
          <HeaderDemo
            no="1"
            title="Mutliple Verical Lists"
            subTitle="Both list are draggable horizontally and inner list elements can be swapped or reorderd"
          />
          <MultipleVerticalLists ref={this.multipleVerticalListsRef} />
        </div>

        <div className="mb-5">
          <HeaderDemo
            no="2"
            title="Table"
            subTitle="Allows reordering of the table rows"
          />
          <DraggableTable ref={this.draggableTableRef} />
        </div>
        <div>
          <HeaderDemo
            no="3"
            title="Horizontal Lists"
            subTitle="Items can be reaordered and moved between lists"
          />
          <HorizontalLists ref={this.horizontalLists} />
        </div>
      </Container>
    );
  }
}
