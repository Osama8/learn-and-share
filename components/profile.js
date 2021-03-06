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
		modalVisible: false,
		modalVisible2: false,
		profPic: "",
		userName: ""
	};
	handelSettingPress = () => {
		this.setState({ modalVisible: true });
	};
	handelDone = () => {
		this.setState({ modalVisible: false });
	};
	handelcontPress = () => {
		this.setState({ modalVisible2: true });
	};
	handelone = () => {
		this.setState({ modalVisible2: false });
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

	componentDidMount() {
		const user = firebase.auth().currentUser;
		this.setState({
			profPic: user.photoURL,
			userName: user.displayName
		});
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Image
					style={styles.circle}
					source={{ uri: this.state.profPic }}
				/>
				<Text>{this.state.userName}</Text>

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
						<TouchableOpacity style={styles.button}>
							<Text>About us</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
							<Text>Notifications</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
							<Text>Report a problem</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.button}>
							<Text>Favorite</Text>
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
						this.handelcontPress();
					}}
					style={styles.button}
				>
					<Text>Contact </Text>
				</TouchableOpacity>
				<Modal animationType="slide" visible={this.state.modalVisible2}>
					<View style={styles.container}>
						<TouchableOpacity
							style={styles.button}
							onPress={() => {
								this.handelone();
							}}
						>
							<Text> Done !</Text>
						</TouchableOpacity>
					</View>
				</Modal>
				<TouchableOpacity
					onPress={() => {
						this.logout();
					}}
					style={styles.button}
				>
					<Text>log out</Text>
				</TouchableOpacity>
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
		borderColor: "blue",
		borderWidth: 2,
		padding: 30,
		paddingRight: 30
	},
	circle: {
		width: 100,
		height: 100,
		backgroundColor: "red",
		borderRadius: 50
	}
});
