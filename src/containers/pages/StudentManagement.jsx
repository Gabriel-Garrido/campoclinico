import CareerSelector from "components/studentManagement/CareerSelector";
import CreateStudentForm from "components/studentManagement/CreateStudentForm";
import SearchBar from "components/studentManagement/SearchBar";
import SemesterSelector from "components/studentManagement/SemesterSelector";
import StudentTable from "components/studentManagement/StudentTable";
import Layout from "hocs/layouts/Layout";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    get_careers,
    get_semesters,
    get_students,
    create_student,
} from "redux/actions/students/students";
import { ClipLoader } from "react-spinners";

function StudentManagement({
    get_careers,
    get_semesters,
    get_students,
    create_student,
    user,
    careers = [],
    semesters = [],
    students = [],
}) {
    const [selectedCareer, setSelectedCareer] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.university) {
            console.log("Obteniendo carreras para la universidad:", user.university);
            setLoading(true);
            get_careers(user.university).finally(() => setLoading(false));
        }
    }, [get_careers, user]);

    useEffect(() => {
        if (selectedCareer) {
            console.log("Obteniendo semestres para la carrera:", selectedCareer);
            setLoading(true);
            get_semesters(selectedCareer).finally(() => setLoading(false));
        }
    }, [get_semesters, selectedCareer]);

    useEffect(() => {
        if (selectedCareer && selectedSemester) {
            console.log("Obteniendo estudiantes para la carrera y semestre seleccionados");
            setLoading(true);
            get_students(selectedCareer, selectedSemester).finally(() => setLoading(false));
        }
    }, [get_students, selectedCareer, selectedSemester]);

    const handleStudentCreation = (studentData) => {
        console.log("Creando estudiante con datos:", studentData);
        create_student(studentData);
    };

    const filteredStudents = students.filter((student) =>
        `${student.name} ${student.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    console.log("Estudiantes filtrados:", filteredStudents);

    return (
        <Layout>
            <section className="bg-gray-100 py-10">
                <div className="px-6 mx-auto max-w-6xl bg-white shadow rounded-lg p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                        Gestión de Estudiantes
                    </h1>

                    {/* Selectores y barra de búsqueda */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div>
                            <CareerSelector
                                careers={careers}
                                selectedCareer={selectedCareer}
                                setSelectedCareer={setSelectedCareer}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <SemesterSelector
                                semesters={semesters}
                                selectedSemester={selectedSemester}
                                setSelectedSemester={setSelectedSemester}
                                disabled={!selectedCareer || loading}
                            />
                        </div>
                        <div>
                            <SearchBar
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Indicador de carga */}
                    {loading && (
                        <div className="flex justify-center my-4">
                            <ClipLoader color="#2563EB" loading={loading} size={50} />
                        </div>
                    )}

                    {/* Tabla de estudiantes */}
                    <div className="mt-4">
                        {filteredStudents.length > 0 ? (
                            <StudentTable students={filteredStudents} />
                        ) : (
                            !loading && (
                                <p className="text-gray-500 text-center">
                                    {selectedCareer && selectedSemester
                                        ? "No hay estudiantes disponibles para mostrar."
                                        : "Seleccione una carrera y un semestre para ver los estudiantes."}
                                </p>
                            )
                        )}
                    </div>

                    {/* Formulario para agregar estudiantes */}
                    <div className="mt-10">
                        <CreateStudentForm
                            selectedCareer={selectedCareer}
                            selectedSemester={selectedSemester}
                            onCreate={handleStudentCreation}
                            disabled={!selectedCareer || !selectedSemester}
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    careers: state.students.careers,
    semesters: state.students.semesters,
    students: state.students.students,
});

export default connect(mapStateToProps, {
    get_careers,
    get_semesters,
    get_students,
    create_student,
})(StudentManagement);
