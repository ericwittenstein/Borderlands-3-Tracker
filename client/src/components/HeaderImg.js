import HeaderImgFile from "../images/bl3banner.jpg";
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
					minHeight: "550px",
				}}
			>
				{""}
			</div>
		</Container>
	);
};
