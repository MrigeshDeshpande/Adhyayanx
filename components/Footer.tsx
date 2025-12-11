export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white mt-auto">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} AdhyayanX. All rights reserved.
      </div>
    </footer>
  );
}
