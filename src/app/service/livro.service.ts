import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, map } from "rxjs";
import { environment } from "src/environments/environment";
import { Item, LivrosResultado } from "../models/interfaces";

@Injectable({
    providedIn: "root",
})
export class LivroService {
    private readonly API_BASE_URL: string = environment.NG_API_LIVRO_BASE_URL;

    constructor(private http: HttpClient) {}

    buscar(query: string): Observable<Item[]> {
        const params: HttpParams = new HttpParams().append("q", query);
        return this.http.get<LivrosResultado>(this.API_BASE_URL, { params }).pipe(
            //tap((response) => console.log("Fluxo do tap: ", response)),
            map((response) => response.items),
            //tap((response) => console.log("Fluxo após o map: ", response)),
        );
    }
}
