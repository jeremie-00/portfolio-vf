import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  // Configuration des fournisseurs d'authentification
  providers: [
    GithubProvider({
      // Identifiants client pour l'authentification GitHub
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],

  // Configuration de la gestion des sessions
  session: {
    strategy: "jwt", // Utilisation des JSON Web Tokens pour gérer les sessions
    maxAge: 60 * 60 * 24 * 30, // Durée de validité des sessions (30 jours)
  },

  // Configuration des jetons JWT
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Clé secrète utilisée pour signer et vérifier les jetons
    maxAge: 60 * 60 * 24 * 30, // Durée de validité des jetons (30 jours)
  },

  // Callbacks permettant de modifier les données transmises à différentes étapes
  callbacks: {
    // Callback appelé lors de la création/mise à jour du token JWT
    async jwt({ token, user }) {
      // Si un utilisateur vient d'être authentifié, on associe son ID au token
      if (user && !token.id) {
        token.id = user.id; // Ajoute l'ID utilisateur pour un usage futur
      }
      return token; // Renvoie le token avec l'ID ajouté
    },

    // Callback appelé lors de la création de la session utilisateur
    async session({ session, token }) {
      // Si une session utilisateur existe, on y ajoute l'ID utilisateur depuis le token
      if (session.user) {
        session.user.id = token.id as string; // Injecte l'ID utilisateur dans l'objet session
      }
      return session; // Renvoie la session enrichie
    },
  },

  // Clé secrète pour sécuriser l'authentification et la validation des jetons
  secret: process.env.NEXTAUTH_SECRET,
};
