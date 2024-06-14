import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardItem from '../Card/Card';

function DynamicTabs({ characters, planets, transformations }) {
    console.log(planets)
    return (
        <Tabs defaultActiveKey="characters" id="dynamic-tabs">
            <Tab eventKey="characters" title="Personajes">
                <Row xs={1} md={2} lg={4} className="g-4 mt-5">
                    {characters?.map(character => (
                        <Col key={character?.id}>
                            <CardItem character={character} />
                        </Col>
                    ))}
                </Row>
            </Tab>
            <Tab eventKey="planets" title="Planetas">
                <Row xs={1} md={2} lg={4} className="g-4 mt-5">
                    {Array.isArray(planets) ? (
                        planets?.map(planet => (
                            <Col key={planet?.id}>
                                <CardItem character={planet} />
                            </Col>
                        ))
                    ):
                    <Col key={planets?.id}>
                            <CardItem character={planets} />
                        </Col>
                    }
                </Row>
            </Tab>
            <Tab eventKey="transformations" title="Transformaciones">
                <Row xs={1} md={2} lg={4} className="g-4 mt-5">
                    {Array.isArray(transformations) ? (
                        transformations.map(transformation => (
                            <Col key={transformation?.id}>
                                <CardItem character={transformation} />
                            </Col>
                        ))
                    ) :
                        <Col key={transformations?.id}>
                            <CardItem character={transformations} />
                        </Col>}
                </Row>
            </Tab>
        </Tabs>
    );
}

export default DynamicTabs;
