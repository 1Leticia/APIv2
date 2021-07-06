using api_user_address.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_user_address.Controllers
{
    public class EnderecoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        private readonly Contexto _contexto;

        public EnderecoController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        [Route("all_addresses")]
        public async Task<ActionResult<IEnumerable<Endereco>>> PegarTodosAsync()
        {
            return await _contexto.Endereco.ToListAsync();
        }

        [HttpGet]
        [Route("address")]
        public async Task<ActionResult<Endereco>> PegarEnderecoPeloIdAsync(int enderecoId)
        {
            Endereco endereco = await _contexto.Endereco.FindAsync(enderecoId);

            if (endereco == null)
                return NotFound();

            return endereco;
        }

        [HttpPost]
        [Route("address")]
        public ActionResult<Endereco> SalvarEnderecoAsync([FromBody] Endereco endereco)
        {
             _contexto.Endereco.Add(endereco);
             _contexto.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("address")]
        public ActionResult AtualizarEnderecoAsync([FromBody]Endereco endereco)
        {
            //Endereco end = _contexto.Endereco.Where(e => e.EnderecoId == endereco.EnderecoId).FirstOrDefault();
            //if(end != null)
            //{
                _contexto.Endereco.Update(endereco);
                _contexto.SaveChanges();
                return Ok("Endereço atualizado com sucesso!");
            //}
            //else
            //{
            //    return BadRequest("Erro ao atualizar o endereço");
            //}

        }

        [HttpDelete]
        [Route("address")]
        public ActionResult ExcluirEnderecoAsync(int enderecoId)
        {
            Endereco endereco =  _contexto.Endereco.Where(e => e.EnderecoId == enderecoId).FirstOrDefault();
            if (endereco == null)
                return NotFound();

            _contexto.Remove(endereco);
             _contexto.SaveChanges();
            return Ok();
        }

    }
}
