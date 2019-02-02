import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { State } from "../../stores";
import { getProgress } from "../../stores/async";
import { getImage, getNames, getProgressKey, selectImage } from "../../stores/lightbox";
import Component, { DispatchProps, StateProps } from "./Component";
const mapStateToProps = (state: State) => {
	const key = getProgressKey(state);
	const progress = getProgress(key)(state);
	return {
		"image": getImage(state),
		"names": getNames(state),
		progress,
	} as StateProps;
};
const mapDispatchToProps = (dispatch: ThunkDispatch<State, {}, AnyAction>) => ({
	"onClick": () => undefined,
	"onClose": async() => dispatch(selectImage({ "imageUID": null })),
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Component);
