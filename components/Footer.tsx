export default function Footer() {
  return (
    <footer className="bg-card p-4 text-card-foreground mt-auto">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} AdhyayanX. All rights reserved.
      </div>
    </footer>
  );
}
