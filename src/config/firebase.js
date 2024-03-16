import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3RCFWUOVnd7pl-WENL9Kh_H2XibXhau0",
  authDomain: "experiencia-multimedia-8-15d1d.firebaseapp.com",
  projectId: "experiencia-multimedia-88e11",
  storageBucket: "experiencia-multimedia-88e11.appspot.com",
  messagingSenderId: "500467868946",
  appId: "1:500467868946:web:d2724f4f9098a29a727fcb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFile(file, fileName, fileTpe) {
  try {
    const storageRef = ref(storage, `${fileTpe}/${fileName}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error al subir el documento:", error);
  }
}

export async function deleteFile(fileName, fileType) {
  const storageRef = ref(storage, `${fileType}/${fileName}`);
  try {
    await deleteObject(storageRef);
    return true;
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
    return false;
  }
}
