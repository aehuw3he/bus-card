import React, { Component } from "react";
import "./App.css";
import BusList from "./component/BusList/BusList";

let isSearching = false;
let reserveBusData = [];
let filterText = "";
let filterBusObj = {};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 5,
      busData: [],
      url:
        // "https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/Taichung/51?$filter=SubRouteUID%20eq%20'TXG51'&$format=JSON"
        "./51.json"
    };
  }
  countDown() {
    this.setState({
      seconds: this.state.seconds - 1
    });
  }
  async getBusDetail() {
    fetch(this.state.url)
      .then(function(response) {
        return response.json();
      })
      .then(
        function(myJson) {
          // console.log(myJson);
          filterBusObj = myJson.filter(obj =>
            obj.StopName.Zh_tw.includes(filterText)
          );
          this.setState({
            busData: filterBusObj
          });
          // console.log(myJson);
        }.bind(this)
      );
  }
  // component被mount在畫面上後執行
  componentDidMount() {
    setInterval(() => {
      if (this.state.seconds === 0) {
        this.setState({
          seconds: 6
        });
        this.getBusDetail();
      }
      this.countDown();
    }, 1000);
    this.getBusDetail();
  }
  // upudate之後才執行
  componentDidUpdate() {
    // console.log(this.state.busData);
  }
  handleSearchText = e => {
    filterText = e.target.value;
    if (!isSearching) {
      isSearching = true;
      reserveBusData = [...this.state.busData];
    }
    if (isSearching && filterText === "") {
      isSearching = false;
      this.setState({
        busData: reserveBusData
      });
    } else {
      filterBusObj = reserveBusData.filter(obj =>
        obj.StopName.Zh_tw.includes(filterText)
      );
      this.setState({
        busData: filterBusObj
      });
    }
  };

  render() {
    return (
      <BusList
        busData={this.state.busData}
        seconds={this.state.seconds}
        handleSearchText={this.handleSearchText}
      />
    );
  }
}
