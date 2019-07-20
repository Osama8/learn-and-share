import React from "react";
import {
	Text,
	View,
	ScrollView,
	Image,
	StyleSheet,
	TouchableOpacity,
	StatusBar,
	FlatList,
	Modal
} from "react-native";
import * as firebase from "firebase";

export default class Profile extends React.Component {
	state = {
		modalVisible: false
	};
	handelSettingPress = () => {
		this.setState({ modalVisible: true });
	};
	handelDone = () => {
		this.setState({ modalVisible: false });
	};
	logout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				alert("You logged out");
				this.props.navigation.navigate("Login");
			})
			.catch(function(error) {
				console.log(error);
				// An error happened.
			});
	};

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Image source={require("../assets/dina.jpg")} />
				<Text>username</Text>
				<TouchableOpacity
					onPress={() => {
						this.handelSettingPress();
					}}
					style={styles.button}
				>
					<Text>Settings</Text>
				</TouchableOpacity>
				<Modal animationType="slide" visible={this.state.modalVisible}>
					<View style={styles.container}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								this.handelDone();
							}}
						>
							<Text> Done !</Text>
						</TouchableOpacity>
					</View>
				</Modal>
				<TouchableOpacity
					onPress={() => {
						this.handelSettingPress();
					}}
					style={styles.button}
				>
					<Text>Contact us</Text>
				</TouchableOpacity>
				<Modal animationType="slide" visible={this.state.modalVisible}>
					<View style={styles.container}>
						<TouchableOpacity style={styles.button}>
							<Text>About us</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								this.handelDone();
							}}
						>
							<Text> Done !</Text>
						</TouchableOpacity>
					</View>
				</Modal>
				<TouchableOpacity
					onPress={() => {
						this.handelSettingPress();
					}}
					style={styles.button}
					onPress={this.logout}
				>
					<Text>log out</Text>
				</TouchableOpacity>
				<Modal animationType="slide" visible={this.state.modalVisible}>
					<View style={styles.container}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								this.handelDone();
							}}
						>
							<Text> Done !</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#7FA3F6",
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		backgroundColor: "#F67FE6",
		padding: 10,
		borderColor: "blue",
		borderWidth: 2
	}
});
