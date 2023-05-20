import {
    Box,
    FlatList,
    HStack,
    Heading,
    VStack,
    Text,
    Accordion,
    ScrollView,
    Input,
    Spinner,
    Flex,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { scheduleEvent } from "../../../../entities/scheduleEvent";
import { useQuery } from "@tanstack/react-query";
import getScheduleEvents from "../../../../Services/tahvelApi/getScheduleEvents";
import {
    getFirstDayOfWeek,
    getLastDayOfWeek,
} from "../../../../Services/Helpers/DateProcessing";
import getGroups from "../../../../Services/tahvelApi/getGroups";
import { group } from "../../../../entities/group";
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    View,
} from "react-native";
import {
    SortedEvents,
    sortEventsByDate,
} from "../../../../Services/Helpers/sortEventsBydate";
import { getDayOfWeek } from "../../../../Services/Helpers/getDayOfWeek";
import getTeachers from "../../../../Services/tahvelApi/getTeachers";
import getRooms from "../../../../Services/tahvelApi/getRooms";
import { room } from "../../../../entities/room";
import { teacher } from "../../../../entities/teacher";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

export enum reqType {
    group = "group",
    teacher = "teacher",
    room = "room",
}

export function SchedulePage({ type }: { type: reqType }) {
    const [schedule, setSchedule] = useState<SortedEvents>({});
    const [Id, setId] = useState<string>();
    const [Name, setName] = useState<string>();
    const [currentWeekDay, setCurrentWeekDay] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string>(
        getDayOfWeek(new Date().toLocaleDateString())
    );
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ["schedule", "lesson", "list"],
        queryFn: () => {
            if (Id) {
                switch (type) {
                    case reqType.group:
                        return getScheduleEvents(
                            getFirstDayOfWeek(currentWeekDay).toISOString(),
                            getLastDayOfWeek(currentWeekDay).toISOString(),
                            Id
                        );
                    case reqType.teacher:
                        return getScheduleEvents(
                            getFirstDayOfWeek(currentWeekDay).toISOString(),
                            getLastDayOfWeek(currentWeekDay).toISOString(),
                            null,
                            Id
                        );
                    case reqType.room:
                        return getScheduleEvents(
                            getFirstDayOfWeek(currentWeekDay).toISOString(),
                            getLastDayOfWeek(currentWeekDay).toISOString(),
                            null,
                            null,
                            Id
                        );
                    default:
                        break;
                }
            }
            return Promise.resolve([]);
        },
        enabled: Boolean(Id),
    });

    useEffect(() => {
        refetch();
    }, [Id]);

    useEffect(() => {
        refetch();
    }, [currentWeekDay]);

    currentWeekDay;

    useEffect(() => {
        setSchedule(sortEventsByDate(data));
        console.log(JSON.stringify(data));
    }, [data]);

    const renderDayButton = (day: string) => {
        const isActive = day === selectedDay;
        const buttonText = getDayOfWeek(day).slice(0, 2).toUpperCase();
        return (
            <TouchableOpacity
                key={day}
                onPress={() => setSelectedDay(day)}
                style={{
                    paddingHorizontal: 5,
                    backgroundColor: isActive ? "#F15A22" : "#58A57E",
                    borderRadius: 25,
                    marginHorizontal: 5,
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text fontSize={12} color={"white"}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <VStack>
            <Heading>Расписание</Heading>
            <GroupListSelection
                setId={setId}
                type={type}
                setNameMain={setName}
            />
            <ScrollView horizontal={false} flex={1}>
                <Flex
                    direction="row"
                    justifyContent={"space-around"}
                    marginTop={3}
                    marginBottom={1}
                >
                    <AntDesign
                        name="leftcircleo"
                        size={24}
                        color="black"
                        onPress={() =>
                            setCurrentWeekDay(
                                new Date(
                                    currentWeekDay.setDate(
                                        currentWeekDay.getDate() - 7
                                    )
                                )
                            )
                        }
                    />
                    {Object.keys(schedule)
                        .sort(
                            (a, b) =>
                                new Date(a).getTime() - new Date(b).getTime()
                        )
                        .map((item) => (
                            <View key={item}>{renderDayButton(item)}</View>
                        ))}
                    <AntDesign
                        name="rightcircleo"
                        size={24}
                        color="black"
                        onPress={() =>
                            setCurrentWeekDay(
                                new Date(
                                    currentWeekDay.setDate(
                                        currentWeekDay.getDate() + 7
                                    )
                                )
                            )
                        }
                    />
                </Flex>
                {schedule[selectedDay] && schedule[selectedDay].length > 0 ? (
                    <Flex>
                        {schedule[selectedDay].map((item) => (
                            <View
                                key={`${type}-${item.id}`}
                                style={{
                                    backgroundColor: "#1D8650",
                                    borderRadius: 6,
                                    marginBottom: 5,
                                    padding: 10,
                                }}
                            >
                                <Flex
                                    direction="row"
                                    justifyContent={"space-between"}
                                >
                                    <Text numberOfLines={1} color={"white"}>
                                        {item.rooms.length > 0
                                            ? item.rooms
                                                  .map((room) =>
                                                      room.roomCode
                                                          ? `${room.buildingCode} ${room.roomCode}`
                                                          : item.addInfo
                                                  )
                                                  .join("")
                                            : item.addInfo}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        color={"white"}
                                    >
                                        {new Date(item.date).toLocaleDateString()}
                                    </Text>
                                </Flex>
                                <Text
                                    numberOfLines={1}
                                    color={"white"}
                                    fontSize={20}
                                >
                                    {item.nameEt}
                                </Text>
                                <Flex
                                    direction="row"
                                    justifyContent={"space-between"}
                                >
                                    <Text numberOfLines={1} color={"white"}>
                                        {item.timeStart} - {item.timeEnd}
                                    </Text>
                                    <Text numberOfLines={1} color={"white"}>
                                        {item.teachers
                                            .map((teacher) =>
                                                teacher.name
                                                    ? teacher.name
                                                    : "-"
                                            )
                                            .join(" ")}
                                    </Text>
                                </Flex>
                            </View>
                        ))}
                    </Flex>
                ) : (
                    <Text>Сегодня ничего нет</Text>
                )}
            </ScrollView>
        </VStack>
    );
}

export function GroupListSelection({
    setId,
    setNameMain,
    type,
}: {
    setId: React.Dispatch<React.SetStateAction<string | undefined>>;
    setNameMain: React.Dispatch<React.SetStateAction<string | undefined>>;
    type: reqType;
}) {
    const [Name, setName] = useState("");
    const [suggestions, setSuggestions] = useState<
        group[] | teacher[] | room[]
    >([]);
    const [enableSuggestions, setEnableSuggestions] = useState(true); // Флаг для включения/отключения предложений
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: [type, "list"],
        queryFn: async () => {
            switch (type) {
                case reqType.group:
                    return await getGroups();
                    break;
                case reqType.teacher:
                    return await getTeachers();
                    break;
                case reqType.room:
                    return await getRooms();
                    break;
            }
        },
    });

    useEffect(() => {
        AsyncStorage.getItem(type).then((item) => {
            if (item) {
                const u = JSON.parse(item);
                setName(u.name);
                setId(u.id);
            }
        });
    }, []);

    const handleInputChange = (text: string) => {
        setName(text);
        refetch();
        if (data) {
            const filteredSuggestions = (
                data as (group | teacher | room)[]
            ).filter((item: group | teacher | room) => {
                if ("nameEt" in item) {
                    // Type guard for group
                    return item.nameEt
                        ?.toLowerCase()
                        .includes(text.toLowerCase());
                } else if ("name" in item) {
                    // Type guard for teacher
                    return item.name
                        ?.toLowerCase()
                        .includes(text.toLowerCase());
                }
                return false;
            });
            const limitedSuggestions = filteredSuggestions.slice(0, 5);
            setSuggestions(limitedSuggestions);
        }
    };

    const handleSuggestionClick = (suggestion: group | teacher | room) => {
        if ("nameEt" in suggestion) {
            setName(
                suggestion.nameEt ? suggestion.nameEt : suggestion.id.toString()
            );
            setNameMain(
                suggestion.nameEt ? suggestion.nameEt : suggestion.id.toString()
            );
        } else if ("name" in suggestion) {
            setName(
                suggestion.name ? suggestion.name : suggestion.id.toString()
            );
            setNameMain(
                suggestion.name ? suggestion.name : suggestion.id.toString()
            );
        }
        setEnableSuggestions(false); // Отключаем предложения после выбора
        setId(suggestion.id.toString());
    };

    const handleInputFocus = () => {
        setEnableSuggestions(true); // Включаем предложения при фокусе на Input
    };

    return (
        <Box>
            <Input
                focusOutlineColor={"green.500"}
                value={Name}
                onChangeText={handleInputChange}
                onFocus={handleInputFocus}
            />
            {isLoading ? <Spinner accessibilityLabel="Загрузка" /> : null}
            <ScrollView>
                {enableSuggestions &&
                    suggestions.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleSuggestionClick(item)}
                        >
                            <Box>
                                <Text>
                                    {"nameEt" in item
                                        ? item.nameEt
                                        : "name" in item
                                        ? item.name
                                        : item.id.toString()}
                                </Text>
                            </Box>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </Box>
    );
}
