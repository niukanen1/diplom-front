import { doc } from "firebase/firestore";
import { ScrollView, Text } from "native-base";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../Services/firebase/firebaseinit";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { council, message } from "../../entities/council";
import SingleMessageView from "./SingleMessageView";

export default function MessagesList({adminCouncilUid}:{adminCouncilUid: string}) {
    const [value, laoding, error] = useDocument(doc(db, "councils", adminCouncilUid)); 
	const height = Dimensions.get("screen").height;
    const [messages, setMessages] = useState<message[]>();
	useEffect(() => {
		const councilData = value?.data() as council;
		const messages = councilData?.messages;
		setMessages(messages);
	}, [value]);

    return ( 
        <ScrollView>
            {messages?.map(message => ( 
                <SingleMessageView key={message.id} message={message}/>
            ))}

        </ScrollView>
    )
}
