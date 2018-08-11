# react-native-safe-mapview

[![Greenkeeper badge](https://badges.greenkeeper.io/chakrihacker/react-native-safe-mapview.svg)](https://greenkeeper.io/)


React Native Map Component which catches errors and works smoothly

## Installation

`npm i -S react-native-safe-mapview`
or
`yarn add react-native-safe-mapview`

## Why

- Many devs use setState for region and it causes performance issue which is solved by this component
- It also catches errors so you can happily work about other stuff

## Usage

```jsx
<SafeMapView
  // ref for getting instance of mapview for advance actions
  ref={ref => {
    this.mapRef = ref;
  }}
  // set any initial region, it's required
  initialRegion={{
    latitude: 12.9748534,
    longitude: 77.627675,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }}
  // Set region whenever you want
  region={this.state.region}
/>
```
