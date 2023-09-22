using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using webapi.event_.Domains;
using webapi.event_.Interfaces;
using webapi.event_.Repositories;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        public UsuarioController() => _usuarioRepository = new UsuarioRepository();

        [HttpPost]
        [Route("Cadastrar")]
        public IActionResult Post(Usuario usuario)
        {
            try
            {
                _usuarioRepository.Cadastrar(usuario);
                return StatusCode(201);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
        
        [HttpGet]
        [Route("BuscarPorId")]
        [Authorize]
        public IActionResult GetById(Guid id)
        {
            try
            {
                Usuario usuarioBuscado = _usuarioRepository.BuscarPorId(id);
                return StatusCode(200, usuarioBuscado);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpGet]
        [Route("ListarMeusEventos")]
        [Authorize]
        public IActionResult GetMyEvents(Guid id)
        {
            try
            {
                List<PresencaEvento> listaPresencaEvento = _usuarioRepository.ListarMeusEventos(id);
                return StatusCode(200, listaPresencaEvento);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
    }
}
