import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { Livro } from "src/app/models/interfaces";
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

    livrosResultadoParaLivros(items: any): Livro[] {
        const livros: Livro[] = [];

        items.forEach((item: any) => {
            livros.push(
                (this.livro = {
                    title: item.volumeInfo?.title,
                    authors: item.volumeInfo?.authors,
                    publisher: item.volumeInfo?.publisher,
                    publishedDate: item.volumeInfo?.publishedDate,
                    description: item.volumeInfo?.description,
                    thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
                }),
            );
        });

        return livros;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
