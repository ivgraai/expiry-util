import React from "react";
import { View } from "react-native";
import MapView, { Marker, MapEvent } from "react-native-maps";
import { HeaderBackButton, NavigationScreenProp, NavigationRoute } from "react-navigation";
import Utility from "../common/Utility";
import { i18n } from "../constants/Dictionary";
import Colors from "../constants/Colors";
import { styles } from "../constants/styles/MapScreen";

class MapScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft: <HeaderBackButton backTitleVisible={true} onPress={()=>MapScreen.goBack(navigation)} title={i18n.okay} tintColor={Colors.header} />
      });

    constructor(props: {}) {
        super(props);
        this.state = { region: MapScreen.location };
        if (!MapScreen.location) {
            Utility.currentLocation().then(location => {
                this.setState({ region: location });
                MapScreen.location = location;
            });
        }
    }

    static goBack(nav: NavigationScreenProp<NavigationRoute>) {
        nav.navigate("Main", {"latitude": MapScreen.location.latitude, "longitude": MapScreen.location.longitude});
    }

    static location: any = undefined;

    onDragEnd(e: MapEvent) {
        MapScreen.location = e.nativeEvent.coordinate;
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                  style={styles.mapStyle}
                  showsUserLocation={false}>
                    {
                      !this.state.region ? null : <Marker
                        coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                        title={i18n.pickedLocation.toCamelCase()}
                        onDragEnd={this.onDragEnd}
                        draggable />
                    }
                </MapView>
            </View>
        );
    }
}

export default MapScreen;
