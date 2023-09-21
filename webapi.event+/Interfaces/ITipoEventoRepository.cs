using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface ITipoEventoRepository
    {
        public void Cadastrar(TipoEvento tipoEvento);

        public void Deletar(Guid id);

        public List<TipoEvento> Listar();

        public TipoEvento BuscarPorId(Guid id);

        public void Atualizar(Guid id, TipoEvento tipoEvento);
    }
}
