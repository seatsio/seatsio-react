import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import SeatsioSeatingChart from "../main/SeatsioSeatingChart";

Enzyme.configure({adapter: new Adapter()});

describe("SeatsioSeatingChart", () => {

    let seatsioMock = {

        SeatingChart: class {

            constructor(props) {
                this.props = props;
            }

            render() {
                return this;
            }
        }
    };

    SeatsioSeatingChart.prototype.loadSeatsio = () => {
        return Promise.resolve(seatsioMock);
    };

    it('renders the chart in a div with default ID "chart"', () => {
        let chart = mount((
            <SeatsioSeatingChart/>
        ));

        expect(chart.find('div#chart').length).toEqual(1);
    });

    it('renders the chart in a div with the specified ID', () => {
        let chart = mount((
            <SeatsioSeatingChart id="mySuperDuperChart"/>
        ));

        expect(chart.find('div#mySuperDuperChart').length).toEqual(1);
    });

    it('adds the specified class', () => {
        let chart = mount((
            <SeatsioSeatingChart className="charty"/>
        ));

        expect(chart.find('div.charty').length).toEqual(1);
    });

    it('passes parameters onto the chart', () => {
        return new Promise(resolve => {
            mount((
                <SeatsioSeatingChart
                    id="someID"
                    className="someClassName"
                    publicKey="aPublicKey"
                    onChartCreated={chart => {
                        expect(chart.props).toEqual({
                            divId: 'someID',
                            publicKey: 'aPublicKey'
                        });
                        resolve();
                    }}/>
            ));
        });
    });

    it('destroys itself after unmounting', () => {
        let mockedDestroy = jest.fn();
        seatsioMock.SeatingChart.prototype.destroy = mockedDestroy;

        return new Promise(resolve => {
            let chart = mount((
                <SeatsioSeatingChart
                    onChartCreated={() => {
                        chart.unmount();

                        expect(mockedDestroy.mock.calls.length).toEqual(1);
                        resolve();
                    }}
                />
            ));
        });
    });

    it('does not destroy itself after unmounting if already destroyed', () => {
        let mockedDestroy = jest.fn();
        seatsioMock.SeatingChart.prototype.destroy = mockedDestroy;

        return new Promise(resolve => {
            let chartComponent = mount((
                <SeatsioSeatingChart
                    onChartCreated={chart => {
                        chart.state = 'DESTROYED';
                        chartComponent.unmount();

                        expect(mockedDestroy.mock.calls.length).toEqual(0);
                        resolve();
                    }}
                />
            ));
        });
    });
});