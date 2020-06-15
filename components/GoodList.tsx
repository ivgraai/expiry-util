import React from "react";
import { FlatList, View, Text } from "react-native";
import CachedImage from "../components/CachedImage";
import DbHelper from "../DbHelper";
import { styles } from "../constants/styles/GoodList";

class GoodList extends React.PureComponent {
    render() {
        let {innerRef, dataSource, height, customNodesForTheItem} = this.props;
        return (
          <FlatList ref={innerRef}
            data={dataSource}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.parent}>
                <View style={styles.leftChild}>
                  <CachedImage
                    source={{ uri: item.image }}
                    style={styles.leftChildImage}
                    onDownloaded={(uri: string) => DbHelper.newImage(uri, true)}
                  />
                </View>
                <View
                  style={styles.rightChild}
                >
                  <View style={styles.grandChildHeader}>
                    <Text style={styles.grandChildHeaderText}>
                      {item.name.toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.grandChildBody}>
                    <Text style={styles.grandChildBodyText}>
                      {item.expiry.toLocaleDateString()}
                    </Text>
                    { customNodesForTheItem ?
                      customNodesForTheItem(item) : null }
                  </View>
                </View>
              </View>
            )}
          />
        );
    }
}

export default React.forwardRef((props, ref) => <GoodList innerRef={ref} {...props}/>);
