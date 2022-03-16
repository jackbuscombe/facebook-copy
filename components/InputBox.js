import { useSession } from "next-auth/react";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from "firebase/storage";

export default function InputBox() {
	const { data: session } = useSession();
	const inputRef = useRef(null);
	const filepickerRef = useRef(null);
	const [imageToPost, setImageToPost] = useState(null);
	const [postImagePreview, setPostImagePreview] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(0);

	const sendPost = (e) => {
		e.preventDefault();

		if (!inputRef.current.value) return false;

		addDoc(collection(db, "posts"), {
			message: inputRef.current.value,
			name: session.user.name,
			email: session.user.email,
			image: session.user.image,
			timestamp: serverTimestamp(),
		}).then((docRef) => {
			if (imageToPost) {
				// Second param is the path of the file upload
				const storageRef = ref(storage, `posts/${imageToPost.name}`);
				const uploadTask = uploadBytesResumable(storageRef, imageToPost);

				uploadTask.on(
					"state_changed",
					(snapshot) => {
						const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
						setUploadProgress(prog);
					},
					(err) => console.log(err),
					() => {
						// When the upload completes
						getDownloadURL(uploadTask.snapshot.ref).then((url) => {
							setDoc(doc(db, "posts", docRef.id), { postImage: url }, { merge: true });
						});
					}
				);
				removeImage();
			}
		});

		inputRef.current.value = "";
	};

	const addImageToPost = (e) => {
		const file = e.target.files[0];
		setImageToPost(e.target.files[0]);

		const reader = new FileReader();
		if (file) {
			reader.readAsDataURL(file);
		}

		reader.onload = (readerEvent) => {
			setPostImagePreview(readerEvent.target.result);
		};
	};

	const removeImage = () => {
		setPostImagePreview(null);
		setImageToPost(null);
	};

	return (
		<div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
			<div className="flex space-x-4 p-4 items-center">
				<Image src={session.user.image} height={40} width={40} layout="fixed" className="rounded-full" />
				<form className="flex flex-1">
					<input type="text" ref={inputRef} placeholder={`What's on your mind, ${session.user.name}?`} className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none" />
					<button hidden type="submit" onClick={sendPost}>
						Submit
					</button>
				</form>

				{postImagePreview && (
					<div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
						<img className="h-10 object-contain" src={postImagePreview} alt="" />
						<p className="text-xs text-red-500 text-center">Remove</p>
					</div>
				)}
				{uploadProgress != 0 && uploadProgress != 100 && <h3>Uploaded {uploadProgress}%</h3>}
			</div>
			<div className="flex justify-evenly p-3 border-t">
				<div className="inputIcon">
					<VideoCameraIcon className="h-7 text-red-500" />
					<p className="text-xs sm:text-sm xl:text-base">Live Video</p>
				</div>

				<div onClick={() => filepickerRef.current.click()} className="inputIcon">
					<CameraIcon className="h-7 text-green-400" />
					<p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
					<input ref={filepickerRef} onChange={addImageToPost} type="file" hidden />
				</div>

				<div className="inputIcon">
					<EmojiHappyIcon className="h-7 text-yellow-300" />
					<p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
				</div>
			</div>
		</div>
	);
}
