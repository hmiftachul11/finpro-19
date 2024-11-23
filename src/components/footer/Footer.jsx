const Footer = () => {
  return (
    <footer className="bg-white rounded-lg  dark:bg-gray-900 ">
      <hr />
      <div className="w-full max-w-screen-2xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3">
            <img src="/logo.webp" className="h-8" alt="Logo" />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="/offer" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="/activity" className="hover:underline me-4 md:me-6">
                Activity
              </a>
            </li>
            <li>
              <a href="/contactus" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="/" className="hover:underline">
            Trachel™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
