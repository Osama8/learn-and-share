import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default class Search extends React.Component {
	render() {
		return (
			
				<ScrollView contentContainerStyle={styles.container}>
					<Text> World!</Text>
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
