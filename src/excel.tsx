import React from "react";
import debounce from "debounce";
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  ColumnsDirective,
  RangesDirective,
  RangeDirective,
  RowsDirective,
  RowDirective,
  CellsDirective,
  CellDirective,
  ColumnDirective
} from "@syncfusion/ej2-react-spreadsheet";
import { defaultData } from "./data";

const [width, height] = remote.getCurrentWindow().getSize();

export const Excel = () => {
  const [boldRight] = React.useState<any>({ fontWeight: "bold", textAlign: "right" });
  const [bold] = React.useState<any>({ fontWeight: "bold" });
  const [state, setState] = React.useState<any>({ width, height });

  const onCreated = React.useCallback(() => {
    if (
      state.spreadsheet.sheets[state.spreadsheet.activeSheetIndex].name === "Car Sales Report" && !state.spreadsheet.isOpen
    ) {
      state.spreadsheet.cellFormat(
        { fontWeight: "bold", textAlign: "center", verticalAlign: "middle" },
        "A1:F1"
      );
      state.spreadsheet.numberFormat("$#,##0.00", "F2:F31");
    }
  }, [state]);

  React.useEffect(() => {
    const currentWindow = remote.getCurrentWindow();
    const listener = debounce(() => {
      const [width, height] = currentWindow.getSize();
      setState({ ...state, width, height });
    }, 100);
    
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [setState, state]);

  return (
    <SpreadsheetComponent
      height={state.height}
      ref={ssObj => {
        state.spreadsheet = ssObj;
      }}
      created={onCreated}
    >
      <SheetsDirective>
        <SheetDirective name="Car Sales Report">
          <RangesDirective>
            <RangeDirective dataSource={defaultData}></RangeDirective>
          </RangesDirective>
          <RowsDirective>
            <RowDirective index={30}>
              <CellsDirective>
                <CellDirective
                  index={4}
                  value="Total Amount:"
                  style={boldRight}
                ></CellDirective>
                <CellDirective
                  formula="=SUM(F2:F30)"
                  style={bold}
                ></CellDirective>
              </CellsDirective>
            </RowDirective>
          </RowsDirective>
          <ColumnsDirective>
            <ColumnDirective width={180}></ColumnDirective>
            <ColumnDirective width={130}></ColumnDirective>
            <ColumnDirective width={130}></ColumnDirective>
            <ColumnDirective width={180}></ColumnDirective>
            <ColumnDirective width={130}></ColumnDirective>
            <ColumnDirective width={120}></ColumnDirective>
          </ColumnsDirective>
        </SheetDirective>
      </SheetsDirective>
    </SpreadsheetComponent>
  );
}
