import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { LivroVolumeInfo } from "src/app/models/LivroVolumeInfo";
import { Item, Livro } from "src/app/models/interfaces";
import { LivroService } from "src/app/service/livro.service";

@Component({
    selector: "app-lista-livros",
    templateUrl: "./lista-livros.component.html",
    styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent implements OnDestroy {
    listaLivros: Livro[] = [];

    campoBusca: string = "";
    subscription: Subscription;
    livro: Livro;

    constructor(private service: LivroService) {}

    buscarLivros(): void {
        this.subscription = this.service.buscar(this.campoBusca).subscribe({
            next: (data) => {
                this.listaLivros = this.livrosResultadoParaLivros(data);
            },
            error: (err) => {
                console.error(`[ERROR]: ${JSON.stringify(err)}`);
            },
            complete: () => console.log("[INFO]: A requisição foi realizada com sucesso!"),
        });
    }

    livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
        return items.map((item) => new LivroVolumeInfo(item));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
