import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyD8G2yZy96sh6qQt97zTlh_W-QCE_w05YU",
	authDomain: "facebook-copy-8db78.firebaseapp.com",
	projectId: "facebook-copy-8db78",
	storageBucket: "facebook-copy-8db78.appspot.com",
	messagingSenderId: "419680084372",
	appId: "1:419680084372:web:2eaf0665dd476ab54daf81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, app };
