import { useAppSelector } from '../src/app/hooks';
import { selectDenormalizedTasks } from '../src/features/crmSlice';

function App(){
  // Вызываем наш селектор. TypeScript автоматически поймет, 
  // что в переменной tasks лежит массив измененных задач с полем assignedName!
  const tasks = 
  return(
    <div style={{padding:'20px', fontFamily: 'sans-serif'}}>
      <h1>Smart CRM App 🚀</h1>
            <p>Минимально рабочее состояние готово</p>
    </div>
  )
}

export default App