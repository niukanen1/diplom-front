import { observer } from "mobx-react-lite";
import { Box, Input, TextArea, VStack, Button, KeyboardAvoidingView, useToast } from "native-base";
import { useState } from "react";
import { Keyboard, Pressable } from "react-native";
import { UploadCouncilMessage } from "../../../Services/firebase/queries/CouncilQueries";
import { auth } from "../../../Services/firebase/firebaseinit";
import { Timestamp } from "firebase/firestore";

function CreateNewMessageModal({close}: {close: () => void}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const toast = useToast();
	return (
		<KeyboardAvoidingView>
			<VStack padding={"10px"} space={"10px"}>
				<Input
					size={"xl"}
					colorScheme={"success"}
					placeholder='Заголовок'
					value={title}
					onChangeText={(text) => {
						setTitle(text);
					}}
				/>
				<TextArea h={20} placeholder='Сообщение' autoCompleteType={undefined} onChangeText={text => { 
                    setDescription(text);
                }}/>
				<Button
					bgColor={"orange.500"}
					borderRadius={20}
					onPress={async () => {
						try {
							if (auth.currentUser?.uid) {
								await UploadCouncilMessage(auth.currentUser.uid, {
									id: Date.now().toString(),
									title: title,
									description: description,
									date: Timestamp.fromDate(new Date()),
								});
							} else {
								throw new Error("Не распознан идентификатор пользователя");
							}
						} catch (err) {
							let error = err as Error;
							toast.show({ title: "Ошибка", description: error.message, colorScheme: "error" });
						} finally { 
                            close(); 
                        }
					}}>
					Отправить
				</Button>
			</VStack>
		</KeyboardAvoidingView>
	);
}

export default observer(CreateNewMessageModal);
