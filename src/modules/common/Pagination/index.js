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
	const isFirst = current === 1 ? true : false;
	const isLast = current === total ? true : false;
	let beforeCurrent = 1;
	let afterCurrent = total;
	const itemArr = [];

	if (current + 3 <= total) afterCurrent = current + 3;
	if (current - 3 >= 1) beforeCurrent = current - 3;

	for (let i = beforeCurrent; i <= afterCurrent; i++) {
		const isActive = current === i;
		const item = (
			<PaginationItem active={isActive} key={i}>
				<PaginationLink onClick={e => (isActive ? null : onClick(i))}>{i}</PaginationLink>
			</PaginationItem>
		);
		itemArr.push(item);
	}

	return (
		<Pagination className="float-right">
			<PaginationItem disabled={isFirst} onClick={e => (isFirst ? null : onClick(current - 1))}>
				<PaginationLink previous>Prev</PaginationLink>
			</PaginationItem>
			{itemArr}
			<PaginationItem disabled={isLast} onClick={e => (isLast ? null : onClick(current + 1))}>
				<PaginationLink next>Next</PaginationLink>
			</PaginationItem>
		</Pagination>
	);
};
