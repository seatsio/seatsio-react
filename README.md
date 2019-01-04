# seatsio-react

React wrapper around the seats.io seating charts.

# Installation

```
npm install --save @seatsio/seatsio-react
```

# Usage

Minimal:

```jsx
<SeatsioSeatingChart
    publicKey="<yourPublicKey>"
    event="<yourEventKey>"
>
```

`onChartCreated` is fired when the chart has started loading, but hasn't rendered yet:

```jsx
<SeatsioSeatingChart
    publicKey="<yourPublicKey>"
    event="<yourEventKey>"
    onChartCreated={chart => { ... }}
>
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