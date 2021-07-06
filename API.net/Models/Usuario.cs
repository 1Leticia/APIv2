using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api_user_address.Models
{
    [Table("Usuario")]
    public class Usuario
    {
        [Key]
        public int UsuarioId { get; set; }
        public string nome { get; set; }
        public int cpfcnpj { get; set; }
        public string tipo { get; set; }
        public string status { get; set; }
        public DateTime datahora { get; }
    }
}
