import './App.css'
import { useState } from 'react';
import Button from './Button';
import Input from './Input';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: '투두 만들어보기'},
    { id: 2, task: '깡별선채'},
  ]);
  
  const [text, setText]= useState('');
  console.log(text);
  
  const [editingID, setEditingID] = useState('');
  console.log(editingID);

  const [editText, setEditText] = useState('');
  console.log(editText);

  // 렌더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 1. 추가하기
  const addTodo = () => {
    setTodos((prev) => [
      ...prev, //이전 값 복사
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText(''); //입력한 후 창 초기화
  };
  
  // 2. 삭제하기
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }; // id를 배열에서 지워서 남은 id만 표시

  // 3. 수정하기
  const updateTodo = (id, text) => {
    setTodos((prev) => 
      prev.map((item) => (item.id === id ? {...item, task:text}:item))
    );
    setEditingID('');
  };

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
          <div ket={todo.id} className="todo-item">
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
