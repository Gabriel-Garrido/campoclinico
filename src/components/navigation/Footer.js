import { connect } from "react-redux";

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-blue-600 dark:border-gray-600">
      <span className="text-sm text-white sm:text-center dark:text-white">
        © 2024{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          CampoClinico
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
        <li>
          <a href="#" className="hover:underline me-4 md:me-6">
            About
          </a>
        </li>
        
      </ul>
    </footer>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Footer);
