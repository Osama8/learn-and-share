import React from "react";
import { StyleSheet, Text, View, ScrollView,TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default class Profile extends React.Component {
	logout=()=>{
		firebase.auth().signOut().then(()=> {
	
			alert("You logged out");
			this.props.navigation.navigate("Login");

	}).catch(function(error) {
		console.log(error)
  // An error happened.
});
	}
	render() {
	
	
		return (
			
				<ScrollView contentContainerStyle={styles.container}>
					<Text>Hello !</Text>
					<TouchableOpacity onPress={this.logout}><Text>log out</Text></TouchableOpacity>
				</ScrollView>
			
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
