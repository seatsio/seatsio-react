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
import { SeatsioSeatingChart } from '@seatsio/seatsio-react'

<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    region="eu"
/>
```

### Setting the height of the chart

By default, `<SeatsioSeatingChart>` is as wide as its parent div, and as high as the drawing that's rendered.

To set an explicit height, use CSS on the div that gets created by `<SeatsioSeatingChart>`:

```css
#chart {
    height: 800px; // or height: 100%, or height: 100vh, depending on your requirements
}
```

### Custom chart div ID

```jsx
<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    id="<theChartDivID>"
    region="eu"
/>
```

### Custom chart div class

```jsx
<SeatsioSeatingChart
    workspaceKey="<yourPublicWorkspaceKey>"
    event="<yourEventKey>"
    className="<theChartDivClassName>"
    region="eu"
/>
```

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

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/renderer-configure-your-floor-plan

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
import { SeatsioEventManager } from '@seatsio/seatsio-react'

<SeatsioEventManager
    secretKey="<yourWorkspaceSecretKey>"
    event="<yourEventKey>"
    mode="<manageObjectStatuses or another mode>"
    region="eu"
/>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/configuring-event-manager

## Chart manager

```jsx
import { SeatsioChartManager } from '@seatsio/seatsio-react'

<SeatsioChartManager
    secretKey="<yourWorkspaceSecretKey>"
    chart="<yourChartKey>"
    mode="<manageRulesets or another mode>"
    region="eu"
/>
```

## Seating Chart Designer

To embed the seating chart designer for the purpose of creating a new chart, do this:

```jsx
import { SeatsioDesigner } from '@seatsio/seatsio-react'

<SeatsioDesigner
    secretKey="<yourWorkspaceSecretKey>"
    region="eu"
/>
```

To be able to edit a chart from an embedded designer, you need to specify the chart to load:
 
```jsx
<SeatsioDesigner
    secretKey="<yourWorkspaceSecretKey>"    
    chartKey="<yourChartKey>"
    region="eu"
/>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/embedded-designer-configuration

### Setting the height of the designer

By default, the chart designer gets rendered with a minimal height. To change that, use CSS on the div that gets created by `<SeatsioDesigner>`:

```css
#chart {
    height: 800px; // or height: 100%, or height: 100vh, depending on your requirements
}
```
