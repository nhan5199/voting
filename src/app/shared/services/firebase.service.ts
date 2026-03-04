import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  updateDoc, getDoc, setDoc,
  getDocs,
  docData,
  writeBatch,
  increment,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  getVote(option: number) {
  const docRef = doc(this.firestore, `items/option${option}`);
  return docData(docRef, { idField: 'id' });
}

async hasUserVoted(userId: string): Promise<any | null> {
  const voteRef = doc(this.firestore, `votes/${userId}`);
  const snapshot = await getDoc(voteRef);

  return snapshot.exists() ? snapshot.data() : null;
}

async clearAllData(): Promise<void> {

  // 1️⃣ Reset vote counters
  await updateDoc(doc(this.firestore, 'items/option1'), { votes: 0 });
  await updateDoc(doc(this.firestore, 'items/option2'), { votes: 0 });
  await updateDoc(doc(this.firestore, 'items/option3'), { votes: 0 });

  // 2️⃣ Delete all user votes
  const votesRef = collection(this.firestore, 'votes');
  const snapshot = await getDocs(votesRef);

  const deletePromises = snapshot.docs.map(d =>
    deleteDoc(doc(this.firestore, `votes/${d.id}`))
  );

  await Promise.all(deletePromises);

  console.log('All votes reset successfully ✅');
}

  getData(collectionName : string): Observable<any[]> {
    const coll = collection(this.firestore, collectionName); // This is the correct modular way
    return collectionData(coll, { idField: 'id' }) as Observable<any[]>;
  }

  addData(data: any, collectionName : string) {
    const coll = collection(this.firestore, collectionName);
    return addDoc(coll, data);
  }

  deleteData(id: string, collectionName : string) {
    const docRef = doc(this.firestore, `${collectionName}/${id}`);
    return deleteDoc(docRef);
  }

  // async clearAllData(): Promise<void> {
  //   const collRef = collection(this.firestore, 'items');
  //   const snapshot = await getDocs(collRef);
  //   const deletePromises = snapshot.docs.map((docSnap) =>
  //     deleteDoc(doc(this.firestore, `items/${docSnap.id}`))
  //   );
  //   await Promise.all(deletePromises);
  // }
  
  async seedVotingData(): Promise<void> {
  const itemsRef = collection(this.firestore, 'items');

  const createBatch = async (
    count: number,
    name: string,
    option: number
  ) => {
    let batch = writeBatch(this.firestore);
    let operationCount = 0;

    for (let i = 0; i < count; i++) {
      const newDocRef = doc(itemsRef);

      batch.set(newDocRef, {
        itemId: name,
        performanceName: name,
        teamName: name,
        option: option,
        userId: 'system_seed'
      });

      operationCount++;

      // Firestore limit = 500 operations per batch
      if (operationCount === 500) {
        await batch.commit();
        batch = writeBatch(this.firestore);
        operationCount = 0;
      }
    }

    if (operationCount > 0) {
      await batch.commit();
    }
  };

  await createBatch(400, 'Tiết mục 1', 1);
  await createBatch(300, 'Tiết mục 2', 2);
  await createBatch(100, 'Tiết mục 3', 3);

  console.log('Seeded 800 documents successfully ✅');
}

async vote(userId: string, option: number) {
  const voteRef = doc(this.firestore, `votes/${userId}`);
  const itemRef = doc(this.firestore, `items/option${option}`);

  // 1️⃣ Check if user already voted
  const voteSnap = await getDoc(voteRef);

  if (voteSnap.exists()) {
    throw new Error('User already voted');
  }

  // 2️⃣ Create vote record
  await setDoc(voteRef, {
    option,
    createdAt: new Date()
  });

  // 3️⃣ Increment counter
  await updateDoc(itemRef, {
    votes: increment(1)
  });
}
}
