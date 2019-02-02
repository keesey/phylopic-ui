import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Browse from "./features/browse";
import Lightbox from "./features/lightbox";
import { getWindowSize, listenToWindowResize } from "./helpers/windowSize";
import { State } from "./stores";
import { set } from "./stores/windowSize/actions";
export interface DispatchProps {
	onResize: (size: [number, number]) => void;
}
class App extends React.PureComponent<DispatchProps> {
	public componentWillMount() {
		listenToWindowResize(() => this.props.onResize(getWindowSize()));
	}
	// tslint:disable:prefer-function-over-method
	public render() {
		return (
			<div>
				<AppBar position="sticky">
					<Toolbar>
						<Typography variant="title" color="inherit">
							PhyloPic 2.0 prototype
						</Typography>
					</Toolbar>
				</AppBar>
				<div style={{ "padding": 20 }}>
					<Browse />
				</div>
				<Lightbox />
			</div>
		);
	}
	// tslint:enable:prefer-function-over-method
}
const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch: ThunkDispatch<State, {}, AnyAction>) => ({
	"onResize": (size: Readonly<[number, number]>) => dispatch(set(size)),
} as DispatchProps);
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(App);
