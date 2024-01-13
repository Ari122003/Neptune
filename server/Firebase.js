import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";




const firebaseConfig = {
	apiKey: "AIzaSyCEF7LbmAtwuHYKNjdjPNMNZ2SeSHnaUGo",
	authDomain: "neptune-afe1c.firebaseapp.com",
	projectId: "neptune-afe1c",
	storageBucket: "neptune-afe1c.appspot.com",
	messagingSenderId: "880361583353",
	appId: "1:880361583353:web:c018f756a9175bb8a3a828",
	measurementId: "G-B7WC9VS0F7",
};

const app = initializeApp(firebaseConfig);
const auth= getAuth(app)

export default auth