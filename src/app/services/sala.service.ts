import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Sala } from './../models/sala.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  salasCollection: AngularFirestoreCollection<Sala>;
  salaDocumento: AngularFirestoreDocument<Sala>;
  salas: Observable<Sala[]>;
  sala: Observable<Sala>;

  constructor(
    private db: AngularFirestore
  ) {
    this.salasCollection = db.collection('salas',ref => ref.orderBy('nombre','asc'));
    this.salas = this.salasCollection.snapshotChanges().pipe(
      map ( cambios => {
        return cambios.map( accion => {
          const datos = accion.payload.doc.data() as Sala;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
   }

  getSalas(): Observable<Sala[]> {
    return this.salas;
  }

  getSala(id: string){
    return this.salasCollection.doc<Sala>(id).valueChanges();
  }

  updateSala(sala: Sala, id: string) {
    return this.salasCollection.doc(id).update(sala);
  }

  addSala(sala: Sala) {
    return this.salasCollection.add(sala);
  }
}
