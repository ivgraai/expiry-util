import React from "react";
import { FlatList, View, Text } from "react-native";
import CachedImage from "../components/CachedImage";

class GoodList extends React.PureComponent {
    render() {
        return (
          <FlatList ref={this.props.innerRef}
            data={this.props.dataSource}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={{ flexDirection: "row", height: this.props.height }}>
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
                </View>
              </View>
            )}
          />
        );
    }
}

export default React.forwardRef((props, ref) => <GoodList innerRef={ref} {...props}/>);
