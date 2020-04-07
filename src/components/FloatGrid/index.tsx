import { Col } from "./Col";
import { Row } from "./Row";
import { Grid } from "./Grid";
import { Ready } from "./Ready";

const applyColumn = (columnId, layouts) => ({
  ...layouts[columnId],
  i: columnId,
  key: columnId,
});

export {
  Grid as FloatGrid,
  Col as FloatCol,
  Row as FloatRow,
  Ready as FloatReady,
  applyColumn,
};
