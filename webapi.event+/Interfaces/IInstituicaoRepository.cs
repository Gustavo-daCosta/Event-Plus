using webapi.event_.Domains;

namespace webapi.event_.Interfaces
{
    public interface IInstituicaoRepository
    {
        public List<Instituicao> Listar();

        public void Cadastrar(Instituicao instituicao);

        public void Deletar(Guid id);

        public void Atualizar(Guid id, Instituicao instituicao);
    }
}
