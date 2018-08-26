import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	background: ${props => (props.isDragging ? 'lightgreen' : 'white')};
	border: ${props => (props.isDragging ? '1px solid lightgreen' : '1px solid lightgray')};
	cursor: pointer;
	border-radius: 2px;
	padding: 8px;
	margin-bottom: 8px;
`;

class Task extends Component {
	render() {
		return (
			<Draggable draggableId={this.props.task.id} index={this.props.index}>
				{(provided, snapshot) => (
					<Container
						innerRef={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						isDragging={snapshot.isDragging}
					>
						{this.props.task.content}
					</Container>
				)}
			</Draggable>
		);
	}
}

export default Task;
