import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, switchMap, map, tap } from "rxjs";
import { LivroVolumeInfo } from "src/app/models/LivroVolumeInfo";
import { Item } from "src/app/models/interfaces";
import { LivroService } from "src/app/service/livro.service";

@Component({
    selector: "app-lista-livros",
    templateUrl: "./lista-livros.component.html",
    styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent {
    //listaLivros: Livro[] = [];

    campoBusca: FormControl = new FormControl();

    livrosEncontrados$: Observable<any> = this.campoBusca.valueChanges.pipe(
        tap(() => console.log("Fluxo inicial")),
        switchMap((value) => this.service.buscar(value)),
        tap(() => console.log("Requisição ao servidor")),
        map((data) => this.livrosResultadoParaLivros(data)),
    );

    constructor(private service: LivroService) {}

    livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
        return items.map((item) => new LivroVolumeInfo(item));
    }
}
