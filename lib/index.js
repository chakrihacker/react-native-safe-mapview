import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export default class SafeMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false
    };
    this._isMapRefAvailable = false;
  }

  isEqual = (a, b) => {
    // check both inputs are objects or not
    if (
      a !== null &&
      typeof a === "object" &&
      b !== null &&
      typeof b === "object"
    ) {
      // Create arrays of property names
      let aProps = Object.getOwnPropertyNames(a);
      let bProps = Object.getOwnPropertyNames(b);

      // If number of properties is different,
      // objects are not equivalent
      if (aProps.length != bProps.length) {
        return false;
      }

      for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
          return false;
        }
      }

      // If we made it this far, objects
      // are considered equivalent
      return true;
    }
    return false;
  };

  // Methods
  animateToNavigation = (...args) =>
    this._isMapRefAvailable && this.mapRef.animateToNavigation(...args);
  animateToCoordinate = (...args) =>
    this._isMapRefAvailable && this.mapRef.animateToCoordinate(...args);
  animateToBearing = (...args) =>
    this._isMapRefAvailable && this.mapRef.animateToBearing(...args);
  animateToViewingAngle = (...args) =>
    this._isMapRefAvailable && this.mapRef.animateToViewingAngle(...args);
  setMapBoundaries = (...args) =>
    this._isMapRefAvailable && this.mapRef.setMapBoundaries(...args);
  fitToElements = (...args) =>
    this._isMapRefAvailable && this.mapRef.fitToElements(...args);
  fitToSuppliedMarkers = (...args) =>
    this._isMapRefAvailable && this.mapRef.fitToSuppliedMarkers(...args);
  fitToCoordinates = (...args) =>
    this._isMapRefAvailable && this.mapRef.fitToCoordinates(...args);
  pointForCoordinate = (...args) =>
    this._isMapRefAvailable && this.mapRef.pointForCoordinate(...args);
  coordinateForPoint = (...args) =>
    this._isMapRefAvailable && this.mapRef.coordinateForPoint(...args);

  animateToRegion = (region, duration) =>
    this.mapRef.animateToRegion(region, duration);

  shouldComponentUpdate = (nextProps, nextState) => {
    console.log(nextProps.region, this.props.region, "shouldcomponentupdate");
    if (!this.isEqual(nextProps.region, this.props.region)) {
      nextProps.region && this.mapRef.animateToRegion(nextProps.region, 500);
      return false;
    }
    if (this.isEqual(nextProps.region, this.props.region)) {
      return false;
    }
    return true;
  };

  _onLayout = () => {
    this.setState({ isMapReady: true });
    this._isMapRefAvailable = true;
    this.props.onLayout && this.props.onLayout();
  };

  render() {
    const { style, initialRegion, ...otherProps } = this.props;
    if (initialRegion !== null && typeof initialRegion === "object") {
      this._isMapRefAvailable = true;
      return (
        <MapView
          style={
            style !== null && typeof style === "object"
              ? style
              : StyleSheet.absoluteFill
          }
          initialRegion={initialRegion}
          ref={ref => {
            this.mapRef = ref;
          }}
          onLayout={this._onLayout}
          {...otherProps}
        >
          {this.state.isMapReady && this.props.children}
        </MapView>
      );
    }
    this._isMapRefAvailable = false;
    return (
      <View
        style={
          style !== null && typeof style === "object"
            ? style
            : { backgroundColor: "#000" }
        }
      />
    );
  }
}
