import HeaderImgFile from "../images/bl3banner384x1920.jpg";
import React from "react";
import { Container } from "react-bootstrap";

export const HeaderImg = () => {
	return (
		<Container>
			<div
				style={{
					backgroundImage: `url(${HeaderImgFile})`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "cover",
					maxHeight: "384px",
					minHeight: "65px"
				}}
			>
				{""}
			</div>
		</Container>
	);
};
