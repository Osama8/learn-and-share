import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	StatusBar,
	Dimensions,
	FlatList
} from "react-native";

import * as firebase from "firebase";

export default class Home extends React.Component {
	handlePress = item => {
		this.props.navigation.navigate("Detail", {
			name: item.name,
			image: item.image
		});
	};

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (!user) {
				this.props.navigation.navigate("Login");
			}
		});
	}
	render() {
		const dimensions = Dimensions.get("window");

		const imagewidth = dimensions.width;
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.topBar}>
					<TouchableOpacity style={styles.button}>
						<Text>Alll</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text>Programming</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text>Administration</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text>Accounting</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text>Designing</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					keyExtractor={(item, index) => item.name}
					data={courses}
					style={styles.flat}
					renderItem={({ item }) => {
						return (
							<View>
								<Image
									style={{ width: imagewidth }}
									source={item.image}
								/>
								<Text
									style={{ fontSize: 30, fontWeight: "bold" }}
								>
									{item.name}
								</Text>
							</View>
						);
					}}
				/>
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		backgroundColor: "#fff",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexDirection: "column"
	},
	topBar: {
		alignItems: "flex-start",
		justifyContent: "space-between",
		flexDirection: "row"
	},
	button: {
		backgroundColor: "#00FFFF",
		padding: 10,
		borderColor: "black",
		borderWidth: 2
	},
	flat: {
		flex: 1,
		marginTop: 20,

		flexDirection: "column",
		backgroundColor: "#7FA3F6"
	}
});

const courses = [
	{ name: "Nesma", image: require("../assets/nesma.jpg") },
	{ name: "Dina", image: require("../assets/dina.jpg") }
];
