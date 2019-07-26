import firebase from 'firebase/app'

import 'firebase/firestore'

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: 'ollert-fd497.firebaseapp.com',
  projectId: 'ollert-fd497'
})

const db = firebase.firestore()

export default db