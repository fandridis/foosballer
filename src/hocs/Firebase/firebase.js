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
   * @param {string} userId - The user uid
   * @param {string} playerName - The new players name
   * 
   * @returns A promise that resolves to the docRef or an error message
   */
  getPlayers = (userRef) => { 
    if (!userRef) { return Promise.reject('missing params') }

    return this.db
      .collection("players")
      .where("userRef", "==", userRef)
      .orderBy('name').get()
  }

  /**
   * Add a new player to the users available players.
   * @param {string} userId - The user uid
   * @param {object} player - The new player to save
   * 
   * @returns A promise that resolves to the docRef or an error message
   */
  createPlayer = (player) => { 
    if (!player.userRef || !player.name || !player.avatarUrl) { return Promise.reject('missing params') }

    return this.db.collection("players").add(player);
  }

  /**
   * Edit an existing player.
   * @param {string} userId - The user uid
   * @param {string} player - The edited player to update
   * 
   * @returns A promise that resolves to the docRef or an error message
   */
  updatePlayer = (playerId, player) => { 
    if ( !playerId || !player.name || !player.avatarUrl) { return Promise.reject('missing params') }

    return this.db.collection("players").doc(playerId).update({
      name: player.name,
      avatarUrl: player.avatarUrl
    });
  }

  updatePlayerObj = (playerId, player) => { 
    if ( !playerId || !player) { return Promise.reject('missing params') }

    console.log('new player to update: ', player);

    return this.db.collection("players").doc(playerId).update(player);
  }

  updatePlayerStats = (playerUpdate) => {
    if (!playerUpdate) { return; }

    this.db.collection("players").doc(playerUpdate.playerId).update({
      ratings: playerUpdate.ratings,
      wins: playerUpdate.wins,
      losses: playerUpdate.losses
    });
  }

  // TODO: Delete me when done testing
  resetTestPlayers = () => {
    const testPlayers = ['38n8D0jjeQ6rqkl0y4Qi', '7hEBS3vkn7toyIAmewWA', 'J2s3dI7cZjF24rdBof7r', 'Q6BR4aqYpnU7dydsvpl7', 'ZRLSgMMB77Ip0KUzXBKO', 'w0AxyaPjV0W2rRUeOvQE'];

    for (let playerId of testPlayers) {
      this.db.collection("players").doc(playerId).update({
        ratings: { doubles: 1000, singles: 1000 },
        wins: { doubles: 0, singles: 0 },
        losses: { doubles: 0, singles: 0 },
        longestStreaks: { doubles: 0, singles: 0 }
      });
    }
  }

  /**
   * Remove a player from the users available players.
   * @param {string} playerId - The player uid to be removed
   * 
   * @returns A promise that resolves too a success or error message
   */
  removePlayer = (playerId) => {
    if (!playerId) { return Promise.reject('missing params') }

    return this.db.collection("players").doc(playerId).delete();
  }

  /**
   * Get the available players of the user.
   * @param {string} userId - The user uid
   * @param {string} playerName - The new players name
   * 
   * @returns A promise that resolves to the docRef or an error message
   */
  getTournaments = (userRef) => { 
    if (!userRef) { return Promise.reject('missing params') }

    return this.db
      .collection("tournaments")
      .where("userRef", "==", userRef)
      .orderBy('createdAt', 'desc').get()
  }

  /**
   * Add a new player to the users available players.
   * @param {string} userId - The user uid
   * @param {object} player - The new player to save
   * 
   * @returns A promise that resolves to the docRef or an error message
   */
  createTournament = (tournament) => { 
    if (!tournament.userRef || !tournament.name || !tournament.createdAt) { return Promise.reject('missing params') }

    return this.db.collection("tournaments").add(tournament);
  }

  updateTournamentObj = (tournamentId, tournament) => { 
    if ( !tournamentId || !tournament) { return Promise.reject('missing params') }

    return this.db.collection("tournaments").doc(tournamentId).update(tournament);
  }

  removeTournament = (tournamentId) => {
    if (!tournamentId) { return Promise.reject('missing params') }

    return this.db.collection("tournaments").doc(tournamentId).delete();
  }

  

}

export default Firebase;




/**
 * Example of database listener
 */
// subscribeToPlayersCollection() {
//   const playersListener = this.props.firebase.db.collection("players")
//   .where("userRef", "==", this.props.isAuthenticated)
//   .orderBy('name')
//   .onSnapshot((querySnapshot) => {
//     let players = [];
//     querySnapshot.forEach((doc) => {
//         players.push( { ...doc.data(), uid: doc.id });
//     });
//     this.setState({ players });
//   });
//   this.setState({ playersListener });
// }