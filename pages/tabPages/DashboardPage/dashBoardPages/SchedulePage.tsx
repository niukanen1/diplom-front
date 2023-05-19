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

export function SchedulePage() {
    const [schedule, setSchedule] = useState<SortedEvents>({});
    const [groupId, setGroupId] = useState<string>();
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ["schedule", "lesson", "list"],
        queryFn: () => {
            if (groupId) {
                return getScheduleEvents(
                    getFirstDayOfWeek(new Date()).toISOString(),
                    getLastDayOfWeek(new Date()).toISOString(),
                    groupId
                );
            }
            return Promise.resolve([]);
        },
        enabled: Boolean(groupId),
    });

    useEffect(() => {
        refetch();
    }, [groupId]);

    useEffect(() => {
        setSchedule(sortEventsByDate(data));
        console.log(schedule);
    }, [data]);
    return (
        <VStack >
            <Heading>Расписание</Heading>
            <GroupListSelection setGroupId={setGroupId} />
            <ScrollView horizontal={false} flex={1}>
                {schedule ? (
                    Object.keys(schedule)
                        .sort((a, b) => {
                            return (
                                new Date(a).getTime() - new Date(b).getTime()
                            );
                        })
                        .map((key) => {
                            console.log(schedule);
                            return (
                                <Box key={key}>
                                    <Heading>{getDayOfWeek(key)}</Heading>
                                    {schedule[key].map((event) => (
                                        <Box
                                            key={event.id}
                                            bg="rgba(29, 134, 80, 0.26)"
                                            borderRadius={6}
                                            marginBottom={"10px"}
                                            padding={"10px"}
                                        >
                                            <Text>
                                                {event.rooms
                                                    .map((room) =>
                                                        room.roomCode
                                                            ? `${room.buildingCode} ${room.roomCode}`
                                                            : event.addInfo
                                                    )
                                                    .join("")}
                                            </Text>

                                            <Text>{event.nameEt}</Text>
                                            
                                            <Text>
                                                {event.teachers
                                                    .map((teacher) =>
                                                        teacher.name
                                                            ? teacher.name
                                                            : "-"
                                                    )
                                                    .join("")}
                                            </Text>
                                            <Text>
                                                {event.timeStart} -{" "}
                                                {event.timeEnd}
                                            </Text>
                                        </Box>
                                    ))}
                                </Box>
                            );
                        })
                ) : (
                    <Text>Loading</Text>
                )}
            </ScrollView>
        </VStack>
    );
}
function GroupListSelection({
    setGroupId,
}: {
    setGroupId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
    const [groupName, setGroupName] = useState("");
    const [suggestions, setSuggestions] = useState<group[]>([]);
    const [enableSuggestions, setEnableSuggestions] = useState(true); // Флаг для включения/отключения предложений
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ["group", "list"],
        queryFn: async () => {
            return await getGroups();
        },
    });

    const handleInputChange = (text: string) => {
        setGroupName(text);
        refetch();
        if (data) {
            const filteredSuggestions = data.filter((item) =>
                item.nameEt.toLowerCase().includes(text.toLowerCase())
            );
            const limitedSuggestions = filteredSuggestions.slice(0, 5);
            setSuggestions(limitedSuggestions);
        }
    };

    const handleSuggestionClick = (suggestion: group) => {
        setGroupName(suggestion.nameEt);
        setEnableSuggestions(false); // Отключаем предложения после выбора
        setGroupId(suggestion.id.toString());
    };

    const handleInputFocus = () => {
        setEnableSuggestions(true); // Включаем предложения при фокусе на Input
    };

    return (
        <Box>
            <Input
                focusOutlineColor={"green.500"}
                value={groupName}
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
                                <Text>{item.nameEt}</Text>
                            </Box>
                        </TouchableOpacity>
                    ))}
            </ScrollView>
        </Box>
    );
}
