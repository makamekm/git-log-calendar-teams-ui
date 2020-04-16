import React from "react";
import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  CardTitle,
  AvatarImage,
  AvatarFont,
  AvatarAddonIcon,
  AvatarAddonBadge,
} from "~/components";
import { randomAvatar } from "~/utilities";
import { HeaderMain } from "~/app/HeaderMain";
import { HeaderSection } from "~/app/HeaderSection";

export const Avatars = () => (
  <React.Fragment>
    <Container>
      <HeaderMain title="Avatars" className="mb-5 mt-4" />
      {/* START Header 1 */}
      <Row>
        <Col lg={12}>
          <HeaderSection
            no={1}
            title="Avatars Sizes"
            subTitle={
              <React.Fragment>
                There are versions available default, that is avatar: large:
                avatar <code>avatar-lg</code> & small: avatar{" "}
                <code>avatar-sm</code>.
              </React.Fragment>
            }
          />
        </Col>
      </Row>
      {/* END Header 1 */}
      {/* START Section 1 */}
      <Row>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Sizes: Large
                <span className="small ml-1 text-muted">#1.01</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarImage size="lg" src={randomAvatar()} className="mr-2" />
              <AvatarImage size="lg" src={randomAvatar()} className="mr-2" />
              <AvatarImage size="lg" src={randomAvatar()} />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Sizes: Default
                <span className="small ml-1 text-muted">#1.02</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarImage size="md" src={randomAvatar()} className="mr-2" />
              <AvatarImage size="md" src={randomAvatar()} className="mr-2" />
              <AvatarImage size="md" src={randomAvatar()} className="mr-2" />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Sizes: Small
                <span className="small ml-1 text-muted">#1.03</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarImage size="sm" src={randomAvatar()} className="mr-2" />
              <AvatarImage size="sm" src={randomAvatar()} className="mr-2" />
              <AvatarImage size="sm" src={randomAvatar()} className="mr-2" />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* END Section 1 */}

      {/* START Header 2 */}
      <Row>
        <Col lg={12}>
          <HeaderSection
            no={2}
            title="Avatars Types"
            subTitle={
              <React.Fragment>
                There are versions available default, that is avatar: large:
                avatar <code>avatar-lg</code> & small: avatar{" "}
                <code>avatar-sm</code>.
              </React.Fragment>
            }
            className="mt-5"
          />
        </Col>
      </Row>
      {/* END Header 2 */}
      {/* START Section 2 */}
      <Row>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatars: Photos
                <span className="small ml-1 text-muted">#2.01</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarImage size="lg" src={randomAvatar()} className="mr-2" />
              <AvatarImage size="md" src={randomAvatar()} className="mr-2" />
              <AvatarImage size="sm" src={randomAvatar()} className="mr-2" />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatars: Text
                <span className="small ml-1 text-muted">#2.02</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarFont size="lg" bgColor="primary" className="mr-2">
                VN
              </AvatarFont>
              <AvatarFont size="md" bgColor="info" className="mr-2">
                FS
              </AvatarFont>
              <AvatarFont size="sm" bgColor="secondary" className="mr-2">
                +4
              </AvatarFont>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatars: Icons
                <span className="small ml-1 text-muted">#2.03</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarFont size="lg" bgColor="200" className="mr-2">
                <i className="fa fa-user" />
              </AvatarFont>
              <AvatarFont size="md" bgColor="200" className="mr-2">
                <i className="fa fa-plus" />
              </AvatarFont>
              <AvatarFont size="sm" bgColor="200" className="mr-2">
                <i className="fa fa-bars" />
              </AvatarFont>
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
            title="Avatars Status"
            subTitle={
              <React.Fragment>
                There are versions available default, that is avatar: large:
                avatar <code>avatar-lg</code> & small: avatar{" "}
                <code>avatar-sm</code>.
              </React.Fragment>
            }
            className="mt-5"
          />
        </Col>
      </Row>
      {/* END Header 3 */}
      {/* START Section 3 */}
      <Row>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Status Large
                <span className="small ml-1 text-muted">#3.01</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
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
                size="lg"
                src={randomAvatar()}
                className="mr-3"
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
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
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
                size="lg"
                src={randomAvatar()}
                className="mr-3"
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
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Status Default
                <span className="small ml-1 text-muted">#3.02</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
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
                className="mr-3"
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
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
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
                className="mr-3"
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
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Status Small
                <span className="small ml-1 text-muted">#3.03</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
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
                size="sm"
                src={randomAvatar()}
                className="mr-3"
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
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
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
                size="sm"
                src={randomAvatar()}
                className="mr-3"
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
            title="Avatars Badges Pills"
            subTitle={
              <React.Fragment>
                There are versions available default, that is avatar: large:
                avatar <code>avatar-lg</code> & small: avatar{" "}
                <code>avatar-sm</code>.
              </React.Fragment>
            }
            className="mt-5"
          />
        </Col>
      </Row>
      {/* END Header 4 */}
      {/* START Section 4 */}
      <Row>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Badges Pills Small
                <span className="small ml-1 text-muted">#4.01</span>
              </CardTitle>
              <p className="card-text">Avatars with badges</p>
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="primary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="danger" key="avatar-badge">
                    12
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="secondary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="success" key="avatar-badge">
                    7
                  </AvatarAddonBadge>,
                ]}
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Badges Pills Default
                <span className="small ml-1 text-muted">#4.02</span>
              </CardTitle>
              <p className="card-text">Avatars with badges</p>
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="primary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="danger" key="avatar-badge">
                    12
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="secondary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="success" key="avatar-badge">
                    7
                  </AvatarAddonBadge>,
                ]}
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Badges Pills Small
                <span className="small ml-1 text-muted">#4.03</span>
              </CardTitle>
              <p className="card-text">Avatars with badges</p>
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="primary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="danger" key="avatar-badge">
                    12
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="secondary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge pill color="success" key="avatar-badge">
                    7
                  </AvatarAddonBadge>,
                ]}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* END Section 4 */}

      {/* START Header 5 */}
      <Row>
        <Col lg={12}>
          <HeaderSection
            no={5}
            title="Avatars Badges"
            subTitle={
              <React.Fragment>
                There are versions available default, that is avatar: large:
                avatar <code>avatar-lg</code> & small: avatar{" "}
                <code>avatar-sm</code>.
              </React.Fragment>
            }
            className="mt-5"
          />
        </Col>
      </Row>
      {/* END Header 5 */}
      {/* START Section 5 */}
      <Row>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Badges Small
                <span className="small ml-1 text-muted">#5.01</span>
              </CardTitle>
              <p className="card-text">Avatars with badges</p>
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-2"
                addOns={[
                  <AvatarAddonBadge color="primary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-2"
                addOns={[
                  <AvatarAddonBadge color="danger" key="avatar-badge">
                    12
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-2"
                addOns={[
                  <AvatarAddonBadge color="secondary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-2"
                addOns={[
                  <AvatarAddonBadge color="success" key="avatar-badge">
                    7
                  </AvatarAddonBadge>,
                ]}
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Badges Default
                <span className="small ml-1 text-muted">#5.02</span>
              </CardTitle>
              <p className="card-text">Avatars with badges</p>
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge color="primary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge color="danger" key="avatar-badge">
                    12
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge color="secondary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge color="success" key="avatar-badge">
                    7
                  </AvatarAddonBadge>,
                ]}
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Badges Small
                <span className="small ml-1 text-muted">#5.03</span>
              </CardTitle>
              <p className="card-text">Avatars with badges</p>
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge color="primary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge color="danger" key="avatar-badge">
                    12
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge color="secondary" key="avatar-badge">
                    4
                  </AvatarAddonBadge>,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonBadge color="success" key="avatar-badge">
                    7
                  </AvatarAddonBadge>,
                ]}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* END Section 5 */}

      {/* START Header 6 */}
      <Row>
        <Col lg={12}>
          <HeaderSection
            no={6}
            title="Avatars Icons"
            subTitle={
              <React.Fragment>
                There are versions available default, that is avatar: large:
                avatar <code>avatar-lg</code> & small: avatar{" "}
                <code>avatar-sm</code>.
              </React.Fragment>
            }
            className="mt-5"
          />
        </Col>
      </Row>
      {/* END Header 6 */}
      {/* START Section 6 */}
      <Row>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Custom Icons Large
                <span className="small ml-1 text-muted">#6.01</span>
              </CardTitle>
              <p className="card-text">Avatars with badges</p>
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="facebook"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-facebook"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="twitter"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-twitter"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="linkedin"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-linkedin"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="success"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-plus"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="lg"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="danger"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-minus"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Custom Icons Default
                <span className="small ml-1 text-muted">#6.02</span>
              </CardTitle>
              <p className="card-text">Avatars with badges</p>
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="facebook"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-facebook"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="twitter"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-twitter"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="linkedin"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-linkedin"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="success"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-plus"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="md"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="danger"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-minus"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatar: Custom Icons Small
                <span className="small ml-1 text-muted">#6.03</span>
              </CardTitle>
              <p className="card-text">Avatars with badges</p>
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="facebook"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-facebook"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="twitter"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-twitter"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="linkedin"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-linkedin"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="success"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-plus"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
              <AvatarImage
                size="sm"
                src={randomAvatar()}
                className="mr-3"
                addOns={[
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="white"
                    key="avatar-icon-white-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-circle"
                    color="danger"
                    key="avatar-icon-bg"
                  />,
                  <AvatarAddonIcon
                    className="fa fa-minus"
                    color="white"
                    key="avatar-icon-fg"
                    small
                  />,
                ]}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* END Section 6 */}

      {/* START Header 7 */}
      <Row>
        <Col lg={12}>
          <HeaderSection
            no={7}
            title="Avatars Colors"
            subTitle={
              <React.Fragment>
                There are versions available default, that is avatar: large:
                avatar <code>avatar-lg</code> & small: avatar{" "}
                <code>avatar-sm</code>.
              </React.Fragment>
            }
            className="mt-5"
          />
        </Col>
      </Row>
      {/* END Header 7 */}
      {/* START Section 7 */}
      <Row>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatars: Colors Default
                <span className="small ml-1 text-muted">#7.01</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarFont bgColor="primary" className="mr-1">
                PR
              </AvatarFont>
              <AvatarFont bgColor="info" className="mr-1">
                IN
              </AvatarFont>
              <AvatarFont bgColor="success" className="mr-1">
                SU
              </AvatarFont>
              <AvatarFont bgColor="warning" className="mr-1">
                WA
              </AvatarFont>
              <AvatarFont bgColor="danger" className="mr-1">
                DA
              </AvatarFont>
              <AvatarFont bgColor="secondary" className="mr-1">
                SE
              </AvatarFont>
              <AvatarFont bgColor="dark" className="mr-1">
                DA
              </AvatarFont>
              <AvatarFont bgColor="light" fgColor="secondary" className="mr-1">
                LI
              </AvatarFont>
              <AvatarFont bgColor="white" fgColor="secondary" className="mr-1">
                WH
              </AvatarFont>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatars: Gray Colors
                <span className="small ml-1 text-muted">#7.02</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarFont bgColor="100" fgColor="secondary" className="mr-1">
                100
              </AvatarFont>
              <AvatarFont bgColor="200" fgColor="secondary" className="mr-1">
                200
              </AvatarFont>
              <AvatarFont bgColor="300" fgColor="secondary" className="mr-1">
                300
              </AvatarFont>
              <AvatarFont bgColor="400" fgColor="secondary" className="mr-1">
                400
              </AvatarFont>
              <AvatarFont bgColor="500" fgColor="dark" className="mr-1">
                500
              </AvatarFont>
              <AvatarFont bgColor="600" fgColor="white" className="mr-1">
                600
              </AvatarFont>
              <AvatarFont bgColor="700" fgColor="white" className="mr-1">
                700
              </AvatarFont>
              <AvatarFont bgColor="800" fgColor="white" className="mr-1">
                800
              </AvatarFont>
              <AvatarFont bgColor="900" fgColor="white" className="mr-1">
                900
              </AvatarFont>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatars: Other Colors
                <span className="small ml-1 text-muted">#7.03</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarFont bgColor="indigo" className="mr-1">
                IN
              </AvatarFont>
              <AvatarFont bgColor="purple" className="mr-1">
                PU
              </AvatarFont>
              <AvatarFont bgColor="pink" className="mr-1">
                PI
              </AvatarFont>
              <AvatarFont bgColor="teal" className="mr-1">
                TE
              </AvatarFont>
              <AvatarFont bgColor="cyan" className="mr-1">
                CY
              </AvatarFont>
            </CardBody>
          </Card>
        </Col>
        <Col lg={12}>
          <Card className="mb-3">
            <CardBody>
              <CardTitle tag="h6">
                Avatars: Colors Social
                <span className="small ml-1 text-muted">#7.04</span>
              </CardTitle>
              <p className="card-text">Large size avatar example</p>
              <AvatarFont bgColor="facebook" fgColor="white" className="mr-1">
                <i className="fa fa-facebook" />
              </AvatarFont>
              <AvatarFont bgColor="twitter" fgColor="white" className="mr-1">
                <i className="fa fa-twitter" />
              </AvatarFont>
              <AvatarFont bgColor="lastfm" fgColor="white" className="mr-1">
                <i className="fa fa-lastfm" />
              </AvatarFont>
              <AvatarFont bgColor="pinterest" fgColor="white" className="mr-1">
                <i className="fa fa-pinterest" />
              </AvatarFont>
              <AvatarFont bgColor="linkedin" fgColor="white" className="mr-1">
                <i className="fa fa-linkedin" />
              </AvatarFont>
              <AvatarFont bgColor="medium" fgColor="white" className="mr-1">
                <i className="fa fa-medium" />
              </AvatarFont>
              <AvatarFont bgColor="skype" fgColor="white" className="mr-1">
                <i className="fa fa-skype" />
              </AvatarFont>
              <AvatarFont bgColor="foursquare" fgColor="white" className="mr-1">
                <i className="fa fa-foursquare" />
              </AvatarFont>
              <AvatarFont bgColor="android" fgColor="white" className="mr-1">
                <i className="fa fa-android" />
              </AvatarFont>
              <AvatarFont bgColor="spotify" fgColor="white" className="mr-1">
                <i className="fa fa-spotify" />
              </AvatarFont>
              <AvatarFont bgColor="paypal" fgColor="white" className="mr-1">
                <i className="fa fa-paypal" />
              </AvatarFont>
              <AvatarFont bgColor="dribbble" fgColor="white" className="mr-1">
                <i className="fa fa-dribbble" />
              </AvatarFont>
              <AvatarFont bgColor="youtube" fgColor="white" className="mr-1">
                <i className="fa fa-youtube" />
              </AvatarFont>
              <AvatarFont bgColor="windows" fgColor="white" className="mr-1">
                <i className="fa fa-windows" />
              </AvatarFont>
              <AvatarFont bgColor="amazon" fgColor="white" className="mr-1">
                <i className="fa fa-amazon" />
              </AvatarFont>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* END Section 7 */}
    </Container>
  </React.Fragment>
);
