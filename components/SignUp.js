import React from "react";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	TextInput,
	Image,
	returnKeyType,
	PermissionsAndroid,
	CameraRoll,
	TouchableOpacity
} from "react-native";
import { Permissions } from "expo";
//import ImagePicker from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";

import * as firebase from "firebase";

export default class SignUp extends React.Component {
	state = {
		email: "",
		password: "",
		userName: "",
		profPic: ""
	};

	SignUp = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(
				this.state.email,
				this.state.password
			)
			.then(() => {
				this.publish();
			})
			.catch(error => {
				if (error.code == "auth/email-already-in-use") {
					alert("already in use");
				} else if (error.code == "auth/weak-password") {
					alert("WeakPassword");
				} else {
					alert(error.message);
				}
			});
	};

	publish = () => {
		const imageUri = this.state.profPic;
		this.uploadImage(imageUri)
			.then(downloadURL => {
				console.log(downloadURL);
				const user = firebase.auth().currentUser;
				if (user) {
					user.updateProfile({
						displayName: this.state.userName,
						photoURL: downloadURL
					})
						.then(() => {
							alert("successfully updated profile picture");
							this.props.navigation.navigate("Login");
						})
						.catch(error => {
							console.log(error);
						});
				}
			})
			.catch(error => {
				alert("Published failed.");
			});
	};

	uploadImage = uri => {
		const imagesRef = firebase
			.storage()
			.ref()
			.child("images")
			.child(uuid.v4());
		const downloadURLPromise = new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function() {
				const blob = xhr.response;
				var uploadTask = imagesRef.put(blob);
				uploadTask.then(snapshot => {
					snapshot.ref.getDownloadURL().then(function(downloadURL) {
						resolve(downloadURL);
					});
				});
			};
			xhr.responseType = "blob";
			xhr.open("GET", uri, true);
			xhr.send(null);
		});
		return downloadURLPromise;
	};

	selectImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3]
		});

		if (result.cancelled != true) {
			this.setState({
				profPic: result.uri
			});
		}
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
						returnKeyType="Next"
						placeholder="Email"
						style={styles.inputs}
						onChangeText={text => this.setState({ email: text })}
						value={this.state.email}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="User Name"
						style={styles.inputs}
						onChangeText={userName =>
							this.setState({ userName: userName })
						}
						value={this.state.userName}
					/>
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						placeholder="Password"
						style={styles.inputs}
						onChangeText={password =>
							this.setState({ password: password })
						}
						value={this.state.password}
						secureTextEntry={true}
					/>
				</View>

				<TouchableOpacity onPress={this.selectImage}>
					<Text> Add Profile picture </Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.buttonContainer, styles.signupButton]}
					onPress={this.SignUp}
				>
					<Text>SignUp</Text>
				</TouchableOpacity>
				<Text> if you already have account please</Text>
				<TouchableOpacity
					style={{ color: "blue" }}
					onPress={() => this.props.navigation.navigate("Login")}
				>
					<Text style={styles.signUpText}>Sign In</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
// ImagePicker.showImagePicker(null, response => {
// 	if (response.didCancel) {
// 		console.log("User cancelled image picker");
// 	} else if (response.error) {
// 		console.log("ImagePicker Error:", response.error);
// 	} else {
// 		const source = { uri: response.uri };
// 		this.setState({
// 			profPic: source
// 		});
// 	}
// });

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
