import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Brush from './Brush';
import brushData from './brushChart.fixtures';

import brush from './brushChart';

Enzyme.configure({ adapter: new Adapter() });

describe('Brush Chart', () => {

    describe('render', () => {
        
        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(brush, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method or the chart', () => {
                const dataSet = brushData.firstDataMethod();

                mount(<Brush chart={brush} data={dataSet} />);

                let expected = 1;
                let actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the container as the first argument', () => {
                const dataSet = brushData.firstDataMethod();

                const wrapper = mount(<Brush chart={brush} data={dataSet} />);

                let expected = wrapper.find('.brush-container').instance();
                let actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the configuration object as the second argument', () => {
                const dataSet = brushData.firstDataMethod();

                mount(<Brush chart={brush} data={dataSet} />);

                let expectedData = dataSet;
                let actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = brushData.firstDataMethod();
                let expected = 500;

                mount(
                    <Brush
                        chart={brush}
                        data={dataSet}
                        width={expected}
                    />
                );

                let actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = brushData.firstDataMethod();
                let expected = 500;

                mount(
                    <Brush
                        chart={brush}
                        data={dataSet}
                        height={expected}
                    />
                );

                let actual = createSpy.mock.calls[0][2].height;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {

        describe('when data changes', () => {
            let updateSpy;

            beforeEach(() => {
                updateSpy = jest.spyOn(brush, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method or the chart', () => {
                const dataSet = brushData.firstDataMethod();
                const wrapper = mount(<Brush chart={brush} data={dataSet} />);

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: brushData.secondDataMethod(),
                });

                let expected = 1;
                let actual = updateSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new data to the update method', () => {
                const dataSet = brushData.firstDataMethod();
                const wrapper = mount(<Brush chart={brush} data={dataSet} />);

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: brushData.secondDataMethod(),
                });

                let expected = brushData.secondDataMethod().length;
                let actual = updateSpy.mock.calls[0][1].length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const dataSet = brushData.firstDataMethod();
                const wrapper = mount(<Brush chart={brush} data={dataSet} />);
                const expected = 20;

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    width: expected,
                });

                let actual = updateSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('unmount', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(brush, 'destroy');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const dataSet = brushData.firstDataMethod();
            const wrapper = mount(<Brush chart={brush} data={dataSet} />);

            wrapper.unmount();

            let expected = 1;
            let actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });
});

