import React from "react";
import { StyleSheet, View, Dimensions, Button } from "react-native";
import MapView from 'react-native-maps';

class MapScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: <Button onPress={()=>navigation.goBack(this.location)} title="< Ok" />
      });

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 47.49801,
                longitude: 19.03991
            }
        };
    }

    location = undefined;

    onDragEnd(e) {
        this.location = e.nativeEvent.coordinate;
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                  style={styles.mapStyle}
                  showsUserLocation={true}>
                    <MapView.Marker
                      coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                      title={"Picked Location"}
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
