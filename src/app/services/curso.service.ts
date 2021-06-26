import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursosCollection: AngularFirestoreCollection<curso>;
  cursoDocumento: AngularFirestoreDocument<curso>;
  cursos: Observable<curso[]>;
  curso: Observable<curso>;

  constructor(
    private db: AngularFirestore
  ) {
    this.cursosCollection = db.collection('cursos',ref => ref.orderBy('nombre','asc'));
    this.cursos = this.cursosCollection.snapshotChanges().pipe(
      map ( cambios => {
        return cambios.map( accion => {
          const datos = accion.payload.doc.data() as curso;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
  }

  getCursos(): Observable<curso[]> {
    return this.cursos;
  }

  getCurso(id: string){
    return this.cursosCollection.doc<curso>(id).valueChanges();
  }

  updateCurso(sala: curso, id: string) {
    return this.cursosCollection.doc(id).update(sala);
  }

  addCurso(sala: curso) {
    return this.cursosCollection.add(sala);
  }
}
