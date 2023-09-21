using webapi.event_.Context;
using webapi.event_.Domains;
using webapi.event_.Interfaces;

namespace webapi.event_.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        private readonly EventContext ctx;
        public TipoUsuarioRepository() => ctx = new EventContext();

        public void Atualizar(Guid id, TipoUsuario tipoUsuario)
        {
            try
            {
                TipoUsuario tipoUsuarioBuscado = ctx.TipoUsuario.FirstOrDefault(tu => tu.IdTipoUsuario == id)!;

                if (tipoUsuarioBuscado != null)
                {
                    tipoUsuarioBuscado.Titulo = tipoUsuario.Titulo;
                    ctx.TipoUsuario.Update(tipoUsuarioBuscado);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public TipoUsuario BuscarPorId(Guid id)
        {
            try
            {
                TipoUsuario tipoUsuarioBuscado = ctx.TipoUsuario.FirstOrDefault(tu => tu.IdTipoUsuario == id)!;
                return tipoUsuarioBuscado;
            }
            catch (Exception)
            { throw; }
        }

        public void Cadastrar(TipoUsuario tipoUsuario)
        {
            try
            {
                ctx.TipoUsuario.Add(tipoUsuario);
                ctx.SaveChanges();
            }
            catch (Exception)
            { throw; }
        }

        public void Deletar(Guid id)
        {
            try
            {
                TipoUsuario tipoUsuarioToBeRemoved = ctx.TipoUsuario.FirstOrDefault(tu => tu.IdTipoUsuario == id)!;

                if (tipoUsuarioToBeRemoved != null)
                {
                    ctx.TipoUsuario.Remove(tipoUsuarioToBeRemoved);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public List<TipoUsuario> Listar() => ctx.TipoUsuario.ToList();
    }
}
