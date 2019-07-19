import React from "react";
import { StyleSheet, Text, View, ScrollView, TextInput,TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default class SignUp extends React.Component {
	state= {
		email:"",
		password:""
	}


		
	SignUp = () => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.then(() => {
				alert("You'll automaticlly moved to login page");
				this.props.navigation.navigate("Login");
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
	render() {
		return (
			<View>
				<Text>UserName</Text>
				<TextInput
				placeholder="enter ur email"
					style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
					onChangeText={text => this.setState({ email: text })}
					value={this.state.email}
				/>
				<TextInput
				placeholder="enter ur password"
					style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
					onChangeText={password => this.setState({ password:password })}
					value={this.state.password}
					secureTextEntry={true}
				/>
				<TouchableOpacity onPress={this.SignUp}> 
				<Text>SignUp</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
