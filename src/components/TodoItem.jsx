import { AlertCircle, Check, Circle, Edit2, Save, Trash2, X, Zap } from 'lucide-react'
import { useState } from 'react'

export function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [loading, setLoading] = useState(false)

  const handleToggleComplete = async () => {
    setLoading(true)
    await onUpdate(todo.id, { completed: !todo.completed })
    setLoading(false)
  }

  const handleSave = async () => {
    if (!editTitle.trim()) return
    
    setLoading(true)
    await onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
      priority: editPriority
    })
    setIsEditing(false)
    setLoading(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setEditPriority(todo.priority)
    setIsEditing(false)
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      setLoading(true)
      await onDelete(todo.id)
      setLoading(false)
    }
  }

  const priorityIcons = {
    low: Circle,
    medium: AlertCircle,
    high: Zap
  }

  const priorityColors = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400'
  }

  const PriorityIcon = priorityIcons[todo.priority]

  return (
    <div className={`backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20 shadow-lg transition-all duration-200 hover:shadow-xl ${
      todo.completed ? 'opacity-60' : ''
    }`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            placeholder="Todo title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none"
            placeholder="Description (optional)"
            rows={2}
          />
          <div className="flex space-x-2">
            {['low', 'medium', 'high'].map((p) => {
              const Icon = priorityIcons[p]
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setEditPriority(p)}
                  className={`px-2 py-1 rounded text-xs border border-white/20 transition-all ${
                    editPriority === p
                      ? 'bg-white/20 text-white'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Icon className={`w-3 h-3 inline mr-1 ${priorityColors[p]}`} />
                  {p}
                </button>
              )
            })}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={loading || !editTitle.trim()}
              className="flex-1 px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4 inline mr-1" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
            >
              <X className="w-4 h-4 inline mr-1" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start space-x-3">
          <button
            onClick={handleToggleComplete}
            disabled={loading}
            className={`mt-1 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
              todo.completed
                ? 'bg-green-500 border-green-500'
                : 'border-white/40 hover:border-white/60'
            }`}
          >
            {todo.completed && <Check className="w-4 h-4 text-white" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`text-white font-medium ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </h3>
              <PriorityIcon className={`w-4 h-4 ${priorityColors[todo.priority]}`} />
            </div>
            {todo.description && (
              <p className={`text-white/70 text-sm ${todo.completed ? 'line-through' : ''}`}>
                {todo.description}
              </p>
            )}
            <p className="text-white/50 text-xs mt-2">
              Created {new Date(todo.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              title="Edit todo"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
              title="Delete todo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}