import React from "react";
import { Container, Row, Col } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { SearchResultsLeftNav } from "~/app/SearchResults/SearchResultsLeftNav";
import { SearchResultsHeader } from "~/app/SearchResults/SearchResultsHeader";
import { VideosResultsCard } from "~/app/SearchResults/VideosResultsCard";
import { Paginations } from "~/app/Paginations";

export const VideosResults = () => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Videos Results" className="mb-5 mt-4" />
      {/* START Content */}
      <Row>
        <Col lg={3}>
          <SearchResultsLeftNav />
        </Col>
        <Col lg={9}>
          <SearchResultsHeader />
          <VideosResultsCard />
          <VideosResultsCard />
          <VideosResultsCard />
          <VideosResultsCard />
          <VideosResultsCard />
          <VideosResultsCard />
          <div className="d-flex justify-content-center">
            <Paginations />
          </div>
        </Col>
      </Row>
      {/* END Content */}
    </Container>
  </React.Fragment>
);
