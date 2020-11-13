import db from '../db/firestore';
import firebase from 'firebase/app';

const extractSnapshotFunction = snapshop => 
  snapshop.docs.map(doc => ({id: doc.id, ...doc.data()}))

export const fetchChats = () =>
  db
    .collection('chats')
    .get()
    .then(extractSnapshotFunction)

export const createChat = chat => 
  db  
    .collection('chats')
    .add(chat)
    .then(docRef => docRef.id)

export const joinChat = async (userId, chatId) => {
  const userRef = db.doc(`profiles/${userId}`)
  const chatRef = db.doc(`chats/${chatId}`)

  await userRef.update({joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef)})
  await chatRef.update({joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef)})
}

export const subscribeToChat = (chatId, onSubscribe) => 
  db
    .collection('chats')
    .doc(chatId)
    .onSnapshot(snapshop => {
      const chat = { id: snapshop.id, ...snapshop.data()}
      onSubscribe(chat)
    })

export const subscribeToProfile = (uid, onSubscribe) => 
  db
    .collection('profiles')
    .doc(uid)
    .onSnapshot(snapshop => onSubscribe(snapshop.data()))

export const sendChatMessage = (message, chatId) => 
  db 
    .collection('chats')
    .doc(chatId)
    .collection('messages')
    .doc(message.timestamp)
    .set(message)

export const subscribeToMessages = (chatId, onSubscribe) => 
  db
    .collection('chats')
    .doc(chatId)
    .collection('messages') 
    .onSnapshot(snapshop => onSubscribe(snapshop.docChanges()))