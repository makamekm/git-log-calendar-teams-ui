import React from "react";
import { Container, Row, CardColumns, Col } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { SearchResultsLeftNav } from "~/app/SearchResults/SearchResultsLeftNav";
import { SearchResultsHeader } from "~/app/SearchResults/SearchResultsHeader";
import { ImagesResultsCard } from "~/app/SearchResults/ImagesResultsCard";
import { Paginations } from "~/app/Paginations";

export const ImagesResults = () => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Images Results" className="mb-5 mt-4" />
      {/* START Content */}
      <Row>
        <Col lg={3}>
          <SearchResultsLeftNav />
        </Col>
        <Col lg={9}>
          <SearchResultsHeader />
          <CardColumns>
            <ImagesResultsCard />
            <ImagesResultsCard />
            <ImagesResultsCard />
            <ImagesResultsCard />
            <ImagesResultsCard />
            <ImagesResultsCard />
            <ImagesResultsCard />
            <ImagesResultsCard />
            <ImagesResultsCard />
          </CardColumns>
          <div className="d-flex justify-content-center">
            <Paginations />
          </div>
        </Col>
      </Row>
      {/* END Content */}
    </Container>
  </React.Fragment>
);
