import { map } from 'rxjs/operators';
import { Solicitud } from './../models/solicitud.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SalicitudService {

  solicitudesCollection: AngularFirestoreCollection<Solicitud>;
  solicitudDocumento: AngularFirestoreDocument<Solicitud>;
  solicitudes: Observable<Solicitud[]>;
  solicitud: Observable<Solicitud>;

  constructor(
    public db: AngularFirestore
  ) {

  }

  getSolicitudesByFechaAndSala(fecha: string, salaId: string): Observable<Solicitud[]> {
    this.solicitudesCollection = this.db.collection('solicitudes',ref => ref.where('fecha','==',fecha)
                                                                            .where('sala','==',salaId)
                                                                            .orderBy("inicio"));
    return this.solicitudes = this.solicitudesCollection.snapshotChanges().pipe(
      map ( cambios => {
        return cambios.map( accion => {
          const datos = accion.payload.doc.data() as Solicitud;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
  }

  addSolicitud(solicitud: Solicitud) {
    return this.solicitudesCollection.add(solicitud);
  }

  updateSolicitud(usuario: Solicitud, id: string) {
    return this.solicitudesCollection.doc(id).update(usuario);
  }

  deleteSolicitud(id: string) {
    return this.solicitudesCollection.doc(id);
  }



}
