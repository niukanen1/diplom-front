import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
	Box,
	Text,
	Input,
	Button,
	Flex,
	ScrollView,
	View,
	VStack,
	Heading,
	Spinner,
	Modal,
	Center,
	Alert,
	HStack,
    TextArea,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircularProgress from "react-native-circular-progress-indicator";
import Shape from "../../../components/Visual/Shape";

import getGroups from "../../../Services/tahvelApi/getGroups";
import getRooms from "../../../Services/tahvelApi/getRooms";
import getTeachers from "../../../Services/tahvelApi/getTeachers";
import getTahvelData from "../../../Services/tahvelApi/getTahvelData";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { mark } from "../../../entities/mark";
import { AntDesign } from "@expo/vector-icons";
import { absence } from "../../../entities/absence";
import { task } from "../../../entities/task";

interface TokenInputScreenProps {
	setInputValue: React.Dispatch<React.SetStateAction<string>>;
	handleButtonClick: () => void;
}

function DataBlock({ list, heading }: { heading: string; list: mark[] | absence[] | task[] }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handlePress = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const RenderItem = ({ item }: { item: mark | absence | task }) => {
		const [main, description, value, color = "white", weight = "400"] =
			"nameEt" in item
				? [
						item.nameEt,
						item.content,
						item.grade.code.split("_")[1],
						item.grade.code.split("_")[1] == "MA" ? "red" : "white",
						item.entryCode?.split("_")[1] == "O" ? 900 : 400,
				  ]
				: "absenceCode" in item
				? [
						item.journalName + " " + new Date(item.entryDate).toLocaleDateString(),
						item.lessonNrStart + " - " + item.lessonNrEnd + " tund",
						item.lessons,
				  ]
				: [item.journalName, item.taskContent, new Date(item.date).toLocaleDateString()];

		const flex = "taskContent" in item ? 8 : 9;

		return (
			<Flex
				flexDirection='row'
				marginBottom={2}
				paddingBottom={2}
				borderBottomColor={"white"}
				borderBottomWidth={1}
				alignItems={"center"}>
				<Box style={{ flex: flex }}>
					<Text color={"white"} numberOfLines={1} fontWeight={400}>
						{main}
					</Text>
					<Text color={"white"} numberOfLines={1} fontWeight={300}>
						{description}
					</Text>
				</Box>

				<Text
					color={color}
					style={{ flex: 10 - flex }}
					paddingLeft={4}
					fontSize={flex == 9 ? 24 : 10}
					fontWeight={weight}>
					{value}
				</Text>
			</Flex>
		);
	};

	return (
		<View>
			<TouchableOpacity onPress={handlePress}>
				<Heading color={"white"} marginBottom={3}>
					{heading}
				</Heading>
				<Center>
					{list.slice(0, 2).map((el) => (
						<RenderItem item={el} />
					))}

					<AntDesign name='downcircleo' size={24} color='white' />
				</Center>
			</TouchableOpacity>
			<Modal isOpen={isModalOpen} onClose={closeModal} width={"100%"}>
				<Modal.Content maxWidth='400px' width={"100%"} height={"100%"} backgroundColor={"rgba(29, 134, 80, 1)"}>
					<Modal.CloseButton backgroundColor={"white"} padding={1} />
					<Modal.Header backgroundColor={"#1D8650"}>
						<Heading color={"white"}>{heading}</Heading>
					</Modal.Header>
					<Modal.Body>
						{list.map((el) => (
							<RenderItem item={el} />
						))}
					</Modal.Body>
				</Modal.Content>
			</Modal>
		</View>
	);
}

const LoadingScreen = () => (
	<Flex height={"100%"} justifyContent='center' marginLeft={10} marginRight={10}>
		<Spinner accessibilityLabel='Загрузка' size='lg' />
	</Flex>
);

const TokenInputScreen = ({ setInputValue, handleButtonClick }: TokenInputScreenProps) => (
	<SafeAreaView>
		<Alert colorScheme={"warning"} status='warning'>
			<VStack>
				<HStack space={2} alignItems={"center"}>
					<Alert.Icon alignSelf={'flex-start'} size={'25px'}></Alert.Icon>
					<VStack>
                        <Heading>Внимание</Heading>
						<Text>Эта функция находится в разработке</Text>
					</VStack>
				</HStack>
			</VStack>
		</Alert>
		<Flex height={"100%"} marginBottom={'-200px'} justifyContent='center' marginLeft={10} marginRight={10}>
			<Box>
				<TextArea
                    size={'2xl'}
                    autoCompleteType={'none'}
                    borderRadius={'10px'}
					placeholder='Введите токен'
					onChangeText={(text) => setInputValue(text)}
					marginBottom={2}
					_focus={{ backgroundColor: "orange.100", borderColor: "orange.500" }}
				/>
				<Button backgroundColor={"orange.500"} borderRadius={20} onPress={handleButtonClick}>
					<Text color={"white"}>Отправить</Text>
				</Button>
			</Box>
		</Flex>
	</SafeAreaView>
);

