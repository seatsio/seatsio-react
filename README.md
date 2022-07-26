# seatsio-react, the official Seats.io React wrapper

React wrapper for rendering [Seats.io](https://www.seats.io) seating charts. Brought to you by the Seats.io team.

# Installation

```
npm install --save @seatsio/seatsio-react
```

# Usage

## Regular charts

### Minimal

```jsx
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';

<div style={{ 'height': '500px' }}>
    <SeatsioSeatingChart
        workspaceKey="<yourPublicWorkspaceKey>"
        event="<yourEventKey>"
        region="eu"
    />
</div>
```

The chart uses 100% of the width and height of the DOM element (e.g. a div) in which you render it. Play with the size of that element to change the chart size.

### onRenderStarted()

`onRenderStarted` is fired when the chart has started loading, but hasn't rendered yet:

```jsx
<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    onRenderStarted={chart => { ... }}
    region="eu"
/>
```

If you store the chart object that's passed to `onRenderStarted`, you can access the properties defined on the  wrapped `seatsio.SeatingChart`:

```jsx
let chart = null;

<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    onRenderStarted={createdChart => { chart = createdChart }}
    region="eu"
/>

...

console.log(chart.selectedObjects);
```

### onChartRendered()

`onChartRendered` is fired when the chart is rendered successfully:

```jsx
<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    onChartRendered={chart => { ... }}
    region="eu"
/>
```

### Supported properties

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/renderer/embed-a-floor-plan

```jsx
<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    pricing={[
        {'category': 1, 'price': 30},
        {'category': 2, 'price': 40},
        {'category': 3, 'price': 50}
    ]}
    priceFormatter={price => '$' + price}
    region="eu"
/>
```

Whenever one of the properties passed on to `<SeatsioSeatingChart />` changes, the chart destroys itself and rerenders. To avoid such a 'full refresh', you can use `chart.changeConfig()` instead of updating the properties directly. Please check https://docs.seats.io/docs/renderer-chart-properties-chartchangeconfig. Note that `changeConfig()` only supports a subset of all available chart parameters.

## Event manager

```jsx
import { SeatsioEventManager } from '@seatsio/seatsio-react';

<div style={{ 'height': '500px' }}>
    <SeatsioEventManager
        secretKey="<yourWorkspaceSecretKey>"
        event="<yourEventKey>"
        mode="<manageObjectStatuses or another mode>"
        region="eu"
    />
</div>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/event-manager/configuring

## Chart manager

```jsx
import { SeatsioChartManager } from '@seatsio/seatsio-react';

<div style={{ 'height': '500px' }}>
    <SeatsioChartManager
        secretKey="<yourWorkspaceSecretKey>"
        chart="<yourChartKey>"
        mode="<manageRulesets or another mode>"
        region="eu"
    />
</div>
```

## Seating Chart Designer

To embed the seating chart designer for the purpose of creating a new chart, do this:

```jsx
import { SeatsioDesigner } from '@seatsio/seatsio-react';

<div style={{ 'height': '500px' }}>
    <SeatsioDesigner
        secretKey="<yourWorkspaceSecretKey>"
        region="eu"
    />
</div>
```

To be able to edit a chart from an embedded designer, you need to specify the chart to load:
 
```jsx
<SeatsioDesigner
    secretKey="<yourWorkspaceSecretKey>"    
    chartKey="<yourChartKey>"
    region="eu"
/>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/embedded-designer/introduction
