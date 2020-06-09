import React from "react";
import { StyleSheet, View, Dimensions, } from "react-native";
import MapView from 'react-native-maps';
import { i18n } from "../constants/Dictionary";
import { HeaderBackButton } from "react-navigation";

class MapScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: <HeaderBackButton backTitleVisible={true} onPress={()=>this.goBack(navigation)} title={i18n.okay} />
      });

    constructor(props) {
        super(props);
        this.state = {
            region: MapScreen.location
        };
    }

    static goBack(nav) {
        nav.navigate('Main', {"latitude": MapScreen.location.latitude, "longitude": MapScreen.location.longitude});
    }

    static location = {
        latitude: 47.49801,
        longitude: 19.03991
    };

    onDragEnd(e) {
        MapScreen.location = e.nativeEvent.coordinate;
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                  style={styles.mapStyle}
                  showsUserLocation={true}>
                    <MapView.Marker
                      coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                      title={i18n.pickedLocation.toCamelCase()}
                      onDragEnd={this.onDragEnd}
                      draggable />
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default MapScreen;