const HomePageView = () => {
	const [token, setToken] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState("");
	const { isLoading, isError, data, error, refetch } = useQuery({
		queryKey: ["tahvel", "object"],
		queryFn: async () => {
			if (token) {
				return await getTahvelData(token);
			}
			return null;
		},
	});

	useEffect(() => {
		AsyncStorage.getItem("tahvel-token").then((token) => {
			if (token) {
				setToken(token);
			}
		});
	}, []);

	useEffect(() => {
		refetch();
	}, [token]);

	useEffect(() => {}, [data]);

	const handleButtonClick = () => {
		setToken(inputValue);
		AsyncStorage.setItem("tahvel-token", inputValue).catch((error: any) => {
			console.log(error);
		});
	};

	if (isLoading) {
		return <LoadingScreen />;
	} else if (token && data) {
		return (
			<VStack backgroundColor={"white"} borderBottomLeftRadius={20}>
				<Shape
					color='#095E02'
					svgPath='M14.8301 0H337V282.482C299.656 301.955 262.307 295.541 252.613 275.146C203.181 171.146 155.113 112.646 75.6128 162.146C1.28025 208.428 -16.6646 77.6804 14.8301 0Z'
					width={250}
					height={270}
					top={0}
					right={0}
				/>

				<Shape
					color='#095E02'
					svgPath='M200.471 57.2552H0.471191C3.13637 56.1806 6.16987 55.1602 9.60232 54.0056C19.2016 50.7766 31.921 46.4981 48.4304 37.0476C55.5147 32.9924 62.2749 28.8693 68.7418 24.9252C107.55 1.25659 135.794 -15.9693 160.13 26.5441C168.016 40.3205 180.271 46.6698 192.255 52.8782C195.027 54.3147 197.785 55.7436 200.471 57.2552Z'
					width={200}
					height={70}
					bottom={0}
					left={0}
				/>

				<View width={"100%"} h={8} />
				<ScrollView>
					<VStack
						marginBottom={10}
						padding={5}
						backgroundColor={"#1D8650"}
						borderBottomRadius={20}
						width={"100%"}>
						<Flex direction='row' justifyContent={"space-between"} alignItems={"center"} marginBottom={1}>
							<Heading fontSize={32} color={"white"} numberOfLines={1} fontWeight={600}>
								{data.fullPersonInfo.person.fullname}
							</Heading>

							<Text fontSize={20} color={"white"} numberOfLines={1} fontWeight={400}>
								{data.fullPersonInfo.studentGroup.nameEt}
							</Text>
						</Flex>
						<Flex direction='row' justifyContent={"space-between"} alignItems={"center"} marginBottom={3}>
							<Text fontSize={20} color={"white"} numberOfLines={1} fontWeight={600}>
								{data.fullPersonInfo.person.idcode}
							</Text>

							<Text fontSize={20} color={"white"} numberOfLines={1} fontWeight={400}>
								Course {data.fullPersonInfo.course}
							</Text>
						</Flex>
						<Flex direction='row' justifyContent={"space-around"}>
							<Flex alignItems={"center"} justifyContent={"center"}>
								<CircularProgress
									value={Math.floor(data.fullPersonInfo.averageMark * 100) / 100}
									maxValue={5.0}
									radius={60}
									duration={2000}
									progressValueStyle={{
										fontWeight: "300",
										color: "white",
									}}
									inActiveStrokeColor='#939393'
									strokeColorConfig={[
										{ color: "red", value: 0 },
										{ color: "orange", value: 2.5 },
										{ color: "lightgreen", value: 4.5 },
									]}
									progressFormatter={(value: number) => {
										"worklet";
										return Math.floor(value * 100) / 100;
									}}
								/>
								<Text color={"white"} numberOfLines={1} fontWeight={300}>
									Средняя оценка
								</Text>
							</Flex>
							<Flex alignItems={"center"} justifyContent={"center"}>
								<CircularProgress
									value={Math.floor(data.fullPersonInfo.fulfillmentPercentage * 10) / 10}
									maxValue={100}
									radius={60}
									duration={2000}
									progressValueStyle={{
										fontWeight: "300",
										color: "white",
									}}
									inActiveStrokeColor='#939393'
									valueSuffix={"%"}
									activeStrokeColor={"#F15A22"}
									progressFormatter={(value: number) => {
										"worklet";
										return Math.floor(value * 10) / 10;
									}}
								/>
								<Text color={"white"} numberOfLines={1} fontWeight={300}>
									Пройдено программы
								</Text>
							</Flex>
						</Flex>
					</VStack>
					<View backgroundColor={"rgba(29, 134, 80, 1)"} padding={3} marginBottom={2}>
						<DataBlock list={data.marks} heading={"Последние оценки"} />
					</View>
					<View backgroundColor={"rgba(29, 134, 80, 1)"} padding={3} marginBottom={2}>
						<DataBlock list={data.absences} heading={"Отсутствия"} />
					</View>
					<View backgroundColor={"rgba(29, 134, 80, 1)"} padding={3} marginBottom={2}>
						<DataBlock list={data.tasks} heading={"Задания"} />
					</View>

					<View width={"100%"} h={20} />
				</ScrollView>
			</VStack>
		);
	} else if (isError) {
		return (
			<VStack backgroundColor={"white"} height={"100%"} justifyContent={"center"}>
				<Heading>Ошибка получения данных</Heading>
				<Text>Проверьте токен и интернет соединение и попробуйте снова</Text>
				<Button onPress={() => refetch()}>
					<Text>Повторить</Text>
				</Button>
			</VStack>
		);
	} else {
		return <TokenInputScreen setInputValue={setInputValue} handleButtonClick={handleButtonClick} />;
	}
};

export default HomePageView;
