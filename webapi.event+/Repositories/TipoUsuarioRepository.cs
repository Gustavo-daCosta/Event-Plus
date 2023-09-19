using webapi.event_.Context;
using webapi.event_.Domains;
using webapi.event_.Interfaces;

namespace webapi.event_.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        private readonly EventContext _eventContext;
        public TipoUsuarioRepository() => _eventContext = new EventContext();

        public void Atualizar(Guid id, TipoUsuario tipoUsuario)
        {
            throw new NotImplementedException();
        }

        public TipoUsuario BuscarPorId(Guid id)
        {
            try
            {
                TipoUsuario tipoUsuarioBuscado = _eventContext.TipoUsuario
                    .Select(tu => new TipoUsuario
                    {
                        IdTipoUsuario = tu.IdTipoUsuario,
                        Titulo = tu!.Titulo,
                    }).FirstOrDefault(tu => tu.IdTipoUsuario == id)!;
                return tipoUsuarioBuscado;
            }
            catch (Exception)
            { throw; }
        }

        public void Cadastrar(TipoUsuario tipoUsuario)
        {
            try
            {
                _eventContext.TipoUsuario.Add(tipoUsuario);

                _eventContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public void Deletar(Guid id)
        {
            try
            {
                TipoUsuario tipoUsuarioBuscado = _eventContext
                _eventContext.TipoUsuario.Remove();
            }
            catch (Exception)
            { throw; }
        }

        public List<TipoUsuario> Listar()
        {
            throw new NotImplementedException();
        }
    }
}
