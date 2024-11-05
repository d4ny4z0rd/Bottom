import { checkUser } from "@/lib/checkUser";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { GiPencil } from "react-icons/gi";
import { Button } from "./ui/button";

const Navbar = async () => {
	const user = await checkUser();

	return (
		<nav className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white text-black border">
			<div className="text-xl font-bold hover:text-gray-300 text-black cursor-pointer">
				<Link href={"/"}>Bottom</Link>
			</div>
			<div className="flex items-center space-x-4">
				<SignedOut>
					<SignInButton>
						<button className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition duration-200">
							Sign In
						</button>
					</SignInButton>
				</SignedOut>
				<SignedIn>
					<Link
						href={"/write"}
						className="text-black flex cursor-pointer hover:underline">
						<GiPencil className="m-1" />
						<p>Write</p>
					</Link>
					<Link
						href={`/user/${user?.clerkUserId}`}
						className="text-black flex cursor-pointer px-8 hover:underline">
						<p>Profile</p>
					</Link>
					<UserButton
						appearance={{
							elements: {
								userButtonAvatarBox: "w-8 h-8", // Adjust avatar size if needed
							},
						}}
					/>
				</SignedIn>
			</div>
		</nav>
	);
};

export default Navbar;
