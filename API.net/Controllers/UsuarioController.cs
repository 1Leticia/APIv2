using api_user_address.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api_user_address.Controllers
{
    public class UsuarioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        private readonly Contexto _contexto;

        public UsuarioController(Contexto contexto)
        {
            _contexto = contexto;
        }
        [HttpGet]
        [Route("all_users")]
        public async Task<ActionResult<IEnumerable<Usuario>>> PegarTodosAsync()
        {
            return Ok( _contexto.Usuario.ToList());
        }

        [HttpGet]
        [Route("user")]
        public ActionResult<Usuario> PegarUsuarioPeloIdAsync(int usuarioId)
        {
            Usuario usuario =  _contexto.Usuario.Where(u => u.UsuarioId == usuarioId).FirstOrDefault();

            if (usuario == null)
                return NotFound();

            return Ok(usuario);
        }

        [HttpPost]
        [Route("user")]
        public ActionResult<Usuario> SalvarUsuarioAsync([FromBody]Usuario usuario)
        {
             _contexto.Usuario.Add(usuario);
             _contexto.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Route("user")]
        public ActionResult AtualizarUsuarioAsync([FromBody] Usuario usuario)
        {
            //Usuario user = _contexto.Usuario.Where(u => u.UsuarioId == usuario.UsuarioId).FirstOrDefault();
            _contexto.Usuario.Update(usuario);
             _contexto.SaveChanges();

            return Ok();
        }
    }
}
