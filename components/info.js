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
      <ScrollView contentContainerStyle={styles.container}>
        <ScrollView>
          <Text style={{ color: "white" }}>{item.name}</Text>
          <Image
            style={{
              width: 400,
              height: 200,
              marginTop: 10
            }}
            source={item.image}
          />
          <Text style={{ color: "white" }}>{item.detail}</Text>
        </ScrollView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "black",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column"
  }
});
