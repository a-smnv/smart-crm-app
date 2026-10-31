import { useAppSelector, useAppDispatch } from '../src/app/hooks';
import { selectDenormalizedTasks,selectSelectedLabel, setLabelFilter, selectAllTasks } from '../src/features/crmSlice';

function App(){
  const dispatch = useAppDispatch()
  // Вызываем наш селектор. TypeScript автоматически поймет, 
  // что в переменной tasks лежит массив измененных задач с полем assignedName!
  const tasks = useAppSelector(selectDenormalizedTasks);
const activeLabel =useAppSelector(selectSelectedLabel)
  // Достаем САМЫЙ исходный массив задач ТОЛЬКО для того, чтобы собрать из него уникальные теги
    const allRawTasks = useAppSelector(selectAllTasks);

      // Собираем уникальные теги из всех задач
      const uniqueLabels = Array.from(
        new Set(allRawTasks.flatMap(task => task.labels))
      )

  return(
    <div style={{padding:'30px', fontFamily: 'sans-serif', backgroundColor:'#f5f7fb', minHeight:"100vh"}}>
      <h1 style={{color:"#1e293b",marginBottom: '10px'}}>Smart CRM - Панель задач 🚀</h1>
                <p style={{ color: '#64748b', marginBottom: '20px' }}>Изучаем продвинутые методы массивов и объектов</p>
       {/* Блок фильтров (Кнопки) */}
           <div style={{display:'flex', gap:'10px', marginBottom:'25px', flexWrap:'wrap'}}>
            {/* Кнопка сброса фильтра */}
            <button onClick={()=> dispatch(setLabelFilter(null))}style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: activeLabel === null ? '#1e293b' : '#e2e8f0',
            color: activeLabel === null ? '#fff' : '#334155',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}>Все задачи</button>
          {/* Рендерим уникальные кнопки тегов */}
               {uniqueLabels.map(label => (
          <button
            key={label}
            onClick={() => dispatch(setLabelFilter(label))} // Записываем выбранный тег в Redux
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: activeLabel === label ? '#3b82f6' : '#e2e8f0',
              color: activeLabel === label ? '#fff' : '#334155',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.2s'
            }}
          >
            #{label}
          </button>
        ))}
        </div>
       {/* Сетка карточек задач */}
      <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {tasks.map(task => (
          <div 
            key={task.id} 
            style={{ 
              backgroundColor: '#fff', 
              padding: '20px', 
              borderRadius: '8px', 
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              borderLeft: task.status === 'in_progress' ? '5px solid #3b82f6' : '5px solid #e2e8f0'
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', color: '#0f172a' }}>{task.title}</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 15px 0' }}>{task.description}</p>
            
            {/* Рендерим маленькие теги внутри самой карточки */}
            <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', flexWrap: 'wrap' }}>
              {task.labels.map(l => (
                <span key={l} style={{ fontSize: '11px', backgroundColor: '#eff6ff', color: '#1e40af', padding: '2px 6px', borderRadius: '4px' }}>
                  #{l}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
              <span style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', color: '#334155', fontWeight: 'bold' }}>
                👤 {task.assignedName}
              </span>
              <span style={{ color: '#94a3b8' }}>🔥 Points: {task.points}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Если в выбранном фильтре нет задач */}
      {tasks.length === 0 && (
        <div style={{ textAlign: 'center', color: '#64748b', marginTop: '40px', fontSize: '18px' }}>
          Задач с таким тегом пока нет 🤷‍♂️
        </div>
      )}
    </div>
  
  );
}

export default App;