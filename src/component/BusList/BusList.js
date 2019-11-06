import React, { Component } from "react";
import Bus from "../Bus/Bus";
import "./BusList.scss";
export default class BusList extends Component {
  render() {
    const { busData, seconds,handleSearchText } = this.props;
    // 取出公車路線名稱
    const busDataIndexOfOne = Object.assign({}, busData[0]);
    const RouteNameIndexOfOne = Object.assign({}, busDataIndexOfOne.RouteName);
    // console.log(RouteNameIndexOfOne.Zh_tw);
    // 把去程的公車過濾出來，並進行排序
    const outboundBus = busData.filter(bus => bus.Direction !== 1);
    outboundBus.sort((a, b) => (a.StopSequence > b.StopSequence ? 1 : -1));

    // 把返程的公車過濾出來，並進行排序
    const inboundBus = busData.filter(bus => bus.Direction !== 0);
    inboundBus.sort((a, b) => (a.StopSequence > b.StopSequence ? 1 : -1));
    // console.log(inboundBus);
    // console.log(outboundBus)
    return (
      <>
        <form className="nav-container">
          <h1 className="font-titile">
            公車路線: {RouteNameIndexOfOne.Zh_tw}{" "}
          </h1>

          <div className="interact-box">
            <input
              className="stopname"
              type="text"
              placeholder="請輸入站牌名稱進行過濾"
              onChange={handleSearchText}
            />
            <div className="time-update">
              <h1>{seconds}秒後更新</h1>
              <input
                style={{ marginLeft: 20 }}
                type="button"
                value="立刻更新"
              />
            </div>
            <div className="annotation">
              <div className="notice"></div>
              <h3 className="font-notice">紅色代表公車即將抵達</h3>
            </div>
          </div>
        </form>
        <h1 className="font-go-back">去程</h1>
        <section className="bus-outbound">
          {outboundBus.map((busObj, index) => {
            return <Bus key={index} busObj={busObj} />;
          })}
        </section>
        <h1 className="font-go-back">回程</h1>
        <section className="bus-inbound">
          {inboundBus.map((busObj, index) => {
            return <Bus key={index} busObj={busObj} />;
          })}
        </section>
      </>
    );
  }
}
