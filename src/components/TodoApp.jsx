import { useState } from 'react'
// import { useAuth } from '../hooks/useAuth'
// import { useTodos } from '../hooks/useTodos'
import { AuthForm } from './AuthForm'
import { Header } from './Headers'
import { TodoForm } from './TodoForm'
import { TodoList } from './TodoList'
import { UsersList } from './UsersList'

export function TodoApp() {
  // const { user, loading: authLoading } = useAuth()
  // const { todos, loading: todosLoading, createTodo, updateTodo, deleteTodo } = useTodos(user)
  const [activeTab, setActiveTab] = useState('todos')

  function createTodo(){}
  // if (authLoading) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
  //         <p className="text-white text-lg">Loading TodoVibe...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!user) {
  //   return <AuthForm />
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600">
      <Header 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        // userEmail={user.email}
      />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'todos' ? (
          <div className="space-y-8">
            <TodoForm 
              onSubmit={createTodo}
              // loading={todosLoading}
            />
            <TodoList
              // todos={todos}
              // loading={todosLoading}
              // onUpdate={updateTodo}
              // onDelete={deleteTodo}
            />
          </div>
        ) : (
          <UsersList />
        )}
      </main>
    </div>
  )
}