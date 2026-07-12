import { useEffect, useRef } from 'react'

const PREFIX = 'planner:'

export function loadValue(key) {
  try {
    return localStorage.getItem(PREFIX + key) || ''
  } catch {
    return ''
  }
}

export function saveValue(key, value) {
  try {
    localStorage.setItem(PREFIX + key, value)
  } catch (e) {
    console.error('Could not save to localStorage', e)
  }
}

export function clearAll(keys) {
  keys.forEach((key) => {
    try {
      localStorage.removeItem(PREFIX + key)
    } catch (e) {
      console.error('Could not clear localStorage key', key, e)
    }
  })
}

/**
 * A contentEditable element that loads its text from localStorage on mount
 * and saves it back (debounced) on every edit. Uses refs instead of React
 * state so the cursor position is never disturbed while typing.
 */
export default function Editable({
  storageKey,
  placeholder = '',
  className = '',
  as: Tag = 'div',
}) {
  const ref = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = loadValue(storageKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey])

  const handleInput = () => {
    clearTimeout(timerRef.current)
    const text = ref.current ? ref.current.textContent : ''
    timerRef.current = setTimeout(() => saveValue(storageKey, text), 300)
  }

  return (
    <Tag
      ref={ref}
      className={className}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onInput={handleInput}
    />
  )
}
