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

## Event manager

```jsx
<SeatsioEventManager
    secretKey="<yourSecretKey>"
    event="<yourEventKey>"
    mode="<manageObjectStatus or another mode>"
>
```

Other parameters are supported as well. For a full list, check https://docs.seats.io/docs/configuring-event-manager
