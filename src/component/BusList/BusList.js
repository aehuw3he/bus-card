import React, { Component } from "react";
import Bus from "../Bus/Bus";
import "./BusList.scss";
import LogoPTX from "./logo.png";
export default class BusList extends Component {
  render() {
    const { busData, seconds, handleSearchText, getBusDetail } = this.props;
    // 取出公車路線名稱
    // console.log(busData)
    // const JSON_string = busData[0];
    // const a =JSON.stringify(JSON_string)
    // console.log(a);
    // const b = {"PlateNumb":"729-U8","StopUID":"TXG10564","StopID":"10564","StopName":{"Zh_tw":"逢甲橋","En":"Fengjia Bridge"},"RouteUID":"TXG51","RouteID":"51","RouteName":{"Zh_tw":"51","En":"51"},"SubRouteUID":"TXG51","SubRouteID":"51","SubRouteName":{"Zh_tw":"51","En":"51"},"Direction":0,"EstimateTime":540,"StopSequence":60,"StopStatus":0,"MessageType":0,"NextBusTime":"2019-11-06T11:24:00+08:00","Estimates":[{"PlateNumb":"729-U8","EstimateTime":540,"IsLastBus":false},{"PlateNumb":"756-U8","EstimateTime":1680,"IsLastBus":false},{"PlateNumb":"739-U8","EstimateTime":2640,"IsLastBus":false}],"SrcUpdateTime":"2019-11-06T10:17:58+08:00","UpdateTime":"2019-11-06T10:18:25+08:00"}
    // const obj3 = JSON.parse(b)
    // var obj2 = JSON.parse(JSON.stringify(busData));
    // console.log(obj2[0]);

    // console.log(busDataObj)
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
          <div className="logo-copyright">
            <h1>
              資料介接「交通部PTX平臺」&平臺標章{" "}
              <a href={LogoPTX}>【Logo下載】</a>
            </h1>
            <img src={LogoPTX} alt="" height="50" />
          </div>
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
                onClick={getBusDetail}
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
