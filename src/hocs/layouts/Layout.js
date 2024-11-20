import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import { connect } from "react-redux";

function Layout({children}) {
    return(
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {

}) (Layout)