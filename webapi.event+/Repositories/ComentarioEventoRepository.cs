using webapi.event_.Context;
using webapi.event_.Domains;
using webapi.event_.Interfaces;

namespace webapi.event_.Repositories
{
    public class ComentarioEventoRepository : IComentarioEventoRepository
    {
        private readonly EventContext ctx;
        public ComentarioEventoRepository() => ctx = new EventContext();

        public void Atualizar(Guid id, ComentarioEvento comentarioEvento)
        {
            try
            {
                ComentarioEvento comentarioEventoBuscado = ctx.ComentarioEvento.FirstOrDefault(tu => tu.IdComentarioEvento == id)!;

                if (comentarioEventoBuscado != null)
                {
                    comentarioEventoBuscado.Descricao = comentarioEvento.Descricao;
                    comentarioEventoBuscado.Exibe = comentarioEvento.Exibe;
                    comentarioEventoBuscado.IdUsuario = comentarioEvento.IdUsuario;
                    comentarioEventoBuscado.IdEvento = comentarioEvento.IdEvento;
                    ctx.ComentarioEvento.Update(comentarioEventoBuscado);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public ComentarioEvento BuscarPorId(Guid id)
        {
            try
            {
                ComentarioEvento comentarioEventoBuscado = ctx.ComentarioEvento.FirstOrDefault(tu => tu.IdComentarioEvento == id)!;
                return comentarioEventoBuscado;
            }
            catch (Exception)
            { throw; }
        }

        public void Cadastrar(ComentarioEvento comentarioEvento)
        {
            try
            {
                ctx.ComentarioEvento.Add(comentarioEvento);
                ctx.SaveChanges();
            }
            catch (Exception)
            { throw; }
        }

        public void Deletar(Guid id)
        {
            try
            {
                ComentarioEvento comentarioEventoToBeRemoved = ctx.ComentarioEvento.FirstOrDefault(tu => tu.IdComentarioEvento == id)!;

                if (comentarioEventoToBeRemoved != null)
                {
                    ctx.ComentarioEvento.Remove(comentarioEventoToBeRemoved);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public List<ComentarioEvento> Listar()
        {
            List<ComentarioEvento> listaComentariosEvento = ctx.ComentarioEvento.Select(ce => new ComentarioEvento
            {
                IdComentarioEvento = ce.IdComentarioEvento,
                Descricao = ce.Descricao,
                Exibe = ce.Exibe,
                IdEvento = ce.IdEvento,
                Evento = new Evento
                {
                    IdEvento = ce.Evento!.IdEvento,
                    Nome = ce.Evento.Nome,
                    Descricao = ce.Evento.Descricao,
                    Data = ce.Evento.Data,
                    IdTipoEvento = ce.Evento.IdTipoEvento,
                    TipoEvento = new TipoEvento
                    {
                        IdTipoEvento = ce.Evento.TipoEvento!.IdTipoEvento,
                        Titulo = ce.Evento.TipoEvento!.Titulo,
                    },
                    IdInstituicao = ce.Evento.IdInstituicao,
                    Instituicao = new Instituicao
                    {
                        IdInstituicao = ce.Evento.Instituicao!.IdInstituicao,
                        CNPJ = ce.Evento.Instituicao!.CNPJ,
                        Endereco = ce.Evento.Instituicao!.Endereco,
                        NomeFantasia = ce.Evento.Instituicao!.NomeFantasia
                    }
                },
                IdUsuario = ce.IdUsuario,
                Usuario = new Usuario
                {
                    IdUsuario = ce.Usuario!.IdUsuario,
                    Nome = ce.Usuario.Nome,
                    Email = ce.Usuario.Email,
                    IdTipoUsuario = ce.Usuario.IdTipoUsuario,
                    TipoUsuario = new TipoUsuario
                    {
                        IdTipoUsuario = ce.Usuario.TipoUsuario!.IdTipoUsuario,
                        Titulo = ce.Usuario.TipoUsuario.Titulo,
                    },
                },
            }).ToList();

            return ctx.ComentarioEvento.ToList();
        }
    }
}
