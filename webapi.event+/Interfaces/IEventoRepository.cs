using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface IEventoRepository
    {
        public void Cadastrar(Evento evento);

        public void Deletar(Guid id);

        public List<Evento> Listar();

        public Evento BuscarPorId(Guid id);

        public void Atualizar(Guid id, Evento evento);
    }
}
