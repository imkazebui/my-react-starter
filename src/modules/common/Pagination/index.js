import React from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	NavLink,
	Nav,
	NavItem,
	TabContent,
	TabPane,
	CardTitle,
	CardText,
	Button,
	Row,
	Col,
	Table,
	Badge,
	Pagination,
	PaginationItem,
	PaginationLink,
	FormGroup,
	Label,
	Input,
	InputGroup,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from 'reactstrap';

export const TBPagination = ({ total_pages, page, onClick }) => {
	const total = parseInt(total_pages);
	const current = parseInt(page);
	console.log('current', current, total);
	const isFirst = current === 0 ? true : false;
	const isLast = current === total - 1 ? true : false;
	let beforeCurrent = 0;
	let afterCurrent = total - 1;
	const itemArr = [];

	if (current + 3 <= total - 1) afterCurrent = current + 3;
	if (current - 3 >= 0) beforeCurrent = current - 3;

	for (let i = beforeCurrent; i <= afterCurrent; i++) {
		console.log('compare', current === i, current, i);
		const item = (
			<PaginationItem active={current === i} key={i}>
				<PaginationLink onClick={e => onClick(i)}>{i + 1}</PaginationLink>
			</PaginationItem>
		);
		itemArr.push(item);
	}

	return (
		<Pagination className="float-right">
			<PaginationItem disabled={isFirst} onClick={e => onClick(current - 1)}>
				<PaginationLink previous>Trước</PaginationLink>
			</PaginationItem>
			{itemArr}
			<PaginationItem disabled={isLast} onClick={e => onClick(current + 1)}>
				<PaginationLink next>Sau</PaginationLink>
			</PaginationItem>
		</Pagination>
	);
};
