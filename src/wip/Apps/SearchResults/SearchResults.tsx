import React from "react";
import { Container, Row, Col } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { SearchResultsLeftNav } from "~/wip/SearchResults/SearchResultsLeftNav";
import { SearchResultsHeader } from "~/wip/SearchResults/SearchResultsHeader";
import { SearchResultsCard } from "~/wip/SearchResults/SearchResultsCard";
import { Paginations } from "~/wip/Paginations";

export const SearchResults = () => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Search Results" className="mb-5 mt-4" />
      {/* START Content */}
      <Row>
        <Col lg={3}>
          <SearchResultsLeftNav />
        </Col>
        <Col lg={9}>
          <SearchResultsHeader />
          <SearchResultsCard />
          <SearchResultsCard />
          <SearchResultsCard />
          <SearchResultsCard />
          <SearchResultsCard />
          <SearchResultsCard />
          <SearchResultsCard />
          <div className="d-flex justify-content-center">
            <Paginations />
          </div>
        </Col>
      </Row>
      {/* END Content */}
    </Container>
  </React.Fragment>
);
