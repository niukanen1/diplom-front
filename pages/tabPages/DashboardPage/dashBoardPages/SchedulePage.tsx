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
} from "native-base";
import { useEffect, useRef, useState } from "react";
import { scheduleEvent } from "../../../../entities/scheduleEvent";
import { useQuery } from "@tanstack/react-query";
import getScheduleEvents from "../../../../Services/tahvelApi/getScheduleEvents";
import {
    getFirstDayOfWeek,
    getLastDayOfWeek,
} from "../../../../Services/Helpers/DateProcessing";
import getGroups from "../../../../Services/tahvelApi/getGroups";
import { group } from "../../../../entities/group";
import { Keyboard, KeyboardAvoidingView, TouchableOpacity } from "react-native";
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

export enum reqType {
    group = "group",
    teacher = "teacher",
    room = "room",
}

export function SchedulePage({ type }: { type: reqType }) {
    const [schedule, setSchedule] = useState<SortedEvents>({});
    const [Id, setId] = useState<string>();
    const [Name, setName] = useState<string>();
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
                            getFirstDayOfWeek(new Date()).toISOString(),
                            getLastDayOfWeek(new Date()).toISOString(),
                            Id
                        );
                    case reqType.teacher:
                        return getScheduleEvents(
                            getFirstDayOfWeek(new Date()).toISOString(),
                            getLastDayOfWeek(new Date()).toISOString(),
                            null,
                            Id
                        );
                        break;
                    case reqType.room:
                        return getScheduleEvents(
                            getFirstDayOfWeek(new Date()).toISOString(),
                            getLastDayOfWeek(new Date()).toISOString(),
                            null,
                            null,
                            Id
                        );
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
        setSchedule(sortEventsByDate(data));
        console.log(schedule);
    }, [data]);
    return (
        <VStack>
            <Heading>Расписание</Heading>
            <GroupListSelection setId={setId} type={type} setNameMain={setName}/>
            <ScrollView horizontal={false} flex={1}>
                {schedule ? (
                    <FlatList
                        horizontal
                        data={Object.keys(schedule).sort(
                            (a, b) =>
                                new Date(a).getTime() - new Date(b).getTime()
                        )}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <Box width={250} marginLeft={"2"} marginRight={"2"}>
                                <Heading>{getDayOfWeek(item)}</Heading>
                                {schedule[item].map((event) => (
                                    <Box
                                        key={`${type}-${event.id}`}
                                        bg="rgba(29, 134, 80, 0.26)"
                                        borderRadius={6}
                                        marginBottom={"10px"}
                                        padding={"10px"}
                                    >
                                        <Text numberOfLines={1}>
                                            {event.rooms
                                                .map((room) =>
                                                    room.roomCode
                                                        ? `${room.buildingCode} ${room.roomCode}`
                                                        : event.addInfo
                                                )
                                                .join("")}
                                        </Text>

                                        <Text numberOfLines={1}>
                                            {event.nameEt}
                                        </Text>

                                        <Text numberOfLines={1}>
                                            {event.teachers
                                                .map((teacher) =>
                                                    teacher.name
                                                        ? teacher.name
                                                        : "-"
                                                )
                                                .join("")}
                                        </Text>
                                        <Text numberOfLines={1}>
                                            {event.timeStart} - {event.timeEnd}
                                        </Text>
                                    </Box>
                                ))}
                            </Box>
                        )}
                    />
                ) : (
                    <Text>Loading</Text>
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
    setNameMain:  React.Dispatch<React.SetStateAction<string | undefined>>;
    type: reqType;
}) {
    const [Name, setName] = useState("");
    const [suggestions, setSuggestions] = useState<group[] | teacher[] | room[]>([]);
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
                console.log(item)
                const u = JSON.parse(item)
                setName(u.name)
                setId(u.id)
            }
        });
    }, []);

    const handleInputChange = (text: string) => {
        setName(text);
        refetch();
        if (data) {
            const filteredSuggestions = (data as (group | teacher | room)[]).filter((item: group | teacher | room) => {
                if ("nameEt" in item) {
                    // Type guard for group
                    return item.nameEt?.toLowerCase().includes(text.toLowerCase());
                } else if ("name" in item) {
                    // Type guard for teacher
                    return item.name?.toLowerCase().includes(text.toLowerCase());
                }
                return false;
            });
            const limitedSuggestions = filteredSuggestions.slice(0, 5);
            setSuggestions(limitedSuggestions);
        }
    };

    const handleSuggestionClick = (suggestion: group | teacher | room) => {
        if ("nameEt" in suggestion) {
            setName(suggestion.nameEt ? suggestion.nameEt : suggestion.id.toString());
            setNameMain(suggestion.nameEt ? suggestion.nameEt : suggestion.id.toString());
        } else if ("name" in suggestion) {
            setName(suggestion.name ? suggestion.name : suggestion.id.toString());
            setNameMain(suggestion.name ? suggestion.name : suggestion.id.toString());
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
            {isLoading ? <Text>Loading</Text> : null}
            <ScrollView>
                {enableSuggestions &&
                    suggestions.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            onPress={() => handleSuggestionClick(item)}
                        >
                            <Box>
                                <Text>{"nameEt" in item ? item.nameEt : ("name" in item ? item.name : item.id.toString())}</Text>
                            </Box>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </Box>
    );
}
