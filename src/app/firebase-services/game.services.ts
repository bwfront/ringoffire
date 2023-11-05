// game.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from '@angular/fire/firestore';
import { Game } from 'src/models/game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game: Game;
  constructor(private firestore: Firestore) {}

  // Referenz zur 'games'-Kollektion in Firestore
  private getGameRef() {
    return collection(this.firestore, 'games');
  }

  // Ein neues Spiel zu Firestore hinzufügen
  public async addNewGame(): Promise<string> {
    this.game = new Game();
    try {
      const docRef = await addDoc(this.getGameRef(), this.game.toJson());
      return docRef.id;
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  // Ein Spiel in Firestore abonnieren
  public subscribeToGame(
    docId: string,
    callback: (game: Game) => void
  ): () => void {
    const docRef = doc(this.firestore, 'games', docId);

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const gameData = doc.data() as Game;
        callback(gameData);
      } else {
        console.log('No such document!');
      }
    });

    return unsubscribe;
  }

  // Spielinformationen aktualisieren
  public async updateGame(
    docId: string,
    gameData: Partial<Game>
  ): Promise<void> {
    const docRef = doc(this.firestore, 'games', docId);
    try {
      await updateDoc(docRef, gameData);
    } catch (e) {
      console.error('Error updating document: ', e);
    }
  }
}
