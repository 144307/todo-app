import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('Todo App', () => {
  it('renders the todo input field', () => {
    render(<App />)
    const input = screen.getByPlaceholderText('What needs to be done?')
    expect(input).toBeInTheDocument()
  })

  it('adds a new todo when form is submitted', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Test Task')
    
    // Submit the form
    const form = input.closest('form')!
    fireEvent.submit(form)
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(input).toHaveValue('')
  })

  it('does not add empty todos', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, '   ')
    
    // Submit the form
    const form = input.closest('form')!
    fireEvent.submit(form)
    
    expect(screen.queryByText('   ')).not.toBeInTheDocument()
  })

  it('toggles todo completion status', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Test Task')
    
    // Submit the form
    const form = input.closest('form')!
    fireEvent.submit(form)
    
    const checkbox = screen.getByRole('checkbox', { name: '' })
    await user.click(checkbox)
    
    const todoItem = screen.getByText('Test Task').closest('li')
    expect(todoItem).toHaveClass('completed')
  })

  it('deletes a todo when destroy button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Test Task')
    
    // Submit the form
    const form = input.closest('form')!
    fireEvent.submit(form)
    
    const destroyButton = screen.getByRole('button', { name: '' })
    await user.click(destroyButton)
    
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument()
  })

  it('shows correct remaining task count', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    const form = input.closest('form')!
    
    await user.type(input, 'Task 1')
    fireEvent.submit(form)
    
    await user.type(input, 'Task 2')
    fireEvent.submit(form)
    
    expect(screen.getByText((_content, element) => 
      element?.textContent === '2 items left'
    )).toBeInTheDocument()
    
    const checkboxes = screen.getAllByRole('checkbox', { name: '' })
    await user.click(checkboxes[0])
    
    expect(screen.getByText((_content, element) => 
      element?.textContent === '1 item left'
    )).toBeInTheDocument()
  })

  it('filters todos correctly', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    const form = input.closest('form')!
    
    await user.type(input, 'Active Task')
    fireEvent.submit(form)
    
    await user.type(input, 'Completed Task')
    fireEvent.submit(form)
    
    const checkboxes = screen.getAllByRole('checkbox', { name: '' })
    await user.click(checkboxes[1])
    
    const activeFilter = screen.getByText('Active')
    await user.click(activeFilter)
    
    expect(screen.getByText('Active Task')).toBeInTheDocument()
    expect(screen.queryByText('Completed Task')).not.toBeInTheDocument()
    
    const completedFilter = screen.getByText('Completed')
    await user.click(completedFilter)
    
    expect(screen.queryByText('Active Task')).not.toBeInTheDocument()
    expect(screen.getByText('Completed Task')).toBeInTheDocument()
  })

  it('clears completed todos', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    const form = input.closest('form')!
    
    await user.type(input, 'Task 1')
    fireEvent.submit(form)
    
    await user.type(input, 'Task 2')
    fireEvent.submit(form)
    
    const checkboxes = screen.getAllByRole('checkbox', { name: '' })
    await user.click(checkboxes[0])
    
    const clearButton = screen.getByText('Clear completed')
    await user.click(clearButton)
    
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument()
    expect(screen.getByText('Task 2')).toBeInTheDocument()
  })

  it('edits todos on double click', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Original Task')
    
    // Submit the form
    const form = input.closest('form')!
    fireEvent.submit(form)
    
    const label = screen.getByText('Original Task')
    await user.dblClick(label)
    
    const editInput = screen.getByDisplayValue('Original Task')
    await user.clear(editInput)
    await user.type(editInput, 'Edited Task')
    await user.keyboard('{Enter}')
    
    expect(screen.getByText('Edited Task')).toBeInTheDocument()
    expect(screen.queryByText('Original Task')).not.toBeInTheDocument()
  })

  it('cancels edit on escape', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Original Task')
    
    // Submit the form
    const form = input.closest('form')!
    fireEvent.submit(form)
    
    const label = screen.getByText('Original Task')
    await user.dblClick(label)
    
    const editInput = screen.getByDisplayValue('Original Task')
    await user.clear(editInput)
    await user.type(editInput, 'Changed Text')
    await user.keyboard('{Escape}')
    
    expect(screen.getByText('Original Task')).toBeInTheDocument()
    expect(screen.queryByText('Changed Text')).not.toBeInTheDocument()
  })

  it('deletes todo if edit text is empty', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const input = screen.getByPlaceholderText('What needs to be done?')
    await user.type(input, 'Test Task')
    
    // Submit the form
    const form = input.closest('form')!
    fireEvent.submit(form)
    
    const label = screen.getByText('Test Task')
    await user.dblClick(label)
    
    const editInput = screen.getByDisplayValue('Test Task')
    await user.clear(editInput)
    await user.keyboard('{Enter}')
    
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument()
  })
})