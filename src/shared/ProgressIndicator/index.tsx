import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar, { SnackbarProps } from "@material-ui/core/Snackbar";
import * as React from "react";
import { Progress } from "../../stores/async";
export interface Props {
	children?: React.ReactNode;
	onRetry?: () => void;
	progress: Progress;
}
const ProgressIndicator: React.FunctionComponent<Props> = ({
	children,
	onRetry,
	progress,
}) => {
	if (progress.pending) {
		return <CircularProgress/>;
	}
	if (progress.error) {
		const props: SnackbarProps = {
			"message": (<span>{String(progress.error) || "An error occurred."}</span>),
			"open": true,
		};
		if (onRetry) {
			props.action = (
				<Button
					color="secondary"
					onClick={onRetry}
					size="small"
				>
					Try Again
				</Button>
			);
		}
		return <Snackbar {...props} />;
	}
	return <div>{children}</div>;
};
export default ProgressIndicator;
