import { observer } from "mobx-react-lite";
import { Box, Button, Flex, FormControl, Input, Toast } from "native-base";
import { useState } from "react";
import { createCouncil } from "../../Services/firebase/queries/CouncilQueries";
import AppStore from "../../Stores/AppStore";
import { auth } from "../../Services/firebase/firebaseinit";

function CouncilAdminEditingModal({closeModal} : {closeModal: () => void}) {
	const [councilName, setCouncilName] = useState("");

	return (
		<Box height={"100%"} padding={"10px"} flexDirection={"column"} justifyContent={"space-between"}>
			<FormControl>
				<Input
					focusOutlineColor={"orange.500"}
                    color={'black'}
                    colorScheme={'black'}
                    _focus={{backgroundColor: 'orange.100'}}
					size={"xl"}
					placeholder='Введите название совета'
					value={councilName}
                    onChangeText={(text) => { 
                      setCouncilName(text)  
                    }}
				/>
			</FormControl>
			<Button
				backgroundColor={"orange.500"}
				borderRadius={20}
				onPress={async () => {
					try {
						createCouncil(councilName, auth.currentUser?.uid);
					} catch (err) {
						let error = err as Error;
						Toast.show({ variant: "subtle", description: error.message, title: "Что-то пошло не так" });
					} finally { 
                        closeModal()
                        setCouncilName("")
                    }
				}}>
				Создать
			</Button>
		</Box>
	);
}

export default observer(CouncilAdminEditingModal);
