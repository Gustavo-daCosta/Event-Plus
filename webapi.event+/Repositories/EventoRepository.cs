using webapi.event_.Context;
using webapi.event_.Domains;
using webapi.event_.Interfaces;

namespace webapi.event_.Repositories
{
    public class EventoRepository : IEventoRepository
    {
        private readonly EventContext ctx;
        public EventoRepository() => ctx = new EventContext();

        public void Atualizar(Guid id, Evento evento)
        {
            try
            {
                Evento eventoBuscado = ctx.Evento.FirstOrDefault(tu => tu.IdEvento == id)!;

                if (eventoBuscado != null)
                {
                    eventoBuscado.Nome = evento.Nome;
                    eventoBuscado.Data = evento.Data;
                    eventoBuscado.Descricao = evento.Descricao;
                    eventoBuscado.IdTipoEvento = evento.IdTipoEvento;
                    eventoBuscado.IdInstituicao = evento.IdInstituicao;
                    ctx.Evento.Update(eventoBuscado);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public Evento BuscarPorId(Guid id)
        {
            try
            {
                Evento eventoBuscado = ctx.Evento.FirstOrDefault(e => e.IdEvento == id)!;
                return eventoBuscado;
            }
            catch (Exception)
            { throw; }
        }

        public void Cadastrar(Evento evento)
        {
            try
            {
                ctx.Evento.Add(evento);
                ctx.SaveChanges();
            }
            catch (Exception)
            { throw; }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Evento eventoToBeRemoved = ctx.Evento.FirstOrDefault(tu => tu.IdEvento == id)!;

                if (eventoToBeRemoved != null)
                {
                    ctx.Evento.Remove(eventoToBeRemoved);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public List<Evento> Listar() => ctx.Evento.ToList();
    }
}
