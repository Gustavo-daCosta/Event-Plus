using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface IPresencaEventoRepository
    {
        public void Cadastrar(PresencaEvento presencaEvento);

        public void Deletar(Guid id);

        public List<PresencaEvento> Listar();

        public PresencaEvento BuscarPorId(Guid id);

        public void Atualizar(Guid id, PresencaEvento presencaEvento);
    }
}
