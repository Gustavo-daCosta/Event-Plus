using webapi.event_.Context;
using webapi.event_.Domains;
using webapi.event_.Interfaces;

namespace webapi.event_.Repositories
{
    public class PresencaEventoRepository : IPresencaEventoRepository
    {
        private readonly EventContext ctx;
        public PresencaEventoRepository() => ctx = new EventContext();

        public void Atualizar(Guid id, PresencaEvento presencaEvento)
        {
            try
            {
                PresencaEvento presencaEventoBuscado = ctx.PresencaEvento.FirstOrDefault(tu => tu.IdPresencaEvento == id)!;

                if (presencaEventoBuscado != null)
                {
                    presencaEventoBuscado.Situacao = presencaEvento.Situacao;
                    presencaEventoBuscado.IdUsuario = presencaEvento.IdUsuario;
                    presencaEventoBuscado.IdEvento = presencaEvento.IdEvento;
                    ctx.PresencaEvento.Update(presencaEventoBuscado);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public PresencaEvento BuscarPorId(Guid id)
        {
            try
            {
                PresencaEvento presencaEventoBuscado = ctx.PresencaEvento.FirstOrDefault(tu => tu.IdPresencaEvento == id)!;
                return presencaEventoBuscado;
            }
            catch (Exception)
            { throw; }
        }

        public void Cadastrar(PresencaEvento presencaEvento)
        {
            try
            {
                ctx.PresencaEvento.Add(presencaEvento);
                ctx.SaveChanges();
            }
            catch (Exception)
            { throw; }
        }

        public void Deletar(Guid id)
        {
            try
            {
                PresencaEvento presencaEventoToBeRemoved = ctx.PresencaEvento.FirstOrDefault(tu => tu.IdPresencaEvento == id)!;

                if (presencaEventoToBeRemoved != null)
                {
                    ctx.PresencaEvento.Remove(presencaEventoToBeRemoved);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public List<PresencaEvento> Listar() => ctx.PresencaEvento.ToList();
    }
}
