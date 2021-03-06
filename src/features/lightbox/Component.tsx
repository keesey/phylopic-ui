import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import * as React from "react";
import ProgressIndicator from "../../shared/ProgressIndicator";
import { Progress } from "../../stores/async";
import { Entity, Image as ImageModel, Name } from "../../stores/entities";
import Image from "./Image";
import Taxonomy from "./Taxonomy";
export interface DispatchProps {
	onClick: () => void;
	onClose: () => void;
}
export interface StateProps {
	image: Readonly<Entity & ImageModel> | null;
	names: ReadonlyArray<Entity & Pick<Name, "html">> | null;
	progress: Progress;
}
const Component: React.FunctionComponent<DispatchProps & StateProps> = ({
	image,
	names,
	onClick,
	onClose,
	progress,
}) => (
		<Dialog
			fullWidth={true}
			maxWidth="md"
			open={progress.pending || Boolean(image || progress.error)}
			onClose={onClose}
		>
			<DialogContent>
				<ProgressIndicator progress={progress}>
					{names && <Taxonomy names={names} />}
					{image && <Image image={image} />}
					{image && (
						<IconButton>
							<Icon>cloud_download</Icon>
						</IconButton>
					)}
					{image && (
						<IconButton onClick={onClick}>
							<Icon>add_shopping_cart</Icon>
						</IconButton>
					)}
				</ProgressIndicator>
			</DialogContent>
		</Dialog>
	);
export default Component;
