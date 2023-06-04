import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { LivroService } from "src/app/service/livro.service";

@Component({
    selector: "app-lista-livros",
    templateUrl: "./lista-livros.component.html",
    styleUrls: ["./lista-livros.component.css"],
})
export class ListaLivrosComponent implements OnDestroy {
    listaLivros: any;

    campoBusca: string = "";
    subscription: Subscription;

    constructor(private service: LivroService) {}

    buscarLivros() {
        this.subscription = this.service.buscar(this.campoBusca).subscribe({
            next: (data) => {
                console.log(data);
                this.listaLivros = data;
            },
            error: (err) => {
                console.error(`[ERROR]: ${JSON.stringify(err)}`);
            },
            complete: () => console.log("[INFO]: A requisição foi realizada com sucesso!"),
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
