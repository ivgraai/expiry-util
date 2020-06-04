import React from "react";
import { FlatList, View, Text, PixelRatio } from "react-native";
import CachedImage from "../components/CachedImage";

class GoodList extends React.PureComponent {
    render() {
        let {innerRef, dataSource, height, customNodesForTheItem} = this.props;
        return (
          <FlatList ref={innerRef}
            data={dataSource}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={{ flexDirection: "row", height: PixelRatio.getPixelSizeForLayoutSize(height ?? 75) }}>
                <View style={{ flex: 2, alignItems: "center" }}>
                  <CachedImage
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
                  { customNodesForTheItem ?
                    customNodesForTheItem(item) : null }
                </View>
              </View>
            )}
          />
        );
    }
}

export default React.forwardRef((props, ref) => <GoodList innerRef={ref} {...props}/>);
