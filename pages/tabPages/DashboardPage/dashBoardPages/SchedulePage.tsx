import { Box, FlatList, HStack, Heading, VStack, Text, Accordion, ScrollView, Input } from "native-base";
import { useEffect, useState } from "react";
import { scheduleEvent } from "../../../../entities/scheduleEvent";
import { useQuery } from "@tanstack/react-query";
import getScheduleEvents from "../../../../Services/tahvelApi/getScheduleEvents";
import { getFirstDayOfWeek, getLastDayOfWeek } from "../../../../Services/Helpers/DateProcessing";
import getGroups from "../../../../Services/tahvelApi/getGroups";

export function SchedulePage() {
	const [schedule, setSchedule] = useState<scheduleEvent[]>();
	const [groupId, setGroupId] = useState<string>();
	const { isLoading, isError, data, error, refetch } = useQuery({
		queryKey: ["schedule", "lesson", "list"],
		queryFn: () => { 
            return getScheduleEvents(
				getFirstDayOfWeek(new Date()).toISOString(),
				getLastDayOfWeek(new Date()).toISOString(),
				groupId
			)
        }
			
	});
	return (
		<VStack>
			<Heading>Расписание</Heading>
			<GroupListSelection />
			<ScrollView horizontal={false} flex={1}>
				{/* {data?.map((item) => (
					<HStack>
						{item.nameEt}
						{item.date}
					</HStack>
				))} */}
			</ScrollView>
		</VStack>
	);
}

function GroupListSelection() {
	const [groupName, setGroupName] = useState("");
	const { isLoading, isError, data, error, refetch } = useQuery({
		queryKey: ["group", "list"],
		queryFn: async () => {
            return await getGroups()
        },
	});
    useEffect(() => { 
        (async () => { 
            try { 
                const groups = await getGroups("SPT"); 
                console.log(groups);
            } catch (err) { 
                console.log(err);
            }
            
        })()
    }, [])
	return (
		<Box>
			<Input
				focusOutlineColor={"green.500"}
				value={groupName}
				onChangeText={(text) => {
					setGroupName(text);
					refetch();
				}}
			/>
            {isLoading ? <Text>Loading</Text> : <></>}
			<ScrollView>
				{data?.map((item) => (
					<Box>
						<Text>{item.nameEt}</Text>
					</Box>
				))}
			</ScrollView>
		</Box>
	);
}
