import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsuarioService {
  usuariosCollection: AngularFirestoreCollection<Usuario>;
  usuarioDoc: AngularFirestoreDocument<Usuario>;
  usuarios: Observable<Usuario[]>;
  usuario: Observable<Usuario>;

  constructor (
    private db: AngularFirestore
  ){
    console.log("Entra a servicio de usuario");
    this.usuariosCollection = db.collection('usuarios',ref => ref.orderBy('nombre','asc'));
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(
      map ( cambios => {
        return cambios.map( accion => {
          const datos = accion.payload.doc.data() as Usuario;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    console.log("usuarios");
    console.log(this.usuarios);
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.usuarios;
  }

  getUsuario(id: string){
    console.log("busca usuario por id: "+id);
    return this.usuariosCollection.doc<Usuario>(id).valueChanges();
  }

  updateUsuario(usuario: Usuario, id: string) {
    return this.usuariosCollection.doc(id).update(usuario);
  }

  addUsuario(id: string,usuario: Usuario) {
    return this.usuariosCollection.doc(id).set(usuario);
  }

  removeUsuario(id: string) {
    return this.usuariosCollection.doc(id).delete();
  }

}
