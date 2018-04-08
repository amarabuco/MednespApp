export class Palestrante {

    public id: Number;

    constructor( 
        public assunto,
        public palestrante,
        public data,
        public hora_inicio,
        public hora_fim,
        public local,
        public descricao,
        public tag    
    ) {} 

}