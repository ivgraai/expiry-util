import React from "react";
import { ListView, Text, View, Image, PixelRatio } from "react-native";
import DbHelper from "../DbHelper";

export default class AllScreen extends React.Component {
  static navigationOptions = {
    title: "All"
  };
  height = PixelRatio.getPixelSizeForLayoutSize(75);

  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    DbHelper.selectGoods().then(result => {
      this.setState({
        dataSource: this.state.ds.cloneWithRows(result._array)
      });
    });
    this.state = {
      ds: ds,
      dataSource: ds.cloneWithRows([
        {
          expiry: "2019-07-01T00:00:00.000Z",
          id: 1,
          image:
            "file:///var/mobile/Containers/Data/Application/48872CFA-5B74-4E97-8518-931C31599958/Library/Caches/ExponentExperienceData/%2540ivgraai%252Fexpiry-util/ImagePicker/17712052-855A-459D-8820-5A84E9F52690.jpg",
          name: "dummy"
        }
      ])
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={rowData => (
          <View style={{ flexDirection: "row", height: this.height }}>
            <View style={{ flex: 3, alignItems: "center" }}>
              <Image
                source={{ uri: rowData.image }}
                style={{ height: "90%", width: "90%", aspectRatio: 1 }}
              />
            </View>
            <View
              style={{
                flex: 2,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <Text style={{ textAlign: "center" }}>{rowData.name.toUpperCase()}</Text>
              <Text style={{ textAlign: "center" }}>
                {new Date(rowData.expiry).toLocaleDateString()}
              </Text>
            </View>
          </View>
        )}
      />
    );
  }
}
