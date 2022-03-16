import { DotsCircleHorizontalIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import Contact from "./Contact";

const contacts = [
	{
		name: "Harry Potter",
		src: "https://links.papareact.com/d0c",
	},
	{
		name: "James Bond",
		src: "https://links.papareact.com/r57",
	},
	{
		name: "Bill Gates",
		src: "https://links.papareact.com/zvy",
	},
	{
		name: "Jeff Bezos",
		src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSVvdf3mtAr8BQaBqwu2wAFbJD1dH6jtmyAK7hZRRnbFc0yc_pT",
	},
	{
		name: "Mark Zuckerberg",
		src: "https://links.papareact.com/snf",
	},
	{
		name: "The Queen",
		src: "https://links.papareact.com/6gg",
	},
	{
		name: "Elon Musk",
		src: "https://links.papareact.com/kxk",
	},
];

export default function Widgets() {
	return (
		<div className="hidden lg:flex flex-col w-60 p-2 mt-5">
			<div className="flex justify-between text-gray-500 mb-5">
				<h2 className="text-xl">Contacts</h2>
				<div className="flex space-x-2">
					<VideoCameraIcon className="h-6" />
					<SearchIcon className="h-6" />
					<DotsCircleHorizontalIcon className="h-6" />
				</div>
			</div>

			{contacts.map((contact) => (
				<Contact key={contact.name} name={contact.name} src={contact.src} />
			))}
		</div>
	);
}
