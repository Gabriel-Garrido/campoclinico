import Layout from "hocs/layouts/Layout";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { get_students } from "redux/actions/students/students";

function Home({get_students, students}) {

  useEffect(() => {
    get_students()
    console.log('students en componente Home = ',students);
    
  }, [])
  

  return (
    <Layout>

      <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
            Gestión de Campos clínicos
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Conecta estudiantes con prácticas clínicas de forma eficiente y organizada, asegurando un futuro profesional exitoso.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
            <Link
              to="/placesList"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Empezar
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
            >
              Nosotros
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}

const mapStateToProps = state => ({
  students: state.students.students
})
export default connect(mapStateToProps,{
  get_students
})(Home);
