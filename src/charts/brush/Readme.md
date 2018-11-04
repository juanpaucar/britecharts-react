### With default properties
```js
    const chartData = require('./Chart.fixtures.js').default;
    
    <Brush
        data={chartData.firstDataMethod()}
        shouldShowLoadingState={true}
    />
```

### With loading state
```js

    <Brush
        data={null}
        shouldShowLoadingState={true}
    />
```


See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: YourLinkToComponentAPIHere
[DataLink]: YourLinkToExampleDataInputHere