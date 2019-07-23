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
import { SearchBar } from "react-native-elements";

export default class Search extends React.Component {
	handlePress = item => {
		this.props.navigation.navigate({
			name: item.name,
			category: item.category
		});
	};
	state = {
		search: "",
		coursesForSearch: courses
	};

	updateSearch = search => {
		this.setState({ search: search });
		this.setState({
			coursesForSearch: courses.filter(course =>
				course.name.includes(search)
			)
		});
	};
	handlePress = item => {
		this.props.navigation.navigate("searchInfo", {
			name: item.name,
			image: item.image,
			category: item.category,
			detail: item.detail
		});
	};
	render() {
		const { search } = this.state;

		return (
			<ScrollView contentContainerStyle={styles.container}>
				<SearchBar
					placeholder="Type Here..."
					onChangeText={this.updateSearch}
					value={search}
				/>
				{search.length > 0 ? (
					<FlatList
						keyExtractor={(item, index) => item.name}
						data={this.state.coursesForSearch}
						renderItem={({ item }) => {
							return (
								<View>
									<TouchableOpacity
										onPress={() => this.handlePress(item)}
									></TouchableOpacity>
									<Text
										style={{
											fontSize: 30,
											fontWeight: "bold",
											color: "white"
										}}
									>
										{item.name}
									</Text>
								</View>
							);
						}}
					/>
				) : (
					<View style={styles.container}>
						<Text style={{ fontSize: 24, color: "white" }}>
							Trends for You
						</Text>

						<TouchableOpacity
							onPress={() => this.handlePress(courses[1])}
							style={styles.flat}
						>
							<Image
								source={require("../assets/administration.jpg")}
								style={{ width: 150, height: 150 }}
							/>
							<Text style={{ color: "white", margin: 10 }}>
								Topic:Administration {"\n"}
								Views: 185k
							</Text>
						</TouchableOpacity>
						<View style={styles.flat}>
							<TouchableOpacity
								onPress={() => this.handlePress(courses[0])}
								style={styles.flat}
							>
								<Image
									style={{ width: 150, height: 150 }}
									source={require("../assets/accounting.jpg")}
								/>
								<Text style={{ color: "white", margin: 10 }}>
									Topic:Accounting {"\n"}
									Views: 15k
								</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.flat}>
							<TouchableOpacity
								onPress={() => this.handlePress(courses[2])}
								style={styles.flat}
							>
								<Image
									style={{ width: 150, height: 150 }}
									source={require("../assets/programming.png")}
								/>
								<Text style={{ color: "white", margin: 10 }}>
									Topic:Programming {"\n"}
									Views: 4k
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
		backgroundColor: "black",
		flexDirection: "column"
	},
	flat: {
		flex: 1,
		marginTop: 20,
		flexDirection: "row",
		padding: 10
	}
});
const courses = [
	{
		name: "Financial Accounting Made Fun",
		image: require("../assets/accounting.jpg"),
		category: "Accounting"
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
		category: "Programming",
		detail:
			"Machine Learning is the basis for the most exciting careers in data analysis today. You’ll learn the models and methods and apply them to real world situations ranging from identifying trending news topics, to building recommendation engines, ranking sports teams and plotting the path of movie zombies.Major perspectives covered include:probabilistic versus non-probabilistic modeling supervised versus unsupervised learning Topics include: classification and regression, clustering methods, sequential models, matrix factorization, topic modeling and model selection.Methods include: linear and logistic regression, support vector machines, tree classifiers, boosting, maximum likelihood and MAP inference, EM algorithm, hidden Markov models, Kalman filters, k-means, Gaussian mixture models, among others.In the first half of the course we will cover supervised learning techniques for regression and classification. In this framework, we possess an output or response that we wish to predict based on a set of inputs. We will discuss several fundamental methods for performing this task and algorithms for their optimization. Our approach will be more practically motivated, meaning we will fully develop a mathematical understanding of the respective algorithms, but we will only briefly touch on abstract learning theory.In the second half of the course we shift to unsupervised learning techniques. In these problems the end goal less clear-cut than predicting an output based on a corresponding input. We will cover three fundamental problems of unsupervised learning: data clustering, matrix factorization, and sequential models for order-dependent data. Some applications of these models include object recommendation and topic modeling."
	}
];
