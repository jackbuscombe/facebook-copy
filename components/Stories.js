import StoryCard from "./StoryCard";
import { useSession } from "next-auth/react";

const stories = [
	{
		name: "Elon Musk",
		src: "https://links.papareact.com/4zn",
		profile: "https://links.papareact.com/kxk",
	},
	{
		name: "Jeff Bezos",
		src: "https://links.papareact.com/k2j",
		profile: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVvdf3mtAr8BQaBqwu2wAFbJD1dH6jtmyAK7hZRRnbFc0yc_pT",
	},
	{
		name: "Mark Zuckerberg",
		src: "https://links.papareact.com/xql",
		profile: "https://links.papareact.com/snf",
	},
	{
		name: "Bill Gates",
		src: "https://links.papareact.com/4u4",
		profile: "https://links.papareact.com/zvy",
	},
];

export default function Stories() {
	const { data: session } = useSession();
	return (
		<div className="flex justify-center space-x-3 mx-auto">
			<StoryCard name={session.user.name} src="https://links.papareact.com/d0c" profile={session.user.image} />

			{stories.map((story) => (
				<StoryCard key={story.src} name={story.name} src={story.src} profile={story.profile} />
			))}
		</div>
	);
}
