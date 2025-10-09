import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos = [
    {
      conteudo: 'Passo a informação para o componente filho',
      autoria: 'Componente pai',
      modelo: 'modelo3'
    },
    {
      conteudo: 'Minha propriedade é decorada com @Input()',
      autoria: 'Compoenente filho',
      modelo: 'modelo2'
    },
    {
      conteudo: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa architecto eaque quas iusto totam cupiditate rem repudiandae tempore ipsam minus modi rerum eos recusandae, atque ab. Maiores, harum! Eos eveniet officiis minus sed consequuntur consectetur, suscipit tempora asperiores quibusdam at rerum recusandae cumque dicta minima, id corporis doloribus sapiente, aliquid quidem corrupti. Cumque nobis quos atque ea assumenda hic temporibus ullam nihil. Dolorem similique quaerat quibusdam necessitatibus aut rerum. Ipsam ducimus eius minus reiciendis cumque ut, quos cupiditate quod in vitae, vero incidunt dignissimos facere fuga culpa omnis perferendis nihil iste illum minima. Perspiciatis, facere. Soluta ipsa, veniam neque adipisci hic corporis assumenda iure, voluptatem debitis non rerum? Consectetur quasi voluptates minus ea nostrum ducimus, facilis commodi consequatur. Voluptate nostrum enim voluptas dicta blanditiis tempora ut eum voluptatum magni, delectus pariatur minima doloremque. Harum id quidem accusantium nobis natus blanditiis dolorem fuga sunt quo obcaecati, autem dolor in, dicta aliquam totam repellat! Earum ab, eveniet dolorem, odio debitis laborum nobis dicta aliquam quo eligendi cum quaerat doloremque dolor non modi nam at! Ipsum dolor laborum cupiditate. Tempora amet saepe possimus deleniti sapiente iste nesciunt! Labore reprehenderit, dicta maxime explicabo, in dolorum aspernatur nam minus perspiciatis officiis a eligendi ratione. Corrupti ab aperiam commodi fugit asperiores! Repudiandae accusantium quia eius perspiciatis. Soluta, assumenda? Error illo tenetur, iure sit eligendi culpa at ipsam, neque distinctio rem est quis nobis assumenda suscipit animi impedit maiores earum harum facere molestiae, sapiente commodi magni itaque! Voluptatibus explicabo debitis cum. Eveniet voluptatum est quo assumenda tempore, mollitia amet harum nihil doloremque consequatur id? Tempora, rem laudantium?",
      autoria: 'Largura maior que 256 caracteres',
      modelo: 'modelo1'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
