import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList
} from "react-native";
export default class Info extends React.Component {
	render(){
		const item=this.props.navigation.state.params;
		console.log(item);
		return(
      <View style={styles.container}>
        <FlatList
        keyExtractor={(item,index) => item.name}
          data={students}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}
            onPress={() => this.handlePress(item)}
            >
            <Image source={item.image} style={styles.img}/>
            <Text style={{fontSize:30,fontWeight:'bold'}}>{item.name}</Text>

          </TouchableOpacity>
          )}
        />
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
  },
});
const students=[

{name:'Nesma',
image:require("../assets/nesma.jpg"),
}
]
