import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, switchMap, map, tap, filter, debounceTime, distinctUntilChanged } from "rxjs";
import { LivroVolumeInfo } from "src/app/models/LivroVolumeInfo";
import { Item } from "src/app/models/interfaces";
import { LivroService } from "src/app/service/livro.service";

@Component({
    selector: "app-lista-livros",
    templateUrl: "./lista-livros.component.html",
    styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent {
    campoBusca: FormControl = new FormControl();

    livrosEncontrados$: Observable<LivroVolumeInfo[]> = this.campoBusca.valueChanges.pipe(
        filter((value) => value.length >= 3),
        tap(() => console.log("Fluxo inicial")),
        distinctUntilChanged(),
        debounceTime(300),
        switchMap((value) => this.service.buscar(value)),
        tap((response) => console.log("Requisição ao servidor: ", response)),
        map((data) => this.livrosResultadoParaLivros(data)),
    );

    constructor(private service: LivroService) {}

    livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
        return items.map((item) => new LivroVolumeInfo(item));
    }
}
