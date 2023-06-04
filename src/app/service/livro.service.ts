import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class LivroService {
    private readonly API_BASE_URL: string = environment.NG_API_LIVRO_BASE_URL;

    constructor(private http: HttpClient) {}

    buscar(query: string): Observable<any> {
        const params: HttpParams = new HttpParams().append("q", query);
        return this.http.get(this.API_BASE_URL, { params });
    }
}
