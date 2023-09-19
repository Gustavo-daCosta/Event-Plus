using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface ITipoUsuarioRepository
    {
        public void Cadastrar(TipoUsuario tipoUsuario);

        public void Deletar(Guid id);

        public List<TipoUsuario> Listar();

        public TipoUsuario BuscarPorId(Guid id);

        public void Atualizar(Guid id, TipoUsuario tipoUsuario);
    }
}
