import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";

function Services() {
  return (
    <Layout>
      <div className="p-8  bg-slate-100 min-h-screen">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-gray-900 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            CampoClínico
          </span>{" "}
          Servicios
        </h1>
        <p className="text-lg font-normal text-gray-900 lg:text-xl dark:text-gray-900">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>

        <ul className=" p-6 space-y-4 text-left text-lg text-gray-900 dark:text-gray-900">
          <li className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg
              className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            <span>Individual configuration</span>
          </li>
          <li className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg
              className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            <span>No setup, or hidden fees</span>
          </li>
          <li className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg
              className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            <span>
              Team size:{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-900">
                1 developer
              </span>
            </span>
          </li>
          <li className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg
              className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            <span>
              Premium support:{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-900">
                6 months
              </span>
            </span>
          </li>
          <li className="flex items-center space-x-3 rtl:space-x-reverse">
            <svg
              className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            <span>
              Free updates:{" "}
              <span className="font-semibold text-gray-900 dark:text-gray-900">
                6 months
              </span>
            </span>
          </li>
        </ul>
      </div>
    </Layout>
  );
}

export default Services;
