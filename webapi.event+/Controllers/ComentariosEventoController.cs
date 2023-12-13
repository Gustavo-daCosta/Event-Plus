using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using System.Text;
using webapi.event_.Domains;
using webapi.event_.Interfaces;
using webapi.event_.Repositories;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace webapi.event_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ComentariosEventoController : ControllerBase
    {
        private IComentariosEventoRepository _comentariosEventoRepository { get; set; }

        // Armazena dados da API externa
        private readonly ContentModeratorClient _contentModeratorClient;

        public ComentariosEventoController(ContentModeratorClient contentModeratorClient)
        {
            _comentariosEventoRepository = new ComentariosEventoRepository();
            _contentModeratorClient = contentModeratorClient;
        }

        [HttpPost("ComentarioIA")]
        public async Task<IActionResult> PostComentaryIA(ComentariosEvento comentariosEvento)
        {
            try
            {
                // Se a descrição do comentário não for passado no objeto
                if (string.IsNullOrEmpty(comentariosEvento.Descricao))
                {
                    return BadRequest("O texto a ser analizado não pode ser vazio");
                }

                // Converte a string (descrição do comentário em uma MemoryStream)
                using var stream = new MemoryStream(Encoding.UTF8.GetBytes(comentariosEvento.Descricao));

                // Realiza a moderação do conteúdo (descrição do comentário)
                var moderationResult = await _contentModeratorClient.TextModeration
                    .ScreenTextAsync("text/plain", stream, "por", false, false, null, true);

                comentariosEvento.Exibe = moderationResult.Terms != null ? false : true;

                _comentariosEventoRepository.Cadastrar(comentariosEvento);

                return StatusCode(201, comentariosEvento);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpGet("ListarSomenteExibe")]
        public IActionResult GetOnlyShow(Guid id)
        {
            try
            {
                return Ok(_comentariosEventoRepository.ListarSomenteExibe(id));
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_comentariosEventoRepository.Listar());
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpGet("BuscarPorIdUsuario")]
        public IActionResult GetByIdUser(Guid idUsuario, Guid idEvento)
        {
            try
            {
                return Ok(_comentariosEventoRepository.BuscarPorIdUsuario(idUsuario, idEvento));
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpPost]
        public IActionResult Post(ComentariosEvento novoComentario)
        {
            try
            {
                _comentariosEventoRepository.Cadastrar(novoComentario);
                return StatusCode(201, novoComentario);
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                _comentariosEventoRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception error)
            {
                return BadRequest(error.Message);
            }
        }
    }
}
