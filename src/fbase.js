// 절대 경로는 파일 이름과 npm install로 설치한 패키지 이름이
// 파일 이름과 같으면 오류가 발생, firebase->fbase로 변경
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
}

firebase.initializeApp(firebaseConfig)

export const firebaseInstance = firebase
export const authService = firebase.auth()
export const dbService = firebase.firestore()
export const storageService = firebase.storage()
