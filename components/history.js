import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default class History extends React.Component {
	render() {
		return (
			
				<ScrollView contentContainerStyle={styles.container}>
					<Text>Hello Worlhgtyd!</Text>
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
