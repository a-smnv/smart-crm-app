import { useAppSelector } from '../src/app/hooks';
import { selectDenormalizedTasks } from '../src/features/crmSlice';

function App(){
  // Вызываем наш селектор. TypeScript автоматически поймет, 
  // что в переменной tasks лежит массив измененных задач с полем assignedName!
  const tasks = useAppSelector(selectDenormalizedTasks);

  return(
    <div style={{padding:'30px', fontFamily: 'sans-serif', backgroundColor:'#f5f7fb', minHeight:"100vh"}}>
      <h1 style={{color:"#1e293b",marginBottom: '20px'}}>Smart CRM App 🚀</h1>
           <div style={{display:'grid', gap:'15px', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))'}}>
            {tasks.map(task=>(
              <div key={task.id}
              style={{backgroundColor:'#fff',
                padding:'20px',
                borderRadius:'8px',
                boxShadow:'0 4px 6px -1px rgba(0,0,0,0.1)',
                borderLeft: task.status ==='in_progress' ? '5px solid #3b82f6' : '5px solid #e2e8f0'
              }}
              >
  <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>{task.title}</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 15px 0' }}>{task.description}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              {/* Выводим имя сотрудника, которое «склеил» наш селектор! */}
              <span style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#334155', fontWeight: 'bold' }}>
                👤 {task.assignedName}
              </span>
              
              <span style={{ color: '#94a3b8' }}>
                🔥 Points: {task.points}
              </span>
            </div>
              </div>
            ))}
           </div>
      
    </div>
  )
}

export default App