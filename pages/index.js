import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import { collection, doc, setDoc, getDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db, app } from "../firebase";

export default function Home({ posts }) {
	const { data: session } = useSession();
	if (!session) {
		return <Login />;
	}

	return (
		<div className="h-screen bg-gray-100 overflow-hidden">
			<Head>
				<title>Facebook</title>
			</Head>

			<Header />

			<main className="flex">
				<Sidebar />
				<Feed posts={posts} />
				<Widgets />
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

	const querySnapshot = await getDocs(q);
	const docs = querySnapshot.docs.map((post) => ({
		id: post.id,
		...post.data(),
		timestamp: null,
	}));

	return {
		props: {
			session: await getSession(context),
			posts: docs,
		},
	};
}
