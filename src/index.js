import '@atlaskit/css-reset';
import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

class App extends React.Component {
	state = initialData;

	onDragStart = () => {
		document.body.style.background = 'orange';
		document.body.style.transition = 'backgroumd 0.2s ease-out';
	};

	onDragUpdate = update => {
		const { destination } = update;
		const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0;

		document.body.style.background = `rgba(153, 141, 217, ${opacity})`;
	};

	onDragEnd = result => {
		document.body.style.background = 'white';
		const { destination, source, draggableId } = result;

		if (!destination) {
			return;
		}

		if ([destination.droppableId === source.droppableId, destination.index === source.index].every(Boolean)) {
			return;
		}

		const column = this.state.columns[source.droppableId];
		const newTaskIds = Array.from(column.taskIds);
		newTaskIds.splice(source.index, 1);
		newTaskIds.splice(destination.index, 0, draggableId);

		const newColumn = {
			...column,
			taskIds: newTaskIds,
		};

		const newState = {
			...this.state,
			columns: {
				...this.state.columns,
				[newColumn.id]: newColumn,
			},
		};

		this.setState({
			...newState,
		});
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
				{this.state.columnOrder.map(columnId => {
					const column = this.state.columns[columnId];
					const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

					return <Column key={column.id} column={column} tasks={tasks} />;
				})}
			</DragDropContext>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
