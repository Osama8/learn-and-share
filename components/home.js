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
		category: "Accounting"
	},
	{
		name: "Healthcare Administration Comprehensive Exam",
		image: require("../assets/administration.jpg"),
		category: "Administration"
	},

	{
		name: "CS50's Introduction to Computer Science",
		image: require("../assets/programming.png"),
		category: "Programming",
		detail:
			"Machine Learning is the basis for the most exciting careers in data analysis today. You’ll learn the models and methods and apply them to real world situations ranging from identifying trending news topics, to building recommendation engines, ranking sports teams and plotting the path of movie zombies.Major perspectives covered include:probabilistic versus non-probabilistic modeling supervised versus unsupervised learning Topics include: classification and regression, clustering methods, sequential models, matrix factorization, topic modeling and model selection.Methods include: linear and logistic regression, support vector machines, tree classifiers, boosting, maximum likelihood and MAP inference, EM algorithm, hidden Markov models, Kalman filters, k-means, Gaussian mixture models, among others.In the first half of the course we will cover supervised learning techniques for regression and classification. In this framework, we possess an output or response that we wish to predict based on a set of inputs. We will discuss several fundamental methods for performing this task and algorithms for their optimization. Our approach will be more practically motivated, meaning we will fully develop a mathematical understanding of the respective algorithms, but we will only briefly touch on abstract learning theory.In the second half of the course we shift to unsupervised learning techniques. In these problems the end goal less clear-cut than predicting an output based on a corresponding input. We will cover three fundamental problems of unsupervised learning: data clustering, matrix factorization, and sequential models for order-dependent data. Some applications of these models include object recommendation and topic modeling."
	},
	{
		name: "Computer Science and Mobile Apps",
		image: require("../assets/cs.jpg"),
		detail:
			"Whether it’s finding a good spot for lunch, posting a photo of that lunch on Instagram, or just getting some work done while on the go, mobile apps have become deeply ingrained in how we live, work, and play. Smartphones have become ubiquitous and the potential to make a dramatic impact on the everyday lives of millions of people has never been greater — but where do you start? How do you go from being a user to a skilled creator? What do you need to know and how do you learn it all?\
	The CS50 courses at Harvard have taught the art of programming to computer science majors and non-majors alike, to those with serious coding chops and those with no prior computer programming experience. Led by Professor David J. Malan, this program teaches learners how to think algorithmically and solve problems efficiently. The core Introduction to Computer Science course will give you a broad and robust understanding of the fundamentals of programming and computer systems. Then you’ll build on those fundamentals to learn about mobile app development using the React Native Framework.\
	With problem sets inspired by cryptography, finance, forensics, and gaming, you’ll become familiar with a variety of programming languages, then you’ll build expertise in modern JavaScript and learn the paradigms, app architecture, and user interfaces of JSX (a JavaScript extension) and React Native. The course culminates in a final project for which you will implement an app entirely of your own design."
	},

	{
		name: "Accounting for Decision-Making",
		image: require("acc.jpg"),
		detail:
			"Week 1: Mechanics of Financial Accounting\
Introduction to financial accounting; Generally Accepted Accounting Principles; fundamental accounting equation; recording of financial transactions and preparation of accounting statements through accounting equation.\
Week 2: Reading Financial Statements\
Reading and understanding balance sheet, income statement and cash flow statement; Familiarizing all accounting terms that normally appear in financial statements.\
Week 3: Financial Statement Analysis\
Ratio analysis; Understanding relationship between four profitability drivers; Assessing financial health through credit scoring model.\
Week 4: Product Costing\
Preparation of Cost Sheet in manufacturing and service industry; Job and process costing; Activity-based costing.\
Week 5: Cost Analysis for Decision Making\
Behaviour of costs; Break-even analysis; Relevant costing approach for different decision making scenarios.\
Week 6: Budgeting and variance analysis\
Preparation of operational and financial budgets; Comparing actual performance against budgets; Price and quantity variance; Controllable and non-controllable variance; Revenue and contribution variances."
	},
	{
		name:
			"Designing and Leading Learning Systems Designing and Leading Learning Systems",
		image: require("design.jpg"),
		detail:
			"Pursuing goals for ambitious teaching and learning requires that students, teachers, and educational leaders learn to work together in new ways. This course engages learners in exploring four leading logics of educational innovation: strategies and approaches to producing and using knowledge to improve educational practice and outcomes at scale, across many classrooms, schools, and systems. These logics include:\
Shell enterprises\
Diffusion enterprises\
Incubation enterprises\
Evolutionary enterprises\
Each of these logics has been used successfully in different types of classrooms, schools, and systems, though each also features traps and pitfalls that complicate universal usage.\
To understand both their potential and their pitfalls, learners will apply these logics in analyzing exemplary cases of large-scale, practice-focused educational innovation in the US and abroad.\
With deeper understandings of these logics, learners will be able to be strategic in designing and managing local innovation. They will also be able to identify external programs and projects that can serve as effective partners in innovation and improvement.\
This course is part of the Leading Educational Innovation and Improvement MicroMasters program offered by MichiganX."
	},
	{
		name: "Healthcare Administration Comprehensive Exam",
		image: require("admin.png"),
		detail:
			"This course is part of the Healthcare Administration MicroMasters program which consists of 7 courses and a capstone exam. After completing the program, you can also apply to Doane University to complete your MBA online for approximately $10,500 (learn more about the program here).\
This capstone exam includes the evaluation of the competencies and performance tasks, which define a successful healthcare administrator.\
This capstone exam is part of the DoaneX Healthcare Administration MicroMasters program that is designed to provide you with the in-depth knowledge and skills needed to be a successful healthcare administrator throughout various healthcare systems. In order to qualify for the MicroMasters Credential, you will need to earn a Verified Certificate in each of the seven DoaneX Healthcare Administration courses as well as pass this final capstone exam.\
The capstone exam will test knowledge across all seven courses. It will be a webcam proctored timed exam."
	},
	{
		name: "Instructional Design Models Instructional Design Models",
		image: require("des.jpg"),
		detail:
			"In today’s interconnected world, online education has exploded with engaging learning experiences infused with interactive digital tools, digital media, and collaborative projects designed to engage dispersed learners. These highly engaging and effective courses are not created by chance - they are created by instructional designers using a careful and systematic design process.\
In this education and teacher training course, part of the Instructional Design and Technology MicroMasters Program we will look at the history and evolution of online learning. You will explore traditional instructional design models and the progression of the learning design approach to creating online learning experiences. During the instructional design process, it’s important to collaborate and work with the many stakeholders involved in the planning and design, especially subject matter experts.\
You will explore curriculum design, collaboration and questioning techniques to create shared understandings as you develop your outline of an online course.\
This course is part of the Instructional Design and Technology MicroMaster’s program from UMUC. Upon completion of the program and receipt of the verified MicroMaster’s certificate, learners may then transition into the full UMUC Master’s Program in Learning Design and Technology. See the MicroMasters program page for more information."
	}
];
