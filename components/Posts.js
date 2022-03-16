import { query, orderBy, getDocs, getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, app } from "../firebase";
import Post from "./Post";

export default function Posts({ posts }) {
	const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

	const [realtimePosts] = useCollection(q, {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	return (
		<div>
			{realtimePosts
				? realtimePosts?.docs.map((post) => {
						return <Post key={post.id} name={post.data().name} message={post.data().message} email={post.data().email} timestamp={post.data().timestamp} image={post.data().image} postImage={post.data().postImage} />;
				  })
				: posts.map((post) => <Post key={post.id} name={post.name} message={post.message} email={post.email} timestamp={post.timestamp} image={post.image} postImage={post.postImage} />)}
		</div>
	);
}
