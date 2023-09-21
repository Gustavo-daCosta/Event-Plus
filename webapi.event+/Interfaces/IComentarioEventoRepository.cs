using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface IComentarioEventoRepository
    {
        public void Cadastrar(ComentarioEvento comentarioEvento);

        public void Deletar(Guid id);

        public List<ComentarioEvento> Listar();

        public ComentarioEvento BuscarPorId(Guid id);

        public void Atualizar(Guid id, ComentarioEvento comentarioEvento);
    }
}
