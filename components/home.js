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
		this.props.navigation.navigate("info", {
			name: item.name,
			image: item.image,
			category: item.category,
			detail: item.detail
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
						<Text>All</Text>
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
								<TouchableOpacity
									onPress={() => this.handlePress(item)}
								>
									<Image
										style={{ width: imagewidth }}
										source={item.image}
									/>
								</TouchableOpacity>
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
	{
		name: "Financial Accounting Made Fun",
		image: require("../assets/accounting.jpg"),
		detail:
			"Machine Learning is the basis for the most exciting careers in data analysis today. You’ll learn the models and methods and apply them to real world situations ranging from identifying trending news topics, to building recommendation engines, ranking sports teams and plotting the path of movie zombies.Major perspectives covered include:probabilistic versus non-probabilistic modeling supervised versus unsupervised learning Topics include: classification and regression, clustering methods, sequential models, matrix factorization, topic modeling and model selection.Methods include: linear and logistic regression, support vector machines, tree classifiers, boosting, maximum likelihood and MAP inference, EM algorithm, hidden Markov models, Kalman filters, k-means, Gaussian mixture models, among others.In the first half of the course we will cover supervised learning techniques for regression and classification. In this framework, we possess an output or response that we wish to predict based on a set of inputs. We will discuss several fundamental methods for performing this task and algorithms for their optimization. Our approach will be more practically motivated, meaning we will fully develop a mathematical understanding of the respective algorithms, but we will only briefly touch on abstract learning theory.In the second half of the course we shift to unsupervised learning techniques. In these problems the end goal less clear-cut than predicting an output based on a corresponding input. We will cover three fundamental problems of unsupervised learning: data clustering, matrix factorization, and sequential models for order-dependent data. Some applications of these models include object recommendation and topic modeling."
	},
	{
		name: "Healthcare Administration Comprehensive Exam",
		image: require("../assets/administration.jpg"),
		category: "Administration"
	},
	{ name: "Machine Learning", image: require("../assets/machine.jpeg") },
	{
		name: "CS50's Introduction to Computer Science",
		image: require("../assets/programming.png"),
		category: "Programming"
	}
];
