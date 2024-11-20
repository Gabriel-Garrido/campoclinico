import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";

function About() {
  return (
    <Layout>

      <div className="p-8  bg-slate-100 min-h-screen">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-gray-900 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            CampoClínico
          </span>{" "}
          Nosotros
        </h1>
        <p className="text-lg font-normal text-gray-900 lg:text-xl dark:text-gray-900">
          Here at Flowbite we focus on markets where technology, innovation, and
          capital can unlock long-term value and drive economic growth.
        </p>
      </div>

    </Layout>
  );
}

export default About;
