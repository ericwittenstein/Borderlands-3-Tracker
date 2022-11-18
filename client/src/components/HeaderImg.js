import HeaderImgFile from "../images/bl3banner302x1553.jpg";
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
					minHeight: "100px",
				}}
				className="img-fluid"
			>
				{""}
			</div>
		</Container>
	);
};
