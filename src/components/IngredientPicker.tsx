import { useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORY_COLORS, INGREDIENTS } from '../data/ingredients';
import type { Ingredient } from '../data/ingredients';

interface Props {
  selected: Set<string>;
  onAdd: (id: string) => void;
}

function highlight(name: string, query: string) {
  const idx = name.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1 || !query) return name;
  return (
    <>
      {name.slice(0, idx)}
      <mark>{name.slice(idx, idx + query.length)}</mark>
      {name.slice(idx + query.length)}
    </>
  );
}

export function IngredientPicker({ selected, onAdd }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const available = INGREDIENTS.filter((i) => !selected.has(i.id));
    if (!q) return available.slice(0, 8);
    const starts: Ingredient[] = [];
    const contains: Ingredient[] = [];
    for (const ing of available) {
      const name = ing.name.toLowerCase();
      if (name.startsWith(q)) starts.push(ing);
      else if (name.includes(q) || ing.category.toLowerCase().includes(q)) contains.push(ing);
    }
    return [...starts, ...contains].slice(0, 8);
  }, [query, selected]);

  // Clamp instead of resetting in an effect so highlight stays valid as results shrink
  const activeIdx = results.length ? Math.min(active, results.length - 1) : 0;

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Keep the active option in view
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIdx}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  const pick = (ing: Ingredient) => {
    onAdd(ing.id);
    setQuery('');
    setActive(0);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true);
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive(Math.min(activeIdx + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive(Math.max(activeIdx - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (results[activeIdx]) pick(results[activeIdx]);
        break;
      case 'Escape':
        setOpen(false);
        break;
    }
  };

  return (
    <div className="picker" ref={rootRef}>
      <div className={`picker-input-wrap ${open ? 'focused' : ''}`}>
        <svg className="picker-search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
          <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          className="picker-input"
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="ingredient-listbox"
          aria-autocomplete="list"
          placeholder="Search ingredients… e.g. chicken, tomato, rice"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <kbd className="picker-kbd">↵</kbd>
      </div>

      {open && (
        <ul className="picker-dropdown" id="ingredient-listbox" role="listbox" ref={listRef}>
          {results.length === 0 && (
            <li className="picker-empty">No ingredients match “{query}”</li>
          )}
          {results.map((ing, i) => (
            <li
              key={ing.id}
              data-index={i}
              role="option"
              aria-selected={i === activeIdx}
              className={`picker-option ${i === activeIdx ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(ing);
              }}
            >
              <span
                className="ing-pic"
                style={{ background: `${CATEGORY_COLORS[ing.category]}22` }}
              >
                {ing.emoji}
              </span>
              <span className="picker-option-name">{highlight(ing.name, query.trim())}</span>
              <span
                className="picker-option-cat"
                style={{ color: CATEGORY_COLORS[ing.category] }}
              >
                {ing.category}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
