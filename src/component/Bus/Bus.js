import React, { Component } from "react";
import "./Bus.scss";

export default class Bus extends Component {
  render() {
    const { busObj } = this.props;
    const {
      Direction,
      EstimateTime,
      NextBusTime,
      RouteName,
      StopName,
      StopSequence
    } = busObj;
    return (
      <div
        className={`card-container ${EstimateTime / 60 < 3 ? "active" : null}`}
      >
        <div className="bus-info">
          {/* <h1>{"公車路線: " + RouteName.Zh_tw}</h1> */}
          <h1>{"站名 : " + StopName.Zh_tw}</h1>
          <h1>{"預估到達 : " + EstimateTime / 60 + " 分鐘"}</h1>
          <h1>{"站牌順序 " + StopSequence}</h1>
        </div>
      </div>
    );
  }
}
