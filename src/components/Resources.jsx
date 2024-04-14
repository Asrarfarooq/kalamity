import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Resources = () => {
  return (
    <div className="resources-page">
      <h1>Resources</h1>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Earthquakes
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ul>
                <li>
                  <a
                    href="https://www.ready.gov/earthquakes"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Ready.gov Earthquakes
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.fema.gov/earthquake-safety-home"
                    target="_blank"
                    rel="noreferrer"
                  >
                    FEMA Earthquake Safety at Home
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.usgs.gov/natural-hazards/earthquake-hazards"
                    target="_blank"
                    rel="noreferrer"
                  >
                    USGS Earthquake Hazards Program
                  </a>
                </li>
              </ul>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        {/* Add more accordion items for other disaster types */}
      </Accordion>
    </div>
  );
};

export default Resources;
