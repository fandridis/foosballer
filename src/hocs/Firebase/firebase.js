import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

console.log('Initializing firebase');

/** Firebase Management. */
class Firebase {
  constructor() {
    console.log('Firebase constructor');
    firebase.initializeApp(config);

    this.firestore = {
      users: null,
      players: null,
      tournaments: null,
      games: null
    }

    // Initialize Authentication through Firebase
    this.auth = firebase.auth();

    // Initialize Cloud Firestore through Firebase
    this.db = firebase.firestore();

    // Disable deprecated features of Firestore
    this.db.settings({ timestampsInSnapshots: true });

    // References
    this.usersRef = this.db.collection("users");
  }

  doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

  doLogout = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  createUser = user => this.db.collection('users').doc(user.uid).set({ ...user });

  getUser = userId =>  this.db.collection('users').doc(userId).get();

  /**
   * Get the available players of the user.
   * @method
   * @param {string} userId - The user uid
   * @param {string} playerName - The new players name
   * 
   * @returns A promise that resolves to the docRef or an error message
   */
  getPlayers = (userRef) => { 
    if (!userRef) { return Promise.reject('missing params') }

    console.log('Getting the players');

    return this.db.collection("players").where("userRef", "==", userRef).orderBy('name').get()
  }

  /**
   * Add a new player to the users available players.
   * @method
   * @param {string} userId - The user uid
   * @param {string} playerName - The new players name
   * @param {string} rating - OPTIONAL (default = 1000) The new players rating
   * 
   * @returns A promise that resolves to the docRef or an error message
   */
  createPlayer = (userRef, name, rating = 1000) => { 
    if (!userRef || !name) { return Promise.reject('missing params') }

    return this.db.collection("players").add({ userRef, name, rating });
  }

  /**
   * Remove a player from the users available players.
   * @method
   * @param {string} playerId - The player uid to be removed
   * 
   * @returns A promise that resolves too a success or error message
   */
  removePlayer = (playerId) => {
    if (!playerId) { return Promise.reject('missing params') }

    return this.db.collection("players").doc(playerId).delete();
  }

}

export default Firebase;

