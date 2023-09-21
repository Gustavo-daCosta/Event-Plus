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

        public List<ComentarioEvento> Listar() => ctx.ComentarioEvento.ToList();
    }
}
