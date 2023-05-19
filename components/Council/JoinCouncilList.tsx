import { collection } from "firebase/firestore";
import { observer } from "mobx-react-lite";
import { Box, Button, HStack, ScrollView, Text, useToast } from "native-base";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../Services/firebase/firebaseinit";
import { useEffect, useState } from "react";
import { council } from "../../entities/council";
import { requestBecomeCouncilMemeber } from "../../Services/firebase/queries/UserInfoQueries";

function JoinCouncilList() {
	const [councilList, setCouncilList] = useState<council[]>();
	const [value, loading, error] = useCollection(collection(db, "councils"));
    const toast = useToast();

	useEffect(() => {
		const decoded = value?.docs.map((doc) => {
			return doc.data() as council;
		});
		setCouncilList(decoded);
	}, [value]);
	return (
		<Box height={"100%"}>
			<ScrollView paddingX={"5px"}>
				{councilList?.map((councilData) => {
					return (
						<Box key={councilData.id} borderBottomColor={"black"} marginY={'5px'}>
							<HStack justifyContent={'space-between'}>
								<Text fontSize={"2xl"}>{councilData.title}</Text>
								<Button backgroundColor={"orange.500"} onPress={() => { 
                                    try { 
                                        requestBecomeCouncilMemeber(auth.currentUser?.uid, councilData.id)
                                    } catch (err) {
                                        let error = err as Error 
                                        toast.show({title: "Ошибка", description: error.message})
                                    }
                                    
                                }}>Вступить</Button>
							</HStack>
						</Box>
					);
				})}
			</ScrollView>
		</Box>
	);
}

export default observer(JoinCouncilList);
