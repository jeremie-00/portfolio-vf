const LegalPage = () => {
  return (
    <div className="container mx-auto p-6 w-full h-full flex flex-col items-start justify-center">
      <h1 className="text-2xl font-bold mb-4">Mentions Légales</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Propriétaire du site</h2>
        <p>Nom : Jérémie Hérault</p>
        <p>Adresse : Neuilly-en-thelle</p>
        <p>Email : jherault@gmail.com</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Hébergeur</h2>
        <p>Nom : Vercel Inc.</p>
        <p>Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
        <p>
          Site web :{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            vercel.com
          </a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Protection des données</h2>
        <p>
          Conformément au RGPD, vous pouvez exercer vos droits d&apos;accès, de
          modification ou de suppression de vos données en nous contactant à
          l&apos;adresse email mentionnée ci-dessus.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Cookies</h2>
        <p>
          Ce site utilise des cookies pour améliorer l&apos;expérience
          utilisateur.
        </p>
      </section>
    </div>
  );
};

export default LegalPage;
