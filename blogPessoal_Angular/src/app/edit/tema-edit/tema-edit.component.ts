import { environment } from './../../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  tema: Tema = new Tema()

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if (environment.token == '') {
     alert('Seu token expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
    let idTema = this.route.snapshot.params['id']
    this.findByIdTema(idTema)

  }

  atualizar(){
    this.temaService.putTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Tema Atualizado!')
      this.router.navigate(['/tema'])
    }, err =>{
      if(err.status == 400) {
       alert('Esse tema não pode ser atualizado, pois já pertence a uma postagem')
        this.router.navigate(['/tema'])
      }
    })
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

}
