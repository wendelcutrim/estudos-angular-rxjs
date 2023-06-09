import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
    Observable,
    switchMap,
    map,
    tap,
    filter,
    debounceTime,
    distinctUntilChanged,
    catchError,
    throwError,
    Subscription,
    of,
} from "rxjs";
import { LivroVolumeInfo } from "src/app/models/LivroVolumeInfo";
import { Item, LivrosResultado } from "src/app/models/interfaces";
import { LivroService } from "src/app/service/livro.service";

@Component({
    selector: "app-lista-livros",
    templateUrl: "./lista-livros.component.html",
    styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent {
    campoBusca: FormControl = new FormControl();
    mensagemErro: string = "";
    livrosResultado: LivrosResultado;

    totalDeLivros$ = this.campoBusca.valueChanges.pipe(
        filter((value) => value.length >= 3),
        tap(() => console.log("Fluxo inicial")),
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((value) => this.service.buscar(value)),
        map((data) => (this.livrosResultado = data)),
        catchError((err) => {
            console.error(err);
            return of();
        }),
    );

    livrosEncontrados$: Observable<LivroVolumeInfo[]> = this.campoBusca.valueChanges.pipe(
        filter((value) => value.length >= 3),
        tap(() => console.log("Fluxo inicial")),
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((value) => this.service.buscar(value)),
        tap((response) => console.log("Requisição ao servidor: ", response)),
        map((response) => response.items ?? []),
        map((data) => this.livrosResultadoParaLivros(data)),
        catchError((err) => {
            console.log("[ERROR]: ", err);
            return throwError(() => new Error((this.mensagemErro = "Ops, ocorreu um erro! Tente novamente mais tarde")));
        }),
    );

    constructor(private service: LivroService) {}

    livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
        return items.map((item) => new LivroVolumeInfo(item));
    }
}
