import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

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

  async clearAllData(): Promise<void> {
    const collRef = collection(this.firestore, 'items');
    const snapshot = await getDocs(collRef);
    const deletePromises = snapshot.docs.map((docSnap) =>
      deleteDoc(doc(this.firestore, `items/${docSnap.id}`))
    );
    await Promise.all(deletePromises);
  }
}
