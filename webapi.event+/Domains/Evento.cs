using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.event_.Domains
{
    [Table(nameof(Evento))]
    public class Evento
    {
        [Key]
        public Guid IdEvento { get; set; } = Guid.NewGuid();

        [Column(TypeName = "VARCHAR(150)")]
        [Required(ErrorMessage = "Nome do Evento é obrigatório")]
        public string? Nome { get; set; }

        [Column(TypeName = "DATETIME")]
        [Required(ErrorMessage = "Data do Evento é obrigatória!")]
        public DateTime Data { get; set; }

        [Column(TypeName = "VARCHAR(200)")]
        [Required(ErrorMessage = "Descrição do Evento é obrigatório")]
        public string? Descricao { get; set; }

        // Ref. TipoEvento - FK
        [Required(ErrorMessage = "Tipo de Evento é obrigatório!")]
        public Guid IdTipoEvento { get; set; }

        [ForeignKey(nameof(IdTipoEvento))]
        public TipoEvento? TipoEvento { get; set; }

        // Ref. Instituição - FK
        [Required(ErrorMessage = "Instituicao é obrigatória!")]
        public Guid IdInstituicao { get; set; }

        [ForeignKey(nameof(IdInstituicao))]
        public Instituicao? Instituicao { get; set; }
    }
}
