export default function Footer() {
  return (
    <footer className="w-full gap-4 text-center text-sm text-muted-foreground p-4 mt-12">
      <p>
        © {new Date().getFullYear() + " "}
        Créé avec ❤️, du code et Next.js par Jérémie Hérault. Hébergé sur Vercel
        !
      </p>
    </footer>
  );
}
