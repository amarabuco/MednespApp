import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

@Injectable()
export class SqliteHelperService {

  private db: SQLiteObject;

  constructor(
    public sqlite: SQLite,
    public platform: Platform
  ) {

  }

  private createDatabase(dbName?: string): Promise<SQLiteObject>{
    return this.platform.ready()
    .then((readySource: string) => {
      console.log(readySource);
      
      //após o ready do cordova chama o banco
      return this.sqlite.create({
        //se não passar nome do banco fica dyn...
        name: dbName || 'mednesp.db', 
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          return this.db;
        })
        .catch((error: Error )=>{
          console.log(error);
          return Promise.reject(error.message || error);
        })
      });
      
  }

  getDb(dbName?: string, newOpen?: boolean): Promise<SQLiteObject>{
    if(newOpen) return this.createDatabase(dbName);
    return (this.db) ? Promise.resolve(this.db) : this.createDatabase(dbName);
  }

}
