import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SqliteHelperService } from './../sqlite-helper/sqlite-helper.service';
import { Palestrante } from './../../models/palestrante.model';


@Injectable()
export class PalestranteService {

  private db: SQLiteObject;
  private  isFirstCall: boolean = true;

  constructor(
    //public http: HttpClient,
    public SQLite: SQLite,
    public SQLiteObject: SQLiteObject,
    public palestrante: Palestrante,
    public sqliteHelperService:  SqliteHelperService
  ) {
    console.log('Hello PalestranteProvider Provider');
  }

  private getDb(): Promise<SQLiteObject>{
    if(this.isFirstCall){
      
      this.isFirstCall = false;

      return this.sqliteHelperService.getDb('cinema')
      .then((db: SQLiteObject) => {
        this.db = db;

        this.db.executeSql('CREATE TABLE IF NOT EXISTS palestrante (id INTERGER PRIMARY KEY AUTOINCREMENT, nome TEXT, origem TEXT, profissao TEXT, mail TEXT, site TEXT, youtube TEXT, facebook TEXT, twitter TEXT, bio TEXT, imagem TEXT )',{})
        .then(success => {console.log('palestrante table created.')})
        .catch((error: Error) => console.log('erro', error));

        return this.db;
      }); 
    }
    return this.sqliteHelperService.getDb();
  }

    getAll(orderBy?: string): Promise<Palestrante[]>{
      return this.getDb()
      .then((db: SQLiteObject) => {
          
          return <Promise<Palestrante[]>>this.db.executeSql(`SELECT * FROM palestrante ORDER BY id ${orderBy || 'DESC'}`, {})
          .then(function(resultSet) {

            let list: Palestrante[] = [];

            for( let i of resultSet){
              list.push(i.rows[0]);
            }

            return list;
          }).catch(function(error: Error) {console.log(error); })
        });
    }

    create(palestrante: Palestrante): Promise<Palestrante>{
      return this.db.executeSql('INSERT INTO palestante (nome, origem, profissao, mail, site, youtube, facebook, twitter, bio, imagem) VALUES(?,?,?,?,?,?,?,?,?,?)', [palestrante.nome, palestrante.origem, palestrante.profissao, palestrante.mail, palestrante.site, palestrante.youtube, palestrante.facebook, palestrante.twitter, palestrante.bio,palestrante.imagem])
      .then((resultSet) => {
        palestrante.id = resultSet.id;
        return palestrante;
      })
      .catch((error: Error )=>{
        console.log(error);
        return Promise.reject(error.message || error);
      })
    }

    update(palestrante: Palestrante): Promise<boolean>{
      return this.db.executeSql('UPDATE palestrante set nome=?, origem=?, profissao=?, mail=?, site=?, youtube=?, facebook=?, twitter=?, bio=?,imagem=?',[palestrante.nome, palestrante.origem, palestrante.profissao, palestrante.mail, palestrante.site, palestrante.youtube, palestrante.facebook, palestrante.twitter, palestrante.bio,palestrante.imagem])
      .then((result => result.rowsAffected >= 0))
      .catch((error: Error )=>{
        console.log(error);
        return Promise.reject(error.message || error);
      })
    }

    delete(id: number): Promise<boolean>{
      return this.db.executeSql('DELETE palestrante WHERE id=?',[id])
      .then((result => result.rowsAffected > 0))
      .catch((error: Error )=>{
        console.log(error);
        return Promise.reject(error.message || error);
      })
    }

    getById(id:number): Promise<Palestrante>{
      return this.db.executeSql('SELECT * FROM palestrante WHERE id=?',[id])
      .then((result) => result.rows.item(0))
      .catch((error: Error )=>{
        console.log(error);
        return Promise.reject(error.message || error);
      })
    }


}
