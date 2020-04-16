import React from "react";
import { Container, Row, CardColumns, Col } from "~/components";
import { HeaderMain } from "~/app/HeaderMain";
import { SearchResultsLeftNav } from "~/wip/SearchResults/SearchResultsLeftNav";
import { SearchResultsHeader } from "~/wip/SearchResults/SearchResultsHeader";
import { UsersResultsCard } from "~/wip/SearchResults/UsersResultsCard";
import { Paginations } from "~/wip/Paginations";

export const UsersResults = () => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Users Results" className="mb-5 mt-4" />
      {/* START Content */}
      <Row>
        <Col lg={3}>
          <SearchResultsLeftNav />
        </Col>
        <Col lg={9}>
          <SearchResultsHeader />
          <CardColumns>
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
            <UsersResultsCard />
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
