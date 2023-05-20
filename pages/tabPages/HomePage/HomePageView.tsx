import { useQuery } from "@tanstack/react-query";
import {
    Box,
    Text,
    Input,
    Button,
    FlatList,
    HStack,
    Flex,
    ScrollView,
    View,
    VStack,
    Heading,
} from "native-base";
import getGroups from "../../../Services/tahvelApi/getGroups";
import getRooms from "../../../Services/tahvelApi/getRooms";
import getTeachers from "../../../Services/tahvelApi/getTeachers";
import { reqType } from "../DashboardPage/dashBoardPages/SchedulePage";
import { useState, useEffect } from "react";
import getTahvelData from "../../../Services/tahvelApi/getTahvelData";
import CircularProgress from "react-native-circular-progress-indicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Shape from "../../../components/Visual/Shape";

export default function HomePageView() {
    const [token, setToken] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState("");
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ["tahvel"],
        queryFn: async () => {
            if (token) {
                return await getTahvelData(token);
            }
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
        return (
            <Flex
                height={"100%"}
                justifyContent="center"
                marginLeft={10}
                marginRight={10}
            >
                <Text>Loading</Text>
            </Flex>
        );
    } else if (token && data) {
        return (
            <VStack backgroundColor={"#1D8650"} borderBottomLeftRadius={20}>
                <Shape
                    color="#095E02"
                    svgPath="M14.8301 0H337V282.482C299.656 301.955 262.307 295.541 252.613 275.146C203.181 171.146 155.113 112.646 75.6128 162.146C1.28025 208.428 -16.6646 77.6804 14.8301 0Z"
                    width={250}
                    height={270}
                    top={0}
                    right={0}
                />
                

                <Shape
                    color="#095E02"
                    svgPath="M200.471 57.2552H0.471191C3.13637 56.1806 6.16987 55.1602 9.60232 54.0056C19.2016 50.7766 31.921 46.4981 48.4304 37.0476C55.5147 32.9924 62.2749 28.8693 68.7418 24.9252C107.55 1.25659 135.794 -15.9693 160.13 26.5441C168.016 40.3205 180.271 46.6698 192.255 52.8782C195.027 54.3147 197.785 55.7436 200.471 57.2552Z"
                    width={200}
                    height={70}
                    bottom={0}
                    left={0}
                />

                

                <View width={"100%"} h={8} />
                <ScrollView padding={5}>
                    <VStack marginBottom={10} paddingLeft={5} paddingRight={5}>
                        <Flex
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            marginBottom={1}
                        >
                            <Heading
                                fontSize={32}
                                color={"white"}
                                numberOfLines={1}
                                fontWeight={600}
                            >
                                {data.fullPersonInfo.person.fullname}
                            </Heading>

                            <Text
                                fontSize={20}
                                color={"white"}
                                numberOfLines={1}
                                fontWeight={400}
                            >
                                {data.fullPersonInfo.studentGroup.nameEt}
                            </Text>
                        </Flex>
                        <Flex
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            marginBottom={3}
                        >
                            <Text
                                fontSize={20}
                                color={"white"}
                                numberOfLines={1}
                                fontWeight={600}
                            >
                                {data.fullPersonInfo.person.idcode}
                            </Text>

                            <Text
                                fontSize={20}
                                color={"white"}
                                numberOfLines={1}
                                fontWeight={400}
                            >
                                Course {data.fullPersonInfo.course}
                            </Text>
                        </Flex>
                        <Flex direction="row" justifyContent={"space-around"}>
                            <Flex
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <CircularProgress
                                    value={
                                        Math.floor(
                                            data.fullPersonInfo.averageMark *
                                                100
                                        ) / 100
                                    }
                                    maxValue={5.0}
                                    radius={60}
                                    duration={2000}
                                    progressValueStyle={{
                                        fontWeight: "300",
                                        color: "white",
                                    }}
                                    inActiveStrokeColor="#939393"
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
                                <Text
                                    color={"white"}
                                    numberOfLines={1}
                                    fontWeight={300}
                                >
                                    Average mark
                                </Text>
                            </Flex>
                            <Flex
                                alignItems={"center"}
                                justifyContent={"center"}
                            >
                                <CircularProgress
                                    value={
                                        Math.floor(
                                            data.fullPersonInfo
                                                .fulfillmentPercentage * 10
                                        ) / 10
                                    }
                                    maxValue={100}
                                    radius={60}
                                    duration={2000}
                                    progressValueStyle={{
                                        fontWeight: "300",
                                        color: "white",
                                    }}
                                    inActiveStrokeColor="#939393"
                                    valueSuffix={"%"}
                                    activeStrokeColor={"#F15A22"}
                                    progressFormatter={(value: number) => {
                                        "worklet";
                                        return Math.floor(value * 10) / 10;
                                    }}
                                />
                                <Text
                                    color={"white"}
                                    numberOfLines={1}
                                    fontWeight={300}
                                >
                                    Training completed
                                </Text>
                            </Flex>
                        </Flex>
                    </VStack>
                    <Heading color={"white"}>Marks</Heading>
                    <FlatList
                        data={data.marks}
                        renderItem={({ item }) => (
                            <Flex
                                flexDirection="row"
                                marginBottom={2}
                                paddingBottom={2}
                                borderBottomColor={"white"}
                                borderBottomWidth={1}
                                alignItems={"center"}
                            >
                                <Box style={{ flex: 9 }}>
                                    <Text
                                        color={"white"}
                                        numberOfLines={1}
                                        fontWeight={400}
                                    >
                                        {item.nameEt}
                                    </Text>
                                    <Text
                                        color={"white"}
                                        numberOfLines={1}
                                        fontWeight={300}
                                    >
                                        {item.content}
                                    </Text>
                                </Box>

                                <Text
                                    color={
                                        item.grade.code.split("_")[1] == "MA"
                                            ? "red"
                                            : "white"
                                    }
                                    style={{ flex: 1 }}
                                    paddingLeft={4}
                                    fontSize={24}
                                    fontWeight={
                                        item.entryCode?.split("_")[1] == "O"
                                            ? 900
                                            : 400
                                    }
                                >
                                    {item.grade.code.split("_")[1]}
                                </Text>
                            </Flex>
                        )}
                    />
                    <Heading color={"white"}>Absences</Heading>
                    <FlatList
                        data={data.absences}
                        renderItem={({ item }) => (
                            <Flex
                                flexDirection="row"
                                marginBottom={2}
                                paddingBottom={2}
                                borderBottomColor={"white"}
                                borderBottomWidth={1}
                                alignItems={"center"}
                            >
                                <Box style={{ flex: 9 }}>
                                    <Text
                                        color={"white"}
                                        numberOfLines={1}
                                        fontWeight={400}
                                    >
                                        {item.journalName}{" "}
                                        {new Date(
                                            item.entryDate
                                        ).toLocaleDateString()}
                                    </Text>
                                    <Text
                                        color={"white"}
                                        numberOfLines={1}
                                        fontWeight={300}
                                    >
                                        {item.lessonNrStart} -{" "}
                                        {item.lessonNrEnd} tund
                                    </Text>
                                </Box>

                                <Text
                                    color={"white"}
                                    style={{ flex: 1 }}
                                    paddingLeft={4}
                                    fontSize={24}
                                    fontWeight={400}
                                >
                                    {item.lessons}
                                </Text>
                            </Flex>
                        )}
                    />
                    <Heading color={"white"}>Tasks</Heading>
                    <FlatList
                        data={data.tasks}
                        renderItem={({ item }) => (
                            <Flex
                                flexDirection="row"
                                marginBottom={2}
                                paddingBottom={2}
                                borderBottomColor={"white"}
                                borderBottomWidth={1}
                                alignItems={"center"}
                            >
                                <Box style={{ flex: 8 }}>
                                    <Text
                                        color={"white"}
                                        numberOfLines={1}
                                        fontWeight={400}
                                    >
                                        {item.journalName}
                                    </Text>
                                    <Text
                                        color={"white"}
                                        numberOfLines={2}
                                        fontWeight={300}
                                    >
                                        {item.taskContent}
                                    </Text>
                                </Box>

                                <Text
                                    color={"white"}
                                    style={{ flex: 2 }}
                                    paddingLeft={4}
                                    fontSize={12}
                                    fontWeight={400}
                                >
                                    {new Date(item.date).toLocaleDateString()}
                                </Text>
                            </Flex>
                        )}
                    />
                    <View width={"100%"} h={20} />
                </ScrollView>
                
            </VStack>
        );
    } else {
        return (
            <Flex
                height={"100%"}
                justifyContent="center"
                marginLeft={10}
                marginRight={10}
            >
                <Box>
                    <Input
                        placeholder="Введите токен"
                        onChangeText={(text) => setInputValue(text)}
                        marginBottom={2}
                    />
                    <Button onPress={handleButtonClick}>
                        <Text>Отправить</Text>
                    </Button>
                </Box>
            </Flex>
        );
    }
}
