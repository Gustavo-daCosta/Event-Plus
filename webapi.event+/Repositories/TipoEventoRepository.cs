using webapi.event_.Context;
using webapi.event_.Domains;
using webapi.event_.Interfaces;

namespace webapi.event_.Repositories
{
    public class TipoEventoRepository : ITipoEventoRepository
    {
        private readonly EventContext ctx;
        public TipoEventoRepository() => ctx = new EventContext();

        public void Atualizar(Guid id, TipoEvento tipoEvento)
        {
            try
            {
                TipoEvento tipoEventoBuscado = ctx.TipoEvento.FirstOrDefault(tu => tu.IdTipoEvento == id)!;

                if (tipoEventoBuscado != null)
                {
                    tipoEventoBuscado.Titulo = tipoEvento.Titulo;
                    ctx.TipoEvento.Update(tipoEventoBuscado);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public TipoEvento BuscarPorId(Guid id)
        {
            try
            {
                TipoEvento tipoEventoBuscado = ctx.TipoEvento
                    .Select(te => new TipoEvento
                    {
                        IdTipoEvento = te.IdTipoEvento,
                        Titulo = te!.Titulo,
                    }).FirstOrDefault(tu => tu.IdTipoEvento == id)!;
                return tipoEventoBuscado;
            }
            catch (Exception)
            { throw; }
        }

        public void Cadastrar(TipoEvento tipoEvento)
        {
            try
            {
                ctx.TipoEvento.Add(tipoEvento);
                ctx.SaveChanges();
            }
            catch (Exception)
            { throw; }
        }

        public void Deletar(Guid id)
        {
            try
            {
                TipoEvento tipoEventoToBeRemoved = ctx.TipoEvento.FirstOrDefault(te => te.IdTipoEvento == id)!;

                if (tipoEventoToBeRemoved != null)
                {
                    ctx.TipoEvento.Remove(tipoEventoToBeRemoved);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public List<TipoEvento> Listar() => ctx.TipoEvento.ToList();
    }
}
