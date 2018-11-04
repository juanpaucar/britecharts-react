import brushChart from 'britecharts/dist/umd/brush.min';
import {select} from 'd3-selection';
import {validateConfiguration, validateContainer} from '../helpers/validation';
import {applyConfiguration} from '../helpers/configuration';

//TODO: Implement the correct loading state(line, bar, and donut are the available options atm)
import { line as brushLoadingState } from 'britecharts/dist/umd/loading.min';

const brush = {};

brush.create = (el, data, configuration = {}) => {
    let container = select(el);
    let chart = brushChart();

    validateContainer(container);
    validateConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum(data).call(applyConfiguration(chart, configuration));

    return chart;
};

brush.update = (el, data, configuration = {}, chart) => {
    let container = select(el);

    validateContainer(container);
    validateConfiguration(chart, configuration);
    applyConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    if (data && data.length) {
        container.datum(data).call(chart);
    } else {
        container.call(chart);
    }

    return chart;
};

brush.destroy = () => {};

brush.loading = () => brushLoadingState;

export default brush;
