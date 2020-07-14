import React from "react";
import { FlatList, View, Text } from "react-native";
import { useTheme } from "react-navigation";
import CachedImage from "../components/CachedImage";
import DbHelper from "../services/DbHelper";
import Utility from "../common/Utility";
import { styles } from "../constants/styles/GoodList";

function GoodList(props: any) {
  const theme = useTheme();
  const withStyle = styles('dark' === theme);
  let {innerRef, dataSource, customNodesForTheItem} = props;
  let now = Utility.todayMidnigth().getTime();
  return (
    <FlatList ref={innerRef}
      data={dataSource.filter((item: {expiry: Date}) => (now <= item.expiry.getTime()))}
      keyExtractor={(item, index) => (item.id ? item.id : index).toString()}
      renderItem={({item}) => (
        <View style={withStyle.parent}>
          <View style={withStyle.leftChild}>
            <CachedImage
              source={{ uri: item.image }}
              style={withStyle.leftChildImage}
              onDownloaded={(uri: string) => DbHelper.newImage(uri, true)}
            />
          </View>
          <View
            style={withStyle.rightChild}
          >
            <View style={withStyle.grandChildHeader}>
              <Text style={withStyle.grandChildHeaderText}>
                {item.name.toUpperCase()}
              </Text>
            </View>
            <View style={withStyle.grandChildBody}>
              <Text style={withStyle.grandChildBodyText}>
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

export default React.forwardRef((props, ref) => <GoodList innerRef={ref} {...props}/>);
