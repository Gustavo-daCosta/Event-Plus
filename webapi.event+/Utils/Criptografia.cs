namespace webapi.event_.Utils
{
    // Classe estática para criptografar e descriptografar a senha do usuário
    public static class Criptografia
    {
        public static string GerarHash(string senha)
            => BCrypt.Net.BCrypt.HashPassword(senha);

        public static bool CompararHash(string senhaForm, string senhaBanco)
            => BCrypt.Net.BCrypt.Verify(senhaForm, senhaBanco);
    }
}
