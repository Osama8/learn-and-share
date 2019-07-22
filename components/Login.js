import React from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Image,
	StatusBar
} from "react-native";
import * as firebase from "firebase";

export default class Login extends React.Component {
	state = {
		email: "",
		password: ""
	};

	componentDidMount() {
		StatusBar.setHidden(true);
	}

	login = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				alert("Successfully logged in");
				this.props.navigation.navigate("Main");
			})
			.catch(error => {
				alert(error.message);
			});
	};
	render() {
		return (
			<View style={styles.container}>
				<Image
					style={{ width: 500, height: 250 }}
					source={require("../assets/logo.png")}
				/>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="enter ur email"
						style={styles.inputs}
						onChangeText={text => this.setState({ email: text })}
						value={this.state.email}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="enter ur password"
						style={styles.inputs}
						onChangeText={password =>
							this.setState({ password: password })
						}
						value={this.state.password}
						secureTextEntry={true}
					/>
				</View>
				<TouchableOpacity
					onPress={this.login}
					style={[styles.buttonContainer, styles.signupButton]}
				>
					<Text>login</Text>
				</TouchableOpacity>
				<Text> if you don't have an account please</Text>
				<TouchableOpacity
					style={{ color: "blue" }}
					onPress={() => this.props.navigation.navigate("SignUp")}
				>
					<Text style={styles.signUpText}>SignUp</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00b5ec"
	},
	inputContainer: {
		borderBottomColor: "#F5FCFF",
		backgroundColor: "#FFFFFF",
		borderRadius: 30,
		borderBottomWidth: 1,
		width: 250,
		height: 45,
		marginBottom: 20,
		flexDirection: "row",
		alignItems: "center"
	},
	inputs: {
		height: 45,
		marginLeft: 16,
		borderBottomColor: "#FFFFFF",
		flex: 1
	},
	inputIcon: {
		width: 30,
		height: 30,
		marginLeft: 15,
		justifyContent: "center"
	},
	buttonContainer: {
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		width: 250,
		borderRadius: 30
	},
	signupButton: {
		backgroundColor: "#FF4DFF"
	},
	signUpText: {
		color: "white"
	}
});
