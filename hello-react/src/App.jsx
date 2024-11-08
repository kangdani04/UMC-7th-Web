import './App.css'
import { useContext } from 'react';
import Button from './Button';
import Input from './Input';
import { TodoContext } from './context/TodoContext';

function App() {
  const {
    todos,
    text, setText, 
    editingID, setEditingID, 
    editText, setEditText, 
    handleSubmit, 
    addTodo, deleteTodo, updateTodo
  } = useContext(TodoContext)
  return (
  <>
    <header>
      <h2>TODO</h2>
    </header>
    <hr></hr>
    <form className="todo-form" onSubmit={handleSubmit}>
      <Input 
        //type='text' 
        value={text} 
        onChange={(e) => setText(e.target.value)}
      />
      <Button 
        className="button"
        onClick={addTodo}
        label='할 일 등록'
        type='submit'
      />
    </form>

    <section>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-item">
          {/*수정이 아닐 때 */}
          {editingID !== todo.id ? (
            <>
              <span className="todo-task">{todo.id}. {todo.task}</span>
              <div className="button-group">
                <Button onClick={() => deleteTodo(todo.id)} label='삭제'/>
                <Button onClick={() => setEditingID(todo.id)} label='수정'/>
              </div>
            </>
          ) : (
            <>
              <input defaultValue={todo.task}
              onChange={(e) => setEditText(e.target.value)}
              />
              <Button onClick={() => updateTodo(editingID, editText)} label='완료'/>
            </>
          )}
        </div>
      ))}
      </div>
    </section>
  </>
  );
}
export default App;
