using webapi.event_.Context;
using webapi.event_.Domains;
using webapi.event_.Interfaces;

namespace webapi.event_.Repositories
{
    public class InstituicaoRepository : IInstituicaoRepository
    {
        private readonly EventContext ctx;
        public InstituicaoRepository() => ctx = new EventContext();

        public void Atualizar(Guid id, Instituicao instituicao)
        {
            try
            {
                Instituicao instituicaoBuscada = ctx.Instituicao.FirstOrDefault(i => i.IdInstituicao == id)!;

                if (instituicaoBuscada != null)
                {
                    instituicaoBuscada.NomeFantasia = instituicao.NomeFantasia;
                    instituicaoBuscada.CNPJ = instituicao.CNPJ;
                    instituicaoBuscada.Endereco = instituicao.Endereco;
                    ctx.Instituicao.Update(instituicaoBuscada);
                    ctx.SaveChanges();
                }
                return;
            }
            catch (Exception)
            { throw; }
        }

        public void Cadastrar(Instituicao instituicao)
        {
            try
            {
                ctx.Instituicao.Add(instituicao);
                ctx.SaveChanges();
            }
            catch (Exception)
            { throw; }
        }

        public void Deletar(Guid id)
        {
            try
            {
                Instituicao instituicaoToBeRemoved = ctx.Instituicao.Single(i => i.IdInstituicao == id);
                ctx.Instituicao.Remove(instituicaoToBeRemoved);
                ctx.SaveChanges();
            }
            catch (Exception)
            { throw; }
        }

        public List<Instituicao> Listar() => ctx.Instituicao.ToList();
    }
}
