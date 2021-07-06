import { FormControl, FormGroup } from '@angular/forms';
import { UsuariosService } from './../../usuarios.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Usuario } from 'src/app/Model/Usuario';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  form: any;
  tituloForm: string | undefined ;
  usuarios: Usuario[] | undefined ;
  nomeUsuario: string | undefined;
  usuarioId: number | undefined;
  
  

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false; 
  

  constructor(private usuariosService: UsuariosService,
    private modalService: BsModalService) { }

  ngOnInit():  void {
    this.usuariosService.PegarTodos().subscribe((resultado) => {
      this.usuarios = resultado;
    });
  
  
  }
  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloForm = 'Novo Usuario';
    this.form = new FormGroup({
      nome: new FormControl(null),
      cpfcnpj: new FormControl(null),
      tipo: new FormControl(null),
      status: new FormControl(null),
      darahora: new FormControl(null)
    });
  }

  ExibirFormularioAtualizacao(usuarioId: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.usuariosService.PegarPeloId(usuarioId).subscribe((resultado) => {
      this.tituloForm = `Atualizar ${resultado.nome} ${resultado.cpfcnpj}`;

      this.form = new FormGroup({
        usuarioId: new FormControl(resultado.usuarioId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.cpfcnpj),
        idade: new FormControl(resultado.tipo),
        status: new FormControl(resultado.status),
        datahora: new FormControl(resultado.datahora)

      });
    });
  }

  EnviarFormulario(): void {
    const usuario : Usuario = this.form.value;

    if (usuario.usuarioId > 0) {
      this.usuariosService.AtualizarUsuario(usuario).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Usuario atualizado com sucesso');
        this.usuariosService.PegarTodos().subscribe((registros) => {
          this.usuarios = registros;
        });
      });
    } else {
      this.usuariosService.SalvarUsuario(usuario).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Usuario inserido com sucesso');
        this.usuariosService.PegarTodos().subscribe((registros) => {
          this.usuarios = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  function (cpfcnpj: string) {

    cpfcnpj = cpfcnpj.replace(/[^\d]+/g, '');

    if (cpfcnpj == '') return false;

    if (cpfcnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cpfcnpj == "00000000000000" ||
        cpfcnpj == "11111111111111" ||
        cpfcnpj == "22222222222222" ||
        cpfcnpj == "33333333333333" ||
        cpfcnpj == "44444444444444" ||
        cpfcnpj == "55555555555555" ||
        cpfcnpj == "66666666666666" ||
        cpfcnpj == "77777777777777" ||
        cpfcnpj == "88888888888888" ||
        cpfcnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cpfcnpj.length - 2
    numeros = cpfcnpj.substring(0, tamanho);
    digitos = cpfcnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cpfcnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;

}

function validaCPF(cpfcnpj) {
  cpfcnpj = cpfcnpj.replace(/[^\d]+/g, '');
  if (cpfcnpj == '') return false;
  
  if (cpfcnpj.length != 11 ||
      cpfcnpj == "00000000000" ||
      cpfcnpj == "11111111111" ||
      cpfcnpj == "22222222222" ||
      cpfcnpj == "33333333333" ||
      cpfcnpj == "44444444444" ||
      cpfcnpj == "55555555555" ||
      cpfcnpj == "66666666666" ||
      cpfcnpj == "77777777777" ||
      cpfcnpj == "88888888888" ||
      cpfcnpj == "99999999999")
      return false;
 
  add = 0;
  for (i = 0; i < 9; i++)
      add += parseInt(cpfcnpj.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
      rev = 0;
  if (rev != parseInt(cpfcnpj.charAt(9)))
      return false;
  
  add = 0;
  for (i = 0; i < 10; i++)
      add += parseInt(cpfcnpj.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11)
      rev = 0;
  if (rev != parseInt(cpfcnpj.charAt(10)))
      return false;
  return true;
}

  

