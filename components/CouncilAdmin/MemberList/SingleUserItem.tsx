import { doc } from "firebase/firestore";
import { Badge, Box, HStack, Heading, Spinner, Tag, Text, VStack, useToast } from "native-base";
import { useState, useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../../Services/firebase/firebaseinit";
import { user } from "../../../entities/user";
import { councilMember, status } from "../../../entities/council";

export default function SingleUserItem({
	userUid,
	councilMemberData,
}: {
	userUid: string;
	councilMemberData: councilMember;
}) {
	const [userData, setUserData] = useState<user>();
	const [value, loading, error] = useDocument(doc(db, "users", userUid));
	const toast = useToast();
	useEffect(() => {
		setUserData(value?.data() as user);
	}, [value]);
	if (loading) return <Spinner size={50} color={"orange.500"} />;
	return (
		<Box marginY={'5px'}>
			<HStack justifyContent={'space-between'}>
				<VStack>
					<Text>{userData?.name}</Text>
					<Text>{userData?.email}</Text>
				</VStack>
				<Badge colorScheme={councilMemberData.status == status.activated ? "success" : "error"}>
					{councilMemberData.status}
				</Badge>
			</HStack>
		</Box>
	);
}
