using webapi.event_.Context;
using webapi.event_.Domains;
using webapi.event_.Interfaces;
using webapi.event_.Utils;

namespace webapi.event_.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly EventContext ctx;
        public UsuarioRepository() => ctx = new EventContext();

        public Usuario BuscarPorEmailESenha(string email, string senha)
        {
            try
            {
                Usuario usuarioBuscado = ctx.Usuario
                    .Select(u => new Usuario
                    {
                        IdUsuario = u.IdUsuario,
                        Nome = u.Nome,
                        Email = u.Email,
                        Senha = u.Senha,

                        TipoUsuario = new TipoUsuario
                        {
                            IdTipoUsuario = u.IdTipoUsuario,
                            Titulo = u.TipoUsuario!.Titulo,
                        }
                    }).FirstOrDefault(u => u.Email == email)!;

                if (usuarioBuscado != null)
                {
                    bool confere = Criptografia.CompararHash(senha, usuarioBuscado.Senha!);

                    if (confere)
                    {
                        return usuarioBuscado;
                    }
                }
                return null!;
            }
            catch (Exception)
            { throw; }
        }

        public Usuario BuscarPorId(Guid id)
        {
            try
            {
                Usuario usuarioBuscado = ctx.Usuario
                    .Select(u => new Usuario
                    {
                        IdUsuario = u.IdUsuario,
                        Nome = u.Nome,
                        Email = u.Email,

                        TipoUsuario = new TipoUsuario
                        {
                            IdTipoUsuario = u.IdTipoUsuario,
                            Titulo = u.TipoUsuario!.Titulo,
                        }
                    }).FirstOrDefault(u => u.IdUsuario == id)!;
                return usuarioBuscado;
            }
            catch (Exception)
            { throw; }
        }

        public void Cadastrar(Usuario usuario)
        {
            try
            {
                usuario.Senha = Criptografia.GerarHash(usuario.Senha!);

                ctx.Usuario.Add(usuario);

                ctx.SaveChanges();
            }
            catch (Exception)
            { throw; }
        }

        public List<PresencaEvento> ListarMeusEventos(Guid id)
        {
            List<PresencaEvento> listaEventos = ctx.PresencaEvento
                .Where(pe => pe.IdUsuario == id)
                .Select(pe => new PresencaEvento
            {
                IdPresencaEvento = pe.IdPresencaEvento,
                Situacao = pe.Situacao,
                IdEvento = pe.IdEvento,
                Evento = new Evento
                {
                    IdEvento = pe.Evento!.IdEvento,
                    Nome = pe.Evento!.Nome,
                    Data = pe.Evento!.Data,
                    Descricao = pe.Evento!.Descricao,
                    IdInstituicao = pe.Evento!.IdInstituicao,
                    Instituicao = new Instituicao
                    {
                        IdInstituicao = pe.Evento.Instituicao!.IdInstituicao,
                        CNPJ = pe.Evento.Instituicao.CNPJ,
                        Endereco = pe.Evento.Instituicao.Endereco,
                        NomeFantasia = pe.Evento.Instituicao.NomeFantasia,
                    },
                    IdTipoEvento = pe.Evento!.IdTipoEvento,
                    TipoEvento = new TipoEvento
                    {
                        IdTipoEvento = pe.Evento.TipoEvento!.IdTipoEvento,
                        Titulo = pe.Evento.TipoEvento.Titulo,
                    },
                }
            }).ToList();

            return listaEventos;
        }
    }
}
