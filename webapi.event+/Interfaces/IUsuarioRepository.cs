using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface IUsuarioRepository
    {
        public void Cadastrar(Usuario usuario);

        public Usuario BuscarPorId(Guid id);

        public Usuario BuscarPorEmailESenha(string email, string senha);

        //xpublic List<Evento> ListarMeusEventos(Guid id);
    }
}
