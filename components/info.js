import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList
} from "react-native";
export default class Info extends React.Component {
  render() {
    const item = this.props.navigation.state.params;
    console.log(item);
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text>{item.name}</Text>
          <Image source={item.image} />
          <Text>{item.detail}</Text>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  }
});
