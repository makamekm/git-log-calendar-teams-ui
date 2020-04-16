/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import faker from "faker/locale/en_US";
import {
  Container,
  Media,
  Row,
  Button,
  Col,
  Card,
  CustomInput,
  CardImg,
  CardImgOverlay,
  CardBody,
  CardText,
  CardTitle,
  CardFooter,
  HolderIconProvider,
  AvatarImage,
  AvatarAddonIcon,
} from "~/components";
import { randomAvatar } from "~/utilities";
import { HeaderMain } from "~/app/HeaderMain";
import { HeaderSection } from "~/app/HeaderSection";

export const Images = () => (
  <Container>
    <HeaderMain title="Images" className="mb-5 mt-4" />
    {/* START Header 1 */}
    <Row>
      <Col lg={12}>
        <HeaderSection
          no={4}
          title="Images"
          subTitle="Documentation and examples for opting images into responsive behavior."
        />
      </Col>
    </Row>
    {/* END Header 1 */}
    {/* START Section 1 */}
    <Row>
      <Col lg={12}>
        <h6 className="">
          Images: Responsive Images
          <small className="text-muted">#1.01</small>
        </h6>
        <HolderIconProvider iconChar="" size={32} className="mb-3">
          <CardImg className="img-fluid mb-5" />
        </HolderIconProvider>
      </Col>
    </Row>
    <Row>
      <Col lg={12} className="mb-5">
        <h6 className="mb-2">
          Images: Thumbnails
          <small className="text-muted">#1.02</small>
        </h6>
        <HolderIconProvider iconChar="" size={32} width={200} height={200}>
          <CardImg className="img-thumbnail mr-2" />
        </HolderIconProvider>
        <HolderIconProvider iconChar="" size={32} width={200} height={200}>
          <CardImg className="img-thumbnail mr-2" />
        </HolderIconProvider>
        <HolderIconProvider iconChar="" size={32} width={200} height={200}>
          <CardImg className="img-thumbnail mr-2" />
        </HolderIconProvider>
        <HolderIconProvider iconChar="" size={32} width={200} height={200}>
          <CardImg className="img-thumbnail" />
        </HolderIconProvider>
      </Col>
    </Row>
    <Row>
      <Col lg={12}>
        <h6 className="mb-2">
          Images: Aligning
          <small className="text-muted">#1.03</small>
        </h6>
        <HolderIconProvider iconChar="" size={32} width={200} height={200}>
          <CardImg className="rounded float-left" />
        </HolderIconProvider>
        <HolderIconProvider iconChar="" size={32} width={200} height={200}>
          <CardImg className="rounded float-right" />
        </HolderIconProvider>
      </Col>
      <Col lg={12} className="mb-5">
        <HolderIconProvider iconChar="" size={32} width={200} height={200}>
          <CardImg className="rounded mx-auto d-block" />
        </HolderIconProvider>
      </Col>
    </Row>
    <Row>
      <Col lg={12} className="mb-5">
        <h6 className="mb-2">
          Images: Figures
          <small className="text-muted">#1.04</small>
        </h6>
        <figure className="figure mr-2">
          <HolderIconProvider iconChar="" size={32} width={400} height={400}>
            <CardImg className="figure-img img-fluid rounded" />
          </HolderIconProvider>
          <figcaption className="figure-caption">
            A caption for the above image.
          </figcaption>
        </figure>
        <figure className="figure">
          <HolderIconProvider iconChar="" size={32} width={400} height={400}>
            <CardImg className="figure-img img-fluid rounded" />
          </HolderIconProvider>
          <figcaption className="figure-caption text-right">
            A caption for the above image.
          </figcaption>
        </figure>
      </Col>
    </Row>
    <Row>
      <Col lg={12} className="mb-5">
        <h6 className="mb-2">
          Images: Styles
          <small className="text-muted">#1.05</small>
        </h6>
        <figure className="figure mr-2">
          <HolderIconProvider iconChar="" size={32} width={125} height={125}>
            <CardImg className="rounded" />
          </HolderIconProvider>
          <figcaption className="figure-caption">
            <code>.rounded</code>
          </figcaption>
        </figure>
        <figure className="figure mr-2">
          <HolderIconProvider iconChar="" size={32} width={125} height={125}>
            <CardImg className="rounded-top" />
          </HolderIconProvider>
          <figcaption className="figure-caption">
            <code>.rounded-top</code>
          </figcaption>
        </figure>
        <figure className="figure mr-2">
          <HolderIconProvider iconChar="" size={32} width={125} height={125}>
            <CardImg className="rounded-right" />
          </HolderIconProvider>
          <figcaption className="figure-caption">
            <code>.rounded-right</code>
          </figcaption>
        </figure>
        <figure className="figure mr-2">
          <HolderIconProvider iconChar="" size={32} width={125} height={125}>
            <CardImg className="rounded-bottom" />
          </HolderIconProvider>
          <figcaption className="figure-caption">
            <code>.rounded-bottom</code>
          </figcaption>
        </figure>
        <figure className="figure mr-2">
          <HolderIconProvider iconChar="" size={32} width={125} height={125}>
            <CardImg className="rounded-left" />
          </HolderIconProvider>
          <figcaption className="figure-caption">
            <code>.rounded-left</code>
          </figcaption>
        </figure>
        <figure className="figure mr-2">
          <HolderIconProvider iconChar="" size={32} width={125} height={125}>
            <CardImg className="rounded-circle" />
          </HolderIconProvider>
          <figcaption className="figure-caption">
            <code>.rounded-circle</code>
          </figcaption>
        </figure>
      </Col>
    </Row>
    {/* END Section 1 */}

    {/* START Header 2 */}
    <Row>
      <Col lg={12}>
        <HeaderSection
          no={2}
          title="Images: Title Options"
          className="mt-5"
          subTitle="Documentation and examples for opting images into responsive behavior."
        />
      </Col>
    </Row>
    {/* END Header 2 */}
    {/* START Section 2 */}
    <Row>
      <Col lg={4}>
        <Card className="mb-3">
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardTitle className="h6">Default Title</CardTitle>
            <CardText>
              <span className="text-muted mr-2 ">#2.01</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="d-flex h6 mb-0">
              <span className="">Icon Right Title</span>
              <i className="fa fa-info-circle ml-auto"></i>
            </CardTitle>
          </CardBody>
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardText>
              <span className="text-muted mr-2">#2.03</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="mb-3">
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardTitle className="h6">
              <a href="#">Link Title</a>
            </CardTitle>
            <CardText>
              <span className="text-muted mr-2 ">#2.02</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="mb-3">
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardTitle className="h6">
              <i className="fa fa-play-circle mr-2"></i>
              Icon Left Title
            </CardTitle>
            <CardText>
              <span className="text-muted mr-2 ">#2.03</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
    {/* END Section 2 */}

    {/* START Header 3 */}
    <Row>
      <Col lg={12}>
        <HeaderSection
          no={3}
          title="Images: Heading Options"
          className="mt-5"
          subTitle="Documentation and examples for opting images into responsive behavior."
        />
      </Col>
    </Row>
    {/* END Header 3 */}
    {/* START Section 3 */}
    <Row>
      <Col lg={4}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="d-flex h6 mb-0">Default Title</CardTitle>
          </CardBody>
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardText>
              <span className="text-muted mr-2 ">#3.01</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="d-flex h6 mb-0">
              Icon Right Title
              <i className="fa fa-info-circle ml-auto"></i>
            </CardTitle>
          </CardBody>
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardText>
              <span className="text-muted mr-2 ">#3.04</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="d-flex h6 mb-0">
              <a href="#">Link Title</a>
            </CardTitle>
          </CardBody>
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardText>
              <span className="text-muted mr-2 ">#3.02</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="d-flex h6 mb-0">
              <CustomInput
                type="checkbox"
                id="checkboxLeftTitle"
                label="Checkbox Left Title"
              />
            </CardTitle>
          </CardBody>
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardText>
              <span className="text-muted mr-2 ">#3.03</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="d-flex h6 mb-0">
              <i className="fa fa-play-circle mr-2"></i>
              Icon Left Title
            </CardTitle>
          </CardBody>
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardText>
              <span className="text-muted mr-2 ">#3.05</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardBody>
            <CardTitle className="d-flex h6 mb-0">
              <span>Checkbox Right Title</span>
              <CustomInput
                type="checkbox"
                id="checkboxRightTitle"
                label=""
                className="ml-auto mb-0"
              />
            </CardTitle>
          </CardBody>
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardText>
              <span className="text-muted mr-2 ">#3.06</span>
              {faker.lorem.sentences()}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
    {/* END Section 3 */}

    {/* START Header 4 */}
    <Row>
      <Col lg={12}>
        <HeaderSection
          no={4}
          title="Images: Footer Options"
          className="mt-5"
          subTitle="Documentation and examples for opting images into responsive behavior."
        />
      </Col>
    </Row>
    {/* END Header 4 */}
    {/* START Section 4 */}
    <Row>
      <Col lg={4}>
        <Card className="mb-3">
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardTitle className="h6">{faker.lorem.sentence()}</CardTitle>
            <CardText>
              <span className="text-muted mr-2 ">#4.01</span>
              {faker.lorem.paragraph()}
            </CardText>
          </CardBody>
          <CardFooter className="d-flex">
            <div className="mr-auto">
              <span className="mr-3">
                <i className="fa-heart fa mr-1"></i> 9
              </span>
              <span className="mr-3">
                <i className="fa-comment fa mr-1"></i> 37
              </span>
            </div>
            <span>4 Minutes Ago</span>
          </CardFooter>
        </Card>
        <Card className="mb-3">
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardTitle className="h6">{faker.lorem.sentence()}</CardTitle>
            <CardText>
              <span className="text-muted mr-2 ">#4.04</span>
              {faker.lorem.paragraph()}
            </CardText>
          </CardBody>
          <CardFooter className="d-flex">
            <a href="#">
              Read More
              <i className="fa fa-angle-right ml-2"></i>
            </a>
            <div className="align-self-center ml-auto">
              <i className="fa-star-o fa"></i>
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="mb-3">
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardTitle className="h6">{faker.lorem.sentence()}</CardTitle>
            <CardText>
              <span className="text-muted mr-2 ">#4.02</span>
              {faker.lorem.paragraph()}
            </CardText>
          </CardBody>
          <CardFooter className="d-flex">
            <div className="mr-auto">
              <i className="fa-heart-o fa mr-1"></i> 9
            </div>
            <div>
              <i className="fa-eye fa mr-1"></i> 87
            </div>
          </CardFooter>
        </Card>
        <Card className="mb-3">
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardTitle className="h6">{faker.lorem.sentence()}</CardTitle>
            <CardText>
              <span className="text-muted mr-2 ">#4.05</span>
              {faker.lorem.paragraph()}
            </CardText>
          </CardBody>
          <CardFooter className="d-flex">
            <Media>
              <Media left middle className="mr-3">
                <AvatarImage
                  size="md"
                  src={randomAvatar()}
                  addOns={[
                    <AvatarAddonIcon
                      className="fa fa-circle"
                      color="white"
                      key="avatar-icon-bg"
                    />,
                    <AvatarAddonIcon
                      className="fa fa-circle"
                      color="danger"
                      key="avatar-icon-fg"
                    />,
                  ]}
                />
              </Media>
              <Media body>
                <span className="mt-0 d-flex h6 mb-0">
                  {faker.name.firstName()} {faker.name.lastName()}
                </span>
                <p className="mb-0">2 Days Ago</p>
              </Media>
            </Media>
            <div className="align-self-center ml-auto">
              <i className="fa-heart-o fa"></i>
            </div>
          </CardFooter>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="mb-3">
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardTitle className="h6">{faker.lorem.sentence()}</CardTitle>
            <CardText>
              <span className="text-muted mr-2 ">#4.03</span>
              {faker.lorem.paragraph()}
            </CardText>
          </CardBody>
          <CardFooter className="d-flex">
            <Button color="primary mr-auto">
              Read More
              <i className="fa fa-angle-right ml-2"></i>
            </Button>{" "}
            <div className="align-self-center">16 Min. Ago</div>
          </CardFooter>
        </Card>
        <Card className="mb-3">
          <HolderIconProvider iconChar="" size={32}>
            <CardImg top />
          </HolderIconProvider>
          <CardBody>
            <CardTitle className="h6">{faker.lorem.sentence()}</CardTitle>
            <CardText>
              <span className="text-muted mr-2">#4.06</span>
              {faker.lorem.paragraph()}
            </CardText>
          </CardBody>
          <CardFooter className="d-flex">
            <div>
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-2"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="success"
                    key="avatar-icon-fg"
                  />,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-2"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="warning"
                    key="avatar-icon-fg"
                  />,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-2"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="secondary"
                    key="avatar-icon-fg"
                  />,
                ]}
              />
            </div>
            <div className="align-self-center ml-auto">
              <i className="fa-heart-o fa"></i>
            </div>
          </CardFooter>
        </Card>
      </Col>
    </Row>
    {/* END Section 4 */}

    {/* START Header 5 */}
    <Row>
      <Col lg={12}>
        <HeaderSection
          no={5}
          title="Images: Image Overlays"
          className="mt-5"
          subTitle="Documentation and examples for opting images into responsive behavior."
        />
      </Col>
    </Row>
    {/* END Header 5 */}
    {/* START Section 5 */}
    <Row>
      <Col lg={4}>
        <Card>
          <HolderIconProvider iconChar="" size={32}>
            <CardImg />
          </HolderIconProvider>
          <CardImgOverlay className="d-flex align-content-between flex-wrap">
            <span>
              <p className="card-text mt-0">
                <span className="badge badge-primary">Sport</span>
              </p>
              <h6 className="mb-2">
                <a href="#">
                  <span>{faker.commerce.productName()}</span>
                  <span className="text-muted ml-2">#5.01</span>
                </a>
              </h6>
              <p className="card-text text-dark">{faker.lorem.sentence()}</p>
            </span>
            <div className="d-flex">
              <div className="ml-auto">
                <span className="mr-3">
                  <i className="fa-heart fa mr-1"></i> 34
                </span>
                <span className="mr-3">
                  <i className="fa-comment fa mr-1"></i> 8
                </span>
              </div>
              <span>16 Minutes Ago</span>
            </div>
          </CardImgOverlay>
        </Card>
      </Col>
      <Col lg={4}>
        <Card>
          <HolderIconProvider iconChar="" size={32}>
            <CardImg />
          </HolderIconProvider>
          <CardImgOverlay
            className="d-flex align-content-between flex-wrap"
            style={{ height: "240px" }}
          >
            <p className="card-text mt-0">
              <span className="badge badge-primary">Electronics</span>
            </p>
            <span>
              <h6 className="mb-2">
                <a href="#">
                  <span>{faker.commerce.productName()}</span>
                  <span className="text-muted ml-2">#5.02</span>
                </a>
              </h6>
              <p className="card-text mb-3">{faker.lorem.sentence()}</p>
            </span>
          </CardImgOverlay>
          <CardFooter className="d-flex">
            <div>
              <span className="mr-3">
                <i className="fa-heart fa mr-1"></i> 34
              </span>
              <span className="mr-3">
                <i className="fa-comment fa mr-1"></i> 8
              </span>
            </div>
            <span className="ml-auto">4 Minutes Ago</span>
          </CardFooter>
        </Card>
      </Col>
    </Row>
    {/* END Section 5 */}
  </Container>
);
