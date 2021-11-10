import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

//Observable
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = environment.urlApi;

  constructor(
    private http: HttpClient
  ) { }

  get apiListAllPokemons():Observable<any>{
    return this.http.get<any>(this.url).pipe(
      tap( res => res ),
      tap( res => {
        res.results.map( (resPokemons: any) => {

          this.apiGetPokemon(resPokemons.url).subscribe(
            res => resPokemons.status = res
          );

        })
      })
    )
  }

  public apiGetPokemon( url: string ):Observable<any>{
    return this.http.get<any>( url ).pipe(
      map(
        res => res
      )
    )
  }
}
