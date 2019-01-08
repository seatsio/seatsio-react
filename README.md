# seatsio-react, the official Seats.io React wrapper

React wrapper for rendering [Seats.io](https://www.seats.io) seating charts. Brought to you by the Seats.io team.

# Installation

```
npm install --save @seatsio/seatsio-react
```

# Usage

## Regular charts

Minimal:

```jsx
<SeatsioSeatingChart
    publicKey="<yourPublicKey>"
    event="<yourEventKey>"
>
```

Custom chart div ID:

```jsx
<SeatsioSeatingChart
    publicKey="<yourPublicKey>"
    event="<yourEventKey>"
    id="<theChartDivID>"
>
```

Custom chart div class:

```jsx
<SeatsioSeatingChart
    publicKey="<yourPublicKey>"
    event="<yourEventKey>"
    className="<theChartDivClassName>"
>
```

`onRenderStarted` is fired when the chart has started loading, but hasn't rendered yet:

```jsx
<SeatsioSeatingChart
    publicKey="<yourPublicKey>"
    event="<yourEventKey>"
    onRenderStarted={chart => { ... }}
>
```

If you store the chart object that's passed to `onRenderStarted`, you can access the properties defined on the  wrapped `seatsio.SeatingChart`:

```jsx
let chart = null;

<SeatsioSeatingChart
    publicKey="<yourPublicKey>"
    event="<yourEventKey>"
    onRenderStarted={createdChart => { chart = createdChart }}
>

...

console.log(chart.selectedObjects);
```

`onChartRendered` is fired when the chart is rendered successfully:

```jsx
<SeatsioSeatingChart
    publicKey="<yourPublicKey>"
    event="<yourEventKey>"
    onChartRendered={chart => { ... }}
>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/renderer-configure-your-floor-plan

```jsx
<SeatsioSeatingChart
    publicKey="<yourPublicKey>"
    event="<yourEventKey>"
    pricing={[
        {'category': 1, 'price': 30},
        {'category': 2, 'price': 40},
        {'category': 3, 'price': 50}
    ]}
    priceFormatter={price => '$' + price}
>
```

## Event manager

```jsx
<SeatsioEventManager
    secretKey="<yourSecretKey>"
    event="<yourEventKey>"
    mode="<manageObjectStatus or another mode>"
>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/configuring-event-manager



## Seating Chart Designer

To embed the seating chart designer for the purpose of creating a new chart, do this:

```jsx
<SeatsioDesigner
    designerKey="<yourDesignerKey>"    
>
```

To be able to edit a chart from an embedded designer, you need to specify the chart to load:
 
```jsx
<SeatsioDesigner
    designerKey="<yourDesignerKey>"
    chartKey="<yourChartKey>"    
>
```
    

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/embedded-designer-configuration
