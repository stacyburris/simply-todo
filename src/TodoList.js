import React, {Component} from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


//{task: "Feed Fish"}, {task: "Groom Chicken"}
class TodoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos: []
        };
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }
    create(newTodo){
        this.setState({
            todos: [...this.state.todos, newTodo]
        })

    }
    remove(id){
        this.setState({
            todos: this.state.todos.filter(t => t.id !== id)
        });
    }

    update(id, updatedTask){
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id){
                return {...todo, task: updatedTask};
            }
            return todo;
        });
        this.setState({todos: updatedTodos });
    }
    toggleCompletion(id){
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id){
                return {...todo, completed: !todo.completed};
            }
            return todo;
        })
        this.setState({todos: updatedTodos });
    }
    render() {
        const todos = this.state.todos.map(todo => {
            return (
                <CSSTransition
                key={todo.id}
                timeout={500}
                className='todo'>
             <Todo 
             key={todo.id} 
             id={todo.id} 
             task={todo.task} 
             completed={todo.completed}
             removeTodo={this.remove}
             updateTodo={this.update}
             toggleTodo={this.toggleCompletion}
             />    
             </CSSTransition>
            );
        });
        return (
            <div className='TodoList'>
                <h1>Create a list!
                <span>An animated todo list made with react and hooks.</span>
                </h1>
                <NewTodoForm createTodo={this.create} />
                <ul>
                    <TransitionGroup className='todo-list'>
                      {todos}   
                    </TransitionGroup>
                </ul>
            </div>
        );
    }
}

export default TodoList;