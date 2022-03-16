import Image from "next/image";

export default function StoryCard({ name, src, profile }) {
	return (
		<div className="relative h-14 w-14 md:h-20 md:w-20 lg:h-56 lg:w-32 cursor-pointer overflow-x p-3 transition duration-200 transform ease-in hover:scale-105 hover:animate-pulse">
			<Image src={profile} width={40} height={40} layout="fixed" objectFit="cover" className="absolute opacity-0 lg:opacity-100 rounded-full z-50 top-10" />
			<Image src={src} layout="fill" className="object-cover filter brightness-75 rounded-full lg:rounded-3xl" />
			<p className="hidden lg:block absolute z-50 bottom-6 text-white text-md font-bold overflow-hidden whitespace-nowrap">{name.length < 12 ? name : name.substring(0, 11) + "..."}</p>
		</div>
	);
}
