import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";

export const checkUser = async () => {
	try {
		const user = await currentUser();

		//Check for current logged in Clerk user
		if (!user) {
			return null;
		}
		
		//Check if the user is already in the database
		const loggedInUser = await db.user.findUnique({
			where: {
				clerkUserId: user.id,
			},
		});

		if (loggedInUser) {
			return loggedInUser;
		}

		const newUser = await db.user.create({
			data: {
				clerkUserId: user.id,
				name: `${user.firstName} ${user.lastName}`,
				imageUrl: user.imageUrl,
				email: user.emailAddresses[0].emailAddress,
			},
		});

		return newUser;
	} catch (error) {
		console.log(error);
	}
};
