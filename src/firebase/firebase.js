import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "demo-protcombat",
  authDomain: "protcombat.firebaseapp.com",
  projectId: "protcombat",
  storageBucket: "protcombat.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);
export default app;
