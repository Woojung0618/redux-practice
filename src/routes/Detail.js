import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionCreators } from "../store";

const Detail = ({ toDos, onBtnClick }) => {
    const id = useParams().id;
    const toDo = toDos.find((toDo) => toDo.id === parseInt(id));
    const navigate = useNavigate();

    const handleDel = (id) => {
        console.log('id', id);
        onBtnClick(id);
        navigate("/");
    };

    return (
        <>
            {toDo?.text}
            Created at: {toDo?.id}
            <button onClick={() => handleDel(id)}>DEL</button>
        </>
    );
};

function mapStateToProps(state) {
    return {
        toDos: state,
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onBtnClick: (id) => dispatch(actionCreators.deleteToDo(parseInt(id))),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);