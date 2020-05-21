import React from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  PixelRatio
} from "react-native";
import { NavigationEvents } from "react-navigation";
import DbHelper from "../DbHelper";
import { i18n } from "../constants/Dictionary";

export default class AllScreen extends React.Component {
  static navigationOptions = {
    title: i18n.all
  };
  height = PixelRatio.getPixelSizeForLayoutSize(75);

  constructor() {
    super();
    this.state = {
      dataSource: [
        {
          expiry: new Date("1970-01-01T00:00:00.000Z"),
          id: 1,
          image:
            "file:///var/mobile/Containers/Data/Application/48872CFA-5B74-4E97-8518-931C31599958/Library/Caches/ExponentExperienceData/%2540ivgraai%252Fexpiry-util/ImagePicker/17712052-855A-459D-8820-5A84E9F52690.jpg",
          name: "dummy"
        }
      ]
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <NavigationEvents
          onWillFocus={payload => {
            DbHelper.selectGoods().then(result => {
              this.setState({
                dataSource:
                  result._array
                    .map(a => {
                      return { ...a, expiry: new Date(a.expiry) };
                    })
                    .sort((a, b) => a.expiry.getTime() - b.expiry.getTime())
              });
            });
            this.refs._scrollView.scrollToOffset({ offset: 0 }); // Should be in the callback.
          }}
        />
          <FlatList ref="_scrollView"
            data={this.state.dataSource}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={{ flexDirection: "row", height: this.height }}>
                <View style={{ flex: 2, alignItems: "center" }}>
                  <Image
                    source={{ uri: item.image }}
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
                  <Text style={{ textAlign: "center" }}>
                    {item.name.toUpperCase()}
                  </Text>
                  <Text style={{ textAlign: "center" }}>
                    {item.expiry.toLocaleDateString()}
                  </Text>
                </View>
              </View>
            )}
          />
      </View>
    );
  }
}
